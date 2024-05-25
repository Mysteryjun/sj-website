const rules = require('../rules/index');
const { ParameterException } = require('./http-exception')

/**
 * 
 * ctx: koa的ctx对象
 * checkLists: 要校验的字符串列表,例如：['userName','password']
 * errors: 返回校验信息,例如： 
 * {
        "userName": "参数缺失",
        "password": "参数缺失"
    }
 * 
 */
class Validator {
    constructor (ctx = {
        query: null,
        params: null,
        request: {
            body: null,
            header: null,
            files: null
        }
    }) {
        this.ctx = ctx
        // 合并所有参数
        this.parameters = Object.assign({}, ctx.query, ctx.params, ctx.request.body, ctx.request.header, ctx.request.files)
    }
    // 校验字段
    check (checkLists = []) {
        let errors = {}
        // console.log(this.parameters)
        for (let item = 0; item < checkLists.length; item++) {
            if (this.parameters[checkLists[item]] !== undefined && rules[checkLists[item]]) {
                for (let list = 0; list < rules[checkLists[item]].checkChildren.length; list++) {
                    try {
                        // console.log(rules[checkLists[item]].checkChildren[list], this.parameters[checkLists[item]])
                        if (!rules[checkLists[item]].checkChildren[list].validator(this.parameters[checkLists[item]], this.ctx)) {
                            // if(!errors[checkLists[item]]){
                            //     errors[checkLists[item]] = {}
                            // }
                            errors[checkLists[item]] = rules[checkLists[item]].checkChildren[list].message
                            console.log(errors[checkLists[item]], rules[checkLists[item]])
                            break
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            } else {
                console.log(rules[checkLists[item]])
                if (rules[checkLists[item]].require) {
                    errors[checkLists[item]] = '参数缺失'
                }
            }
        }

        if (Object.keys(errors).length) {
            throw new ParameterException(errors)
        }
    }
    // 获取字段
    get (str) {
        return this.parameters[str]
    }
}

module.exports = Validator