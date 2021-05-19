const _ = require("lodash");

const query = async (query) => {
  const knex = strapi.connections.default;
  return await knex.raw(query);
};

const getQuery = async (ctx, q, isArray = true) => {
  const r = await query(q);
  ctx.send(isArray ? r[0] : r[0][0]);
};

module.exports = {
  people: async (ctx) =>
    getQuery(ctx, "select count(1) as total from people limit 1", false),
  genders: async (ctx) =>
    getQuery(
      ctx,
      "select ifnull(g.gender, 'Outros') as name, count(1) as total " +
        "from people p left join genders g on p.gender = g.id " +
        "group by g.gender"
    ),
  skincolors: async (ctx) =>
    getQuery(
      ctx,
      "select ifnull(sc.SkinColor, 'Outros') as name, count(1) as total " +
        "from people p left join skin_colors sc on p.skin_color = sc.id " +
        "group by sc.SkinColor"
    ),
  schooltrainings: async (ctx) =>
    getQuery(
      ctx,
      "select ifnull(st.SchoolTraining, 'Outros') as name, count(1) as total " +
        "from people p left join school_trainings st on p.school_training = st.id " +
        "group by st.SchoolTraining"
    ),
  entrances: async (ctx) => {
    const sql1 =
      "select " +
      "(select count(1) from person_entrances) as total, " +
      "(select count(1) from person_entrances  " +
      "where year(datetime) = year(now())  " +
      "and month(datetime) = month(now())) as monthTotal, " +
      "(select count(1) from person_entrances  " +
      "where year(datetime) = year(now())  " +
      "and week(datetime) = week(now())) as weekTotal";
    const sql2 =
      "select date_format(datetime, '%Y-%m') as name, count(1) as total " +
      "from person_entrances group by name order by name;";
    const result1 = await query(sql1);
    const result2 = await query(sql2);
    ctx.send({
      total: result1[0][0].total,
      monthTotal: result1[0][0].monthTotal,
      weekTotal: result1[0][0].weekTotal,
      totalByCategory: result2[0],
    });
  },
  serviceattendances: async (ctx) => {
    const sql1 =
      "select " +
      "(select sum(Attendances) from service_attendances) as total, " +
      "(select ifnull(sum(Attendances),0) from service_attendances  " +
      "where year(date) = year(now())  " +
      "and month(date) = month(now())) as monthTotal, " +
      "(select ifnull(sum(Attendances),0) from service_attendances " +
      "where year(date) = year(now())  " +
      "and week(date) = week(now())) as weekTotal";
    const sql2 =
      "select date_format(date, '%Y-%m') as name, sum(Attendances) as total " +
      "from service_attendances group by name order by name;";
    const result1 = await query(sql1);
    const result2 = await query(sql2);
    ctx.send({
      total: result1[0][0].total,
      monthTotal: result1[0][0].monthTotal,
      weekTotal: result1[0][0].weekTotal,
      totalByCategory: result2[0],
    });
  },
  ages: async (ctx) => {
    const sql1 =
      "select " +
      "avg(date_format(from_days(datediff(now(), BirthDate)), '%Y')+0) as average " +
      "from people " +
      "where birthdate is not null";
    const sql2 =
      "select  " +
      "date_format(from_days(datediff(now(), BirthDate)), '%Y')+0 as name, " +
      "count(1) as total " +
      "from people " +
      "where birthdate is not null  " +
      "group by date_format(from_days(datediff(now(), BirthDate)), '%Y')+0 " +
      "having name < 150 " +
      "order by name ";
    const result1 = await query(sql1);
    const result2 = await query(sql2);
    ctx.send({
      average: result1[0][0].average,
      totalByCategory: result2[0],
    });
  },
  homelessness: async (ctx) => {
    const sql1 =
      "select " +
      "avg(datediff(now(), HomelessSince) div 30) as average " +
      "from people " +
      "where birthdate is not null";
    const sql2 =
      "select  " +
      "datediff(now(), HomelessSince) div 30 as name, " +
      "count(1) as total " +
      "from people " +
      "where HomelessSince is not null  " +
      "group by datediff(now(), HomelessSince) div 30 " +
      "order by name ";
    const result1 = await query(sql1);
    const result2 = await query(sql2);
    ctx.send({
      average: result1[0][0].average,
      totalByCategory: result2[0],
    });
  },
  services: async (ctx) =>
    getQuery(
      ctx,
      "select s.service as name, " +
        "(select sum(sa.Attendances) from service_attendances sa where sa.service = s.id) as total, " +
        "(select ifnull(sum(Attendances),0) from service_attendances " +
        "where service = s.id and year(date) = year(now()) and month(date) = month(now())) as monthTotal, " +
        "(select ifnull(sum(Attendances),0) from service_attendances " +
        "where service = s.id and year(date) = year(now()) and week(date) = week(now())) as weekTotal " +
        "from services s; "
    ),
};
