// http.ts
const axios = require('axios');
const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
// @ts-ignore

//转发步骤：Koa监听，Axios发送请求到Webhook
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：

app.use(bodyParser());
app.use((ctx, next) => {
    if(ctx.request.method == "POST"){
        console.log("--------------------------------------------")
        var requestBodyJson = ctx.request.body
        var pusher = requestBodyJson.pusher.name
        var branch = requestBodyJson.ref
        var commit = requestBodyJson.commits[0].message
        var date = requestBodyJson.commits[0].timestamp.split("T")[0]
        var detailTime = requestBodyJson.commits[0].timestamp.split("T")[1].split("+")[0]
        var time = date+" "+detailTime
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
                                    text: branch
                                },
                            ],
                            [
                                {
                                    tag: "text",
                                    text: "commit: "
                                },
                                {
                                    tag: "text",
                                    text: commit
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

        axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/7df5b3da-84ee-408e-b47f-0e7ec6ae0867', transContent)
            // @ts-ignore
            .then((res) => {
                console.log('res')
                console.log(res)
                console.log("--------------------------------------------")
                ctx.response.status = 200
                ctx.response.body = "POST Success!"
            })
            // @ts-ignore
            .catch((error) => {
                console.log(error)
                console.log("--------------------------------------------")
                ctx.response.status = 400
                ctx.response.body = "POST Error!"
            })
    } else if(ctx.request.method == "GET"){
        console.log("--------------------------------------------")
        console.log("GET request")
        ctx.response.status = 200
        ctx.response.body = "GET Success!"
    }
    
    ctx.response.body = "Hello!"
    
});

const port = 2900;
app.listen(port, () => {
    console.log(`seccess start server, listen 2900`)
})