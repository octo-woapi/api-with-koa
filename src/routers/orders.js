module.exports = ({ orders }, { MissingResourceError }) => {
  return {
    async updateStatus(ctx) {
      const { id } = ctx.params;
      const { status } = ctx.request.body;
      try {
        await orders.updateStatus(id, status);
        ctx.response.status = 200;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async find(ctx) {
      const { id } = ctx.params;
      try {
        ctx.body = await orders.find(id);
        ctx.response.status = 200;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async list(ctx) {
      const { sort } = ctx.query;
      try {
        ctx.body = await orders.list(sort);
        ctx.response.status = 200;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async create(ctx) {
      const { body } = ctx.request;
      try {
        const id = await orders.create(body);
        ctx.response.set("location", `/orders/${id}`);
        ctx.response.status = 201;
      } catch (e) {
        ctx.response.status = getStatusCode(e);
        ctx.body = { data: e.data || e.message };
      }
    },

    async removeAll(ctx) {
      try {
        await orders.removeAll();
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
