const axios = require('axios')
 
axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/7df5b3da-84ee-408e-b47f-0e7ec6ae0867', {
  todo: 'Buy the milk'
})
.then((res) => {
  console.log(`statusCode: ${res.statusCode}`)
  console.log(res)
})
.catch((error) => {
  console.error(error)
})