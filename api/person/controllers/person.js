"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find2(ctx) {
    const knex = strapi.connections.default;

    const params = {
      limit: Number(ctx.query?.limit) ?? 7,
      offset: Number(ctx.query?.start) ?? 0,
      filter: "%" + (ctx.query?.filter ?? "") + "%",
    };

    const result = await knex.raw(
      "select " +
        "p.Id, p.Name, p.SocialName, p.CardNumber, " +
        "pe.Date as TodayEntranceTime, " +
        "(select count(1) from person_entrances pe1 where pe1.person = p.id) as Entrances " +
        "from people p left join person_entrances pe on p.id = pe.person and date(pe.date) = date(now()) " +
        "where Name like :filter or SocialName like :filter or CardNumber like :filter " +
        "order by p.Name " +
        "limit :limit offset :offset;",
      params
    );

    ctx.send(result[0]);
  },
};
