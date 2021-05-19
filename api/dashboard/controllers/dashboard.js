const _ = require("lodash");

const query = async (query) => {
  const knex = strapi.connections.default;
  return await knex.raw(query);
};

const getQuery = async (ctx, q) => {
  const r = await query(q);
  ctx.send(r[0]);
};

module.exports = {
  people: async (ctx) =>
    getQuery(ctx, "select count(1) as total from people limit 1"),
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
      totals: result1[0],
      totalByMonth: result2[0],
    });
  },
};
