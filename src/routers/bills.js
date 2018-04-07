module.exports = ({ bills }) => {
  return {
    async list(ctx) {
      ctx.body = await bills.list();
      ctx.response.status = 200;
    },

    async removeAll(ctx) {
      bills.removeAll();
      ctx.response.status = 204;
    }
  };
};
