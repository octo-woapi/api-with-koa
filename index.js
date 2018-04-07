const Koa = require("koa");
const koaRouter = require("koa-router")();
const koaBody = require("koa-body")();

const env = process.env.NODE_ENV || "development";

module.exports = async () => {
  const conf = require("./conf")(env);
  const database = require("./src/database")(conf, env);
  const models = require("./src/models")(database);

  await database.sync({});

  const schemas = require("./src/schemas");
  const exceptions = require("./src/services/exceptions");
  const services = require("./src/services")(schemas, models, exceptions);
  const { route } = require("./src/routers")(services, exceptions);

  const app = new Koa();
  app.use(koaBody);

  route(koaRouter);

  app.use(koaRouter.routes());

  return app;
};
