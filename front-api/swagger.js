const router = require('koa-router')();
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
const swaggerDefinition = {
  info: {
    title: "三江人民医院官网",
    version: "v1",
    description: "API",
  },
  basePath: "/",
  //授权（自动传递token）
  securityDefinitions: {
    Authorization: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: ''
    }
  },
};
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, "./app/api/v1/*.js"),path.join(__dirname, "./app/api/v1/web/*/*.js")], // 写有注解的router的存放地址，通过读取路由文件的注释生成json文档
};
const swaggerSpec = swaggerJSDoc(options);
// 访问/swagger.json返回生成的json
router.get("/swagger.json", async function (ctx) {
  ctx.set("Content-Type", "application/json");
  ctx.body = swaggerSpec;
});
module.exports = router;
