const Router = require('koa-router');
const requireDirectory = require('require-directory');


const { koaSwagger } = require("koa2-swagger-ui");
const swagger = require("../../swagger");//存放swagger.js的地方



class InitManager {
    static initCore (app) {
        // 入口方法
        InitManager.app = app;
        InitManager.initLoadRouters()
        InitManager.initConfig()
        InitManager.loadHttpException()
        InitManager.loadHttpResponse()
        InitManager.errorCode()
    }

    // 自动化导入路由
    static initLoadRouters (obj) {
        const routerDir = `${process.cwd()}/app/api` // 获取文件夹绝对路径
        requireDirectory(module, routerDir, {
            visit: whenLoadModule
        })

        function whenLoadModule (obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
                InitManager.app.use(swagger.routes(), swagger.allowedMethods());
                InitManager.app.use(
                    koaSwagger({
                        routePrefix: "/swagger", // 接口文档访问地址
                        swaggerOptions: {
                            url: "/swagger.json",//生成json的访问路径
                        },
                    })
                );
            }
        }
    }

    // 装载异常类到全局
    static loadHttpException() {
        const errors = require('../utils/http-exception')
        global.errs = errors
    }

    // response返回
    static loadHttpResponse() {
        const httpResponse = require('../utils/httpResponse')
        global.success = httpResponse
    }

    // 错误码
    static errorCode() {
        const httpCode = require('../utils/httpCode')
        global.httpCode = httpCode
    }

    // 导入配置
    static initConfig (path = '') {
        const configPath = path || process.cwd() + '/app/config/config.js'
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager