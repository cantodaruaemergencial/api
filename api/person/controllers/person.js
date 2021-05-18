"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find2(ctx) {
    const knex = strapi.connections.default;

    const params = {
      limit: Number(ctx.query.limit),
      offset: Number(ctx.query.start),
      filter: ctx.query.filter ? "%" + ctx.query.filter + "%" : '%'
    };

    const result = await knex.raw(
      "select " +
        "p.Id, p.Name, p.SocialName, p.CardNumber, " +
        "(select pe1.datetime from person_entrances pe1 where pe1.person = p.id order by pe1.datetime desc limit 1) as LastEntranceDate, " +
        "(select count(1) from person_entrances pe2 where pe2.person = p.id and date(datetime) = date(now())) as EnteredToday, " +
        "(select count(1) from person_entrances pe3 where pe3.person = p.id) as Entrances " +
        "from people p " +
        "where Name like :filter or SocialName like :filter or CardNumber like :filter " +
        "order by p.Name " +
        "limit :limit offset :offset;",
      params
    );

    ctx.send(result[0]);
  },
};
