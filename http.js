import axios from 'axios'

const http = axios.create ({
    baseURL : '/api'
})

// http.interceptors.request.use(config => {
//     // 为请求头添加Authorization字段为服务端返回的token
//     if( localStorage.getItem('token') ) {
//       config.headers.Authorization = localStorage.getItem('token')
//     }
//     // return config是固定用法 必须有返回值
//     return config
//   } , function(error) {
//     this.$msg.fail('请先登录！')
//     router.push('/login')
//     return Promise.reject(error)
//   })

  //异步请求后，判断token是否过期
  http.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            // localStorage.removeItem('token');
            this.$router.push('/'); 
        }
      }
    }
)

export default http

