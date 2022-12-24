<template>
    <div class="reginster-box"> 
     
      <div class="reginster-con"> 

        <div class="imgs"></div>

   <div class="demo-ruleForm">
    <Login-top middleTop="登录" ></Login-top>
    
    <div class="login-text-box">
   <Login-text 
    class="phone-login"
    label="账号"
    placeholder="请输入手机号"
    @inputContent = "res => phone = res"
    > </Login-text>
    <Login-text 
    label="密码"
    placeholder="请输入密码"
    type="password"
    ref="psdInput"
    @inputContent = "res => password = res"
    > </Login-text>
    </div>




    <div class="login-btn-box">
    <login-btn btntext="注册"
     class="registerBtn"
     toUrl="/register"
     >
     
     </login-btn>
    <login-btn btntext="密码登录"
     @registerSubmit = 'login'
    toUrl="/login"
    ></login-btn>
    </div>
   </div>


      </div>
   
    </div>
</template>

<script>
import LoginTop from '@/components/loginTop.vue'
import LoginText from '@/components/loginText.vue'
import LoginBtn from '@/components/loginBtn.vue'
export default {
    name:'Loginup', 
    components: {
    LoginTop,
    LoginText,
    LoginBtn
} ,
    data(){ 
    return{
  
      phone : '' ,
      password : '' ,
      };
    },
    methods:{
 async  login () {
  
        if(this.phone && this.password != '') { 
      const {data:res} = await  this.$http.post('/user/login' ,
      {
        phone: this.phone ,
        password : this.password
      }
        )
        console.log(res);
         if(res.code == 1) {
          
           if(res.info == '你已经登录过辣') {
             this.$msg.fail(res.info)
            setTimeout(()=> {
            this.$router.push('/')
          },100)
           } else {
             this.$msg.fail(res.data)
           }
        } else if(res.code == 0) {
      
          localStorage.setItem('nick',res.data.nick)
          this.$msg.fail('登录成功')
          setTimeout(()=> {
            this.$router.push('/')
          },100)
        }
    }
    else {
       this.$msg.fail('账号/密码不能为空')
    }



  }
   
    },
    
    }
</script>
<style lang="less" scoped>

.reginster-box {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}

.reginster-box::before {
    content: '';
  position: absolute;
  top: 0;
  left: 0;
    width: 100vw;
  height: 100vh;
 background: url('../../public/static/images/bg.png') no-repeat center center;
 filter: blur(40px);
  z-index: -1;
  background-size: cover;
  transform: scale(1.2);
}
.reginster-con {
  margin: auto ;
  margin-top:25vh;
width: 60vw;
height: 50vh;
overflow: hidden;
display: flex;
align-items: flex-start;
border-radius: 1vw;
border: 1px solid rgb(179, 170, 170);
box-shadow: -1px 1px 2px 2px rgba(213, 214, 214,.2);
background-color: white;
@media (max-width:1000px) {
  width: 100vw;
}

.imgs { 
width: 30vw;
height: 50vh;
background: url('../../public/static/images/bg.png') no-repeat center center;

background-size: cover;
}
.demo-ruleForm {
  width: 30vw;
  @media (max-width:1000px) {
  width: 70vw;
}
  .login-btn-box {
  margin-top: 2.5vh;
  width: 80%;
  margin: auto;
  margin-top: 2vw;
 
   div {
     float: left;
     width: 40%;
     margin-left: 2vw;
     background-color: rgb(46, 177, 109);
    border: 1px solid rgb(46, 177, 109);
     border-radius: 1vw;
   }
   .registerBtn {
       background-color: rgb(221, 212, 217) ;
       border: 1px solid rgb(170, 177, 171);
       
   }
 
}
}
}

</style>
