"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const _ = require("lodash");

const allowRoute = async (controller, method) => {
  const service = await strapi.plugins["users-permissions"].services
    .userspermissions;
  const plugins = await service.getPlugins("en");
  const roles = await service.getRoles();

  const getRole = async (type) => {
    const { id } = _.find(roles, (x) => x.type === type);
    return service.getRole(id, plugins);
  };

  const setPermission = (role, type, controller, action, enabled) => {
    try {
      role.permissions[type].controllers[controller][action].enabled = enabled;
    } catch (e) {
      console.error(
        `Couldn't set permission ${role.name} ${type}:${controller}:${action}:${enabled}`
      );
    }
  };

  const publicRole = await getRole("public");
  setPermission(publicRole, "application", controller, method, true);
  await service.updateRole(publicRole.id, publicRole);
};

const allowGetRoutes = async (controller) => {
  await allowRoute(controller, "count");
  await allowRoute(controller, "find");
  await allowRoute(controller, "findone");
};

const allowPostRoutes = async (controller) => {
  await allowRoute(controller, "create");
  await allowRoute(controller, "update");
  await allowRoute(controller, "delete");
};

const configureGoogleOAuth = async () => {
  const newGrantConfig = {
    google: {
      enabled: true,
      icon: "google",
      key: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
      callback: `${process.env.APP_URL}/connect/google/redirect`,
      scope: ["email"],
    },
  };

  const pluginStore = strapi.store({
    environment: "",
    type: "plugin",
    name: "users-permissions",
  });

  const grantConfig = (await pluginStore.get({ key: "grant" })) || {};

  _.keys(newGrantConfig).forEach((key) => {
    if (key in newGrantConfig) {
      grantConfig[key] = _.merge(grantConfig[key], newGrantConfig[key]);
    }
  });

  await pluginStore.set({ key: "grant", value: grantConfig });
};

module.exports = async () => {
  allowGetRoutes("service");
  allowGetRoutes("benefit");
  allowGetRoutes("external-service");
  allowGetRoutes("gender");
  allowGetRoutes("marital-status");
  allowGetRoutes("school-training");

  allowGetRoutes("person");
  allowPostRoutes("person");

  allowGetRoutes("entrance");
  allowPostRoutes("entrance");

  allowGetRoutes("attendance");
  allowPostRoutes("attendance");

  configureGoogleOAuth();

  return;
};
