module.exports = ({ products }, { MissingResourceError }) => {
  return {
    async find(ctx) {
      const { id } = ctx.params;
      try {
        ctx.body = await products.find(id);
        ctx.response.status = 200;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async list(ctx) {
      const { sort } = ctx.query;
      try {
        ctx.body = await products.list(sort);
        ctx.response.status = 200;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async create(ctx) {
      const { body } = ctx.request;
      try {
        const id = await products.create(body);
        ctx.response.status = 201;
        ctx.response.set("location", `/products/${id}`);
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async removeAll(ctx) {
      try {
        products.removeAll();
        ctx.response.status = 204;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    }
  };

  function getStatusCode(error) {
    if (error instanceof MissingResourceError) {
      return 404;
    } else {
      return 400;
    }
  }
};
