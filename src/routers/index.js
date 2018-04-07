module.exports = (services, exceptions) => {
  const productsRouter = require("./products")(services, exceptions);
  const ordersRouter = require("./orders")(services, exceptions);
  const billsRouter = require("./bills")(services, exceptions);

  return {
    route(router) {
      router.post("/products", productsRouter.create);
      router.get("/products", productsRouter.list);
      router.get("/products/:id", productsRouter.find);
      router.delete("/products", productsRouter.removeAll);

      router.post("/orders", ordersRouter.create);
      router.get("/orders", ordersRouter.list);
      router.get("/orders/:id", ordersRouter.find);
      router.delete("/orders", ordersRouter.removeAll);
      router.put("/orders/:id/status", ordersRouter.updateStatus);

      router.get("/bills", billsRouter.list);
      router.delete("/bills", billsRouter.removeAll);
    }
  };
};
