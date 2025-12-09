/**
 * @fileoverview cf no url
 * @author wangyang
 */
 "use strict";

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 /** @type {import('eslint').Rule.RuleModule} */
 module.exports = {
   meta: {
     type: null, // `problem`, `suggestion`, or `layout`
     docs: {
       description: "cf check env",
       recommended: false,
       url: null, // URL to the documentation page for this rule
     },
     fixable: null, // Or `code` or `whitespace`
     schema: [{
        type: "object",
        properties: {
            baseUrl:[
              {
                leftname: {
                    type: "string",
                    default: 'VUE_APP_API_BASE_URL'
                },
                rightvalue: {
                    type: "string",
                    default: 'https://ms.jr.jd.com'
                }
            }
          ]
        }
          ,
        additionalProperties: false
     }], // Add a schema if the rule has options
     messages: {
       avoidEnv: "env 配置项 {{left}} {{url}} 不合法.",
   },
   },
 
   create(context) {
      const config = context.options[0].baseUrl || [
        {
          leftname: 'VUE_APP_API_BASE_URL',
          rightvalue: 'https://ms.jr.jd.com'
        }
      ];
      if(process.env.NODE_ENV ==='production') {
        const node = context.getSourceCode().ast;
        config.forEach(con => {
          const {leftname, rightvalue} = con;
          if(process.env[leftname]!==rightvalue) {
            context.report({
              node,
              messageId: 'avoidEnv',
              data: {
                left: leftname,
                url: process.env[leftname]
              }
            }); 
          }
        });
        const env = process.env
        for(const key in env) {
          if(key.indexOf('VUE_APP_URL') > -1) {
            const url = env[key]
            if(url.match(/openjdjrapp:\/\/.+/) == null) { //非客户端协议url
              if(url.match(/https:\/\/.+/) == null) {
                context.report({
                  node,
                  message: 'URL:' + url + ' 不合法,需是https'
                }); 
              }else if(url.indexOf('minner') > 0 || url.indexOf('test') > 0) {
                context.report({
                  node,
                  message: 'URL:' + url + ' 不合法,请检查是否为生产环境URL'
                });
              }
            }
          }
        }
      }
     // variables should be defined here
     return {
     };
   },
 };
 