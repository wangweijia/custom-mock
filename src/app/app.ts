import * as Koa from 'koa';
import * as HttpStatus from 'http-status-codes';
const Mock = require('mockjs');

const app:Koa = new Koa();

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Initial route
app.use(async (ctx:Koa.Context) => {
  const temp = Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
  });
  ctx.body = JSON.stringify(temp);

});

// Application error logging.
app.on('error', console.error);

export default app;