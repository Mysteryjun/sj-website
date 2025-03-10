const koa = require('koa');
const koaBody = require('koa-body');
const Static = require('koa-static');
const path = require('path');
const session = require('koa-session');
const views = require('koa-views');
const compress = require('koa-compress');

const InitManager = require('./app/core/init');
const catchError = require('./app/middlewares/exception');
const auth = require('./app/middlewares/auth.js');
const { accessLogger } = require('./app/middlewares/logger');
const { getUploadFileExt, checkDirExist, getUploadFileName } = require('./app/utils/fileFn');

const app = new koa();

// 静态资源.
// app.use(Static(path.join(__dirname, './static')));
let opts = {
    maxage: 172800, //静态资源2天缓存 实际上 = 172800秒
};
// app.use(Static(path.join(__dirname, './static'), opts));
// 仅缓存图片
app.use(
    Static(path.join(__dirname, './static'), {
        setHeaders(res, path) {
            if (/\.(jpg|jpeg|png|gif|svg)$/.test(path)) {
                res.setHeader('Cache-Control', opts.maxage);
            }
            if (/\.(pdf|txt|doc)$/.test(path)) {
                res.setHeader('Content-Disposition', 'attachment');
            }
        },
    })
);

app.use(
    koaBody({
        multipart: true, //可以上传文件
        formidable: {
            uploadDir: path.join(__dirname, '/static/upload'), // 上传路径
            keepExtensions: true, // 保留扩展名
            onFileBegin: (name, file) => {
                console.log(file);
                // 最终要保存到的文件夹目录
                const dir = path.join(__dirname, `static/upload`);
                // 检查文件夹是否存在如果不存在则新建文件夹
                checkDirExist(dir);
                // 获取文件后缀
                const ext = getUploadFileExt(file.name);
                // 重新覆盖 file.path 属性
                file.path = `${dir}/${getUploadFileName(ext)}`;
            },
            onError: err => {
                console.log(err);
            },
        },
    })
);

//  全局错误处理中间件
app.use(catchError);

// 系统日志
app.use(accessLogger());

// 设置gzip
app.use(
    compress({
        threshold: 2048,
        flush: require('zlib').Z_SYNC_FLUSH,
    })
);

// 配置session
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess',
    maxAge: 60 * 60 * 1000, // cookie的过期时间
    overwrite: true,
    httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true,
    rolling: false,
    renew: true, // true: 在过期时间内访问都会重新更新过期时间
    secure: false,
};

app.use(session(CONFIG, app));

// 拦截，判断token是否过期
app.use(auth());

//配置模板引擎 views是文件地址，意思就是把views下面的文件编译成html文件
app.use(
    views('views', {
        extension: 'ejs',
    })
);

// 程序初始化
InitManager.initCore(app);

// https 服务器
// const https = require('https');//node内置https server
// const fs = require('fs');
// const options = {
//   key: fs.readFileSync("./yjyj.website.key", "utf8"),
//   cert: fs.readFileSync("./yjyj.website_bundle.crt", "utf8")
// };
// https.createServer(options, app.callback()).listen(443, () => {
//   console.log('https server is running 9999...');
// });

app.listen(3000, () => {
    console.log('server is running 3000...');
});
