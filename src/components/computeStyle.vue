<template>
    <div class="control-box">
        <div class="control-con">
            <div class="one-con">
                <div class="img" @click="to_one"></div>
                <div  class="title" @click="to_one">单个计算</div>
            </div>
            <div class="day-con">
                <div class="img" @click="to_day"></div>
                <div  class="title" @click="to_day">每日轨迹</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    methods: {
        to_one() {
            this.$$emit('compute_one')
        } ,
        to_day() {
              if(localStorage.getItem("nick"))  {
        this.$router.push('/days')
      } else {
        this.$msg.fail('您还没有登录哦')
      }
           
        }
    },

};
</script>
<style lang="less" scoped>
.control-box {
    z-index: 999;
    position: fixed;
    top: 40vh;
    right: 0;
    width: 5vw;
    height: 10vh;
    background-color: white;
   
 @media (max-width: 1000px) {
    width: 13vw;
  }
   @media (max-width: 450px) {
    width: 18vw;
  }
    .img {
            width:60%;
            height: 6vh;
            margin: auto ;
            padding-top: 1vh;
           cursor: pointer;
            
        }
        .title {
            width: 100%;
            font-size: 1em;
            font-weight: 900;
            text-align: center;
            color: rgb(12, 165, 81);
            cursor: pointer;
        }
    .one-con {
        width: 100%;
        height: 10vh;
        display: none;
   
     .img {
        background:url('../../public/static/images/环保健康.png') no-repeat center center;
        background-size: cover;
     }
    }

    .day-con {
        width: 100%;
        height: 10vh;
       
        .img {
        background:url('../../public/static/images/数据 折线图.png') no-repeat center center;
        background-size: cover;
      @media (max-width: 1000px) {
     background-size: contain;
     scale: 1.2;
       height: 5vh;
      
  }
     }
    }
   
}
</style>
