<template>
  <div>
    <div class="days-con-box" ref="chart">

    </div>
            <div class="find-box" v-if="this.trees.length>0">
          <span>查询第</span>
          <div class="in">
            <input type="text" class="inWeek" v-model = week>
          </div>
          <span>周以前的碳足迹</span>

          <span class="findBtn" @click="find">查询</span>
        </div>
        <div class="null-box" v-else>
          <div class="null-img"></div>
         <div class="null">
           <span>您没有任何记录，请</span>
          <span class="toHome" @click="toHome">点击</span>
          <span>前往添加第一条记录</span>
         </div>
        </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        times:[] ,
        values:[] ,
        trees:[] ,
        week:1
    };
  },
  watch: {},
  computed: {},
  methods: {
 getEchartData() {
     // 基于准备好的dom，初始化echarts实例  
      let myChart = this.$echarts.init(document.querySelector('.days-con-box'));
      // 指定图表的配置项和数据
      let option = {
        title: {
          // this.week + '周前'
          text: '过去 ' + this.week  + '周'
        },
        tooltip: {},
        legend: {
          data: ["carbon","tree"],
        },
         color: [  '#FF4203','#6a9955'],
        xAxis: {
          // this.times
          data:  this.times
        },
        yAxis: {},
        series: [
          {
            name: "carbon",
            type: "line",
            // this.values
            data:  this.values
          },
          {
            name:'tree' ,
            type: "line",
            // this.trees
            data:this.trees
          }
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);

    } ,
async init(week) {
   this.times = []
    this.values = []
    this.trees = []
 const  {data:res} = await this.$http.get('/carbon/'+ week)

 if(res.code == 0) {
  console.log(res);
 for (let index = 0; index < res.data.length; index++) {
    this.times.push(res.data[index].savetime)
        this.values.push(res.data[index].value)
        this.trees.push((res.data[index].value/111).toFixed(2))
         this.getEchartData()  
 }

 }
} ,
find() {
 if(this.week > 0) {
  console.log(this.week);
  this.init(this.week)
 }
} ,
toHome() {
  this.$router.push('/')
}


  },
  created() {
    this.init(1)
  },
};
</script>
<style lang="less" scoped>
.days-con-box {
    margin-top: 5vh !important;
    width: 90vw;
    height: 50vh;
    margin: auto;
 @media (max-width:1000px) {
     width: 100vw !important;
       margin: auto;
 }
}
.find-box {
  width: 100vw;
  margin-top: 5vh;
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
   @media (max-width:1000px) {
      margin-top: 1vh;
    }

  span {
    font-size: 1.1em;
    color: rgb(105, 105, 103);
    // @media (max-width:1000px) {
    //   font-size: .7vw;
    // }
  }

  .in {
    margin: 0 1vw;
    border-bottom: 1px solid rgb(116, 112, 112);
    input {
      width: 3vw;
      text-align: center;
      border: 0;

        @media (max-width:1000px) {
    width: 10vw;
    }
    }
  }

.findBtn {
  padding: .3vh 1vw;
  background-color: #73c991;
  color: white;
  margin-left: 2vw;
    font-size: 1em;
    cursor: pointer;
    // @media (max-width:1000px) {
    //   font-size: .7vw;
    // }
    border-radius: 1vw;
}
}
.null-box {
  .null-img {
    position: absolute;
    top: 8vh;
    left: 42%;
    width: 18vw;
    height: 30vh;
    background: url('../../public/static/images/nodata.4d721f9d.png') no-repeat center center;
    background-size: cover;
    @media (max-width:1000px) {
      width: 100vw;
      left: 0;


      background-size: contain;
     
    }
  }
.null {
  height: 3vh;
  transform: translateY(-9vh);
}
  .toHome {
      
            color: rgb(184, 124, 124);
            border-bottom: 1px solid rgb(184, 124, 124);
            cursor: pointer;
              margin: 1vh ;
              
            @media (max-width:1000px) {
               width: 5vh;
               
            }
  }
}
</style>