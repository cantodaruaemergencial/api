const _ = require("lodash");

module.exports = {
  genders: async (ctx) => {
    const knex = strapi.connections.default;
    const result = await knex.raw(
      "select g.gender as gender, count(1) as total " +
        "from people p left join genders g on p.gender = g.id " +
        "group by gender"
    );

    ctx.send(result[0]);
  },
};
