const COS = require('cos-nodejs-sdk-v5');
const { SecretId, SecretKey, Bucket, Region, prefix } = require('../config/config.js');

const cos = new COS({
    SecretId,
    SecretKey,
});

class InfoManageController {
    // 上传图像
    async uploadImage(ctx) {
        console.log(ctx.request);
        try {
            const { base64Code, picType } = ctx.request.body; // 获取前端传来的base64编码和图片后缀 如png
            const dataBuffer = Buffer.from(base64Code, 'base64'); // base64 -> 二进制Buffer
            const data = await cos.putObject({
                Bucket, // 存储桶名称
                Region, // 存储桶所在地域
                Key: prefix + new Date().getTime() + `.${picType}`, // 可以理解为图片存储的路径+名称(唯一) 例如：indexImages/1670050961361.png
                Body: dataBuffer, // 上传文件的内容，可以为 FileStream、字符串、Buffer, 我们这里接收二进制Buffer
                onProgress: function (progressData) {
                    console.log(progressData);
                },
            });

            const imageUrl = `https://${data.Location}`;
            console.log('上传图片的url为', imageUrl);

            ctx.body = global.success(0, {
                path: imageUrl,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new InfoManageController();
