"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find2(ctx) {
    const knex = strapi.connections.default;

    const q = ctx.query
      ? ctx.query
      : {
          limit: 7,
          offset: 0,
          filter: "",
        };

    if (!q.limit) q.limit = 7;
    if (!q.offset) q.offset = 0;
    if (!q.filter) q.filter = "";

    const params = {
      limit: Number(q.limit),
      offset: Number(q.start),
      filter: "%" + q.filter + "%",
    };

    const result = await knex.raw(
      "select " +
        "p.Id, p.Name, p.SocialName, p.CardNumber, " +
        "pe.DateTime as TodayEntranceTime, " +
        "(select count(1) from person_entrances pe1 where pe1.person = p.id) as Entrances " +
        "from people p left join person_entrances pe on p.id = pe.person and date(pe.DateTime) = date(now()) " +
        "where Name like :filter or SocialName like :filter or CardNumber like :filter " +
        "order by p.Name " +
        "limit :limit offset :offset;",
      params
    );

    ctx.send(result[0]);
  },
};
