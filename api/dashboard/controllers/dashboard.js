const _ = require("lodash");

const getQuery = async (ctx, query) => {
  const knex = strapi.connections.default;
  const result = await knex.raw(query);
  ctx.send(result[0]);
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
};
