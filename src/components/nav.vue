<template>
  <div class="nav-box">
    <div class="logo-box">
      <div class="logo"></div>
      <div class="title-box">
        <div class="empty"></div>
        <div class="title">碳足迹</div>
      </div>
    </div>
    <div class="empty"></div>

    <van-popover
      v-model="showPopover"
      trigger="click"
      :actions="actions"
      theme="dark"
      @select="onSelect"
      placement="bottom-end"
    >
      <template #reference>
        <div class="hander-box" ref="hander" style="height: 100%">
          <span> </span>
          <span class="name" style="cursor: pointer" @click="toLogin"
            ><van-icon name="wap-nav" color="white" />{{ Phander }}</span
          >
        </div>
      </template>
    </van-popover>
    <div class="del-box"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      Phander: "登录",
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: "注销" }],
    };
  },

  methods: {
    getHanderwidth() {
      var hander = document.getElementsByClassName("hander-box");
      var logo = document.querySelector(".logo");
      hander[0].childNodes[0].style.lineHeight =
        hander[0].offsetHeight * 0.8 + "px";
      hander[0].childNodes[0].style.width =
        hander[0].childNodes[0].style.height =
          hander[0].offsetHeight * 0.8 + "px";
      logo.style.width = hander[0].offsetHeight + "px";
    },
    toLogin() {
      if (!localStorage.getItem("nick")) {
        this.$router.push("/login");
      }
    },
    onSelect() {
      this.$http
        .delete("/user")
        .then((rep) => {
          if (rep.data.code == 0) {
           this.$router.push('/')
            localStorage.removeItem("nick") ;
             this.Phander = '登录'
            this.$msg.fail('注销成功');
          } else {
            this.$msg.fail(rep.data.info);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    init() {
      if(localStorage.getItem("nick"))  {
        this.Phander = localStorage.getItem("nick") ;
      }
    }
  },
  created() {
this.init()
  },
  mounted() {
    this.getHanderwidth();
  },
};
</script>
<style lang="less" scoped>
.nav-box {
  width: 100vw;
  height: 7vh;
  display: flex;
  justify-items: start;
  background-color: rgb(5, 71, 44);
  border-bottom: 1px solid rgb(173, 168, 168);
  overflow: hidden;
  .logo-box {
    width: 35%;
    height: 100%;
    display: flex;
    justify-items: flex-start;
    // background-color: aqua;

    .logo {
      margin-left: 1vw;
      height: 100%;
      background: url("../../public/static/像素_树.png") no-repeat center center;
      background-size: contain;
      // background-color: aquamarine;
    }
    .title-box {
      height: 100%;
      margin-left: 0.5vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // background-color: black;
      .title {
        font-size: 1.4em;
        font-weight: 900;
        color: white;
        letter-spacing: 0.2vw !important;
        @media (max-width:500px) {
           font-size: 1.1em;
        }
      }
    }
  }
  .empty {
    flex: 1;
  }
  .hander-box {
    height: 100%;
    margin-right: 2vw;
    display: flex;
    align-items: center;

    span {
      font-weight: 900;
      color: white;
      font-size: 1.4em;

      @media (max-width: 500px) {
        font-size: 1.1em;
        font-weight: 600;
      }
    }
    i {
      cursor: pointer;
    }
  }
}
</style>

