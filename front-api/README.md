# admin-api

#### 介绍

koa 项目模板

#### 软件架构

软件架构说明

#### 安装教程

> cd admin-api/
>
> npm install

修改 /config/config.json 文件数据库账号密码

创建数据库

> npx sequelize-cli db:create

创建表

> npx sequelize-cli db:migrate

运行种子文件

> npx sequelize-cli db:seed:all

运行项目

> npm run dev

访问： http://127.0.0.1:9999/
