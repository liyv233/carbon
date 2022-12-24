<template>
  <div class="reginster-box">
    <div class="reginster-con">
      <div class="imgs"></div>

      <div class="demo-ruleForm">
        <Login-top middleTop="注册"></Login-top>
        <Login-text
          label="昵称"
          placeholder="昵称应为1-12位字符或数字"
          rule="^.{1,12}$"
          @inputContent="(res) => (username = res)"
        
        >
        </Login-text>
        <Login-text
          class="phone-login"
          label="账号"
          placeholder="请输入手机号"
          rule="^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$"
          @inputContent="(res) => (phone = res)"
     
        >
        </Login-text>
        <Login-text
          label="密码"
          placeholder="密码应为8位以上字符或数字"
          rule="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          type="password"
          ref="psdInput"
          @inputContent="(res) => (password = res)"
        >
        </Login-text>

        <div class="login-btn-box">
          <login-btn
            btntext="注册"
            @registerSubmit="register"
            toUrl="/register"
          ></login-btn>
          <login-btn
            btntext="密码登录"
            @registerSubmit="login"
            class="loginBtn"
            toUrl="/login"
            ref="loginSub"
          ></login-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginTop from "@/components/loginTop.vue";
import LoginText from "@/components/loginText.vue";
import LoginBtn from "@/components/loginBtn.vue";
export default {
  name: "Loginup",
  components: {
    LoginTop,
    LoginText,
    LoginBtn,
  },
  data() {
    return {
      username: "",
      phone: "",
      password: "",
    };
  },
  methods: {
    async register() {
      if ( this.username == "error") {
         this.$msg.fail("昵称不符合规范");
         return
        
      } else if (this.phone == "error") {
        this.$msg.fail("账号不符合规范");
          return
     
      } else if ( this.password == "error") {
          this.$msg.fail("密码不符合规范");
            return
      }
      if (this.username.indexOf(" ") != -1) {
        this.$msg.fail("昵称存在空格！");
          return
      }

      if (this.username && this.phone && this.password != "") {
        const  {data:res} = await this.$http.post("/user/register", {
          nick: this.username,
          phone: this.phone,
          password: this.password,
        });
        if (res.code == 1) {
          if(res.info == '参数错误')
         { this.$msg.fail(res.info);}
          else { this.$msg.fail(res.data);}
        } else if (res.code == 0) {
          this.$msg.fail("注册成功！请重新登录");
          this.$router.push("/login");
        }
      } else {
        this.$msg.fail("昵称/账号/密码不能为空！或格式不正确");
          return
      }
    },
    login() {
      console.log("ok");
    },
  },
};
</script>
<style lang="less" scoped>
.reginster-box {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
}

.reginster-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url("../../public/static/images/bg.png") no-repeat center center;
  filter: blur(70px);
  z-index: -1;
  background-size: cover;
  transform: scale(1.2);
}
.reginster-con {
  margin: auto;
  margin-top: 25vh;
  width: 60vw;
  height: 50vh;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  border-radius: 1vw;
  border: 1px solid rgb(179, 170, 170);
  box-shadow: -1px 1px 2px 2px rgba(213, 214, 214, 0.2);
  background-color: white;
  @media (max-width: 1000px) {
    width: 100vw;
  }

  .imgs {
    width: 30vw;
    height: 50vh;
    background: url("../../public/static/images/bg.png") no-repeat center center;

    background-size: cover;
  }
  .demo-ruleForm {
    width: 30vw;
    @media (max-width: 1000px) {
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
        @media (max-width: 1000px) {
          margin-top: 1vh;
        }
      }
      .loginBtn {
        background-color: rgb(221, 212, 217);
        border: 1px solid rgb(167, 170, 172);
      }
    }
  }
}
</style>
