// http.ts
const axios = require('axios').default;
const Koa = require("koa")
// @ts-ignore

//转发步骤：Koa监听，Axios发送请求到Webhook
// 创建一个Koa对象表示web app本身:
const app:Koa = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：

// @ts-ignore
app.use(async (ctx, next) => {
    if(ctx.request.method == "post"){
        var requestBodyJson = JSON.parse(ctx.request.body)
        var pusher:string = requestBodyJson.pusher.name
        var branch:string = requestBodyJson.ref
        var commit:string = requestBodyJson.commits.message
        var time:string = requestBodyJson.commits.timestamp
        var transContent = {
            msg_type: "post",
            content: {
                post: {
                    zh_cn: {
                        title: "有新的代码提交！",
                        content: [
                            [
                                {
                                    tag: "text",
                                    text: "pusher: "
                                },
                                {
                                    tag: "text",
                                    text: pusher,
                                },
                            ],
                            [
                                {
                                    tag: "text",
                                    text: "branch: "
                                },
                                {
                                    tag: "text",
                                    text: branch,
                                },
                            ],
                            [
                                {
                                    tag: "text",
                                    text: "commit: "
                                },
                                {
                                    tag: "text",
                                    text: commit,
                                },
                            ],
                            [
                                {
                                    tag: "text",
                                    text: "time: "
                                },
                                {
                                    tag: "text",
                                    text: time,
                                },
                            ]
                        ]
                    }
                }
            }
        } 
        await axios({
            method: 'post',
            url: '/transmit',
            data: transContent
        });
        ctx.response.status = 200
        ctx.response.body = "POST Success!"
    } else if (ctx.request.method == "get"){
        ctx.response.status = 200
        ctx.response.body = "GET Success!"
    }
})

const port: number = 3000;
app.listen(port, () => {
    console.log(`seccess start server`)
    console.log(`local: http://127.0.0.1:${port}`)
})