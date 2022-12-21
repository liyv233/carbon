<template>
  <div>
    <div class="days-con-box" ref="chart">

    </div>
            <div class="find-box">
          <span>查询第</span>
          <div class="in">
            <input type="text" class="inWeek" :value= this.week>
          </div>
          <span>周以前的碳足迹</span>

          <span class="findBtn" @click="find">查询</span>
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
          text: "过去一周",
        },
        tooltip: {},
        legend: {
          data: ["carbon","tree"],
        },
         color: [  '#FF4203','#6a9955'],
        xAxis: {
          // this.times
          data: ["2022-12-12", "2022-12-13", "2022-12-14", "2022-12-15", "2022-12-16", "2022-12-17","2022-12-18"],
        },
        yAxis: {},
        series: [
          {
            name: "carbon",
            type: "bar",
            // this.values
            data: [5,  2, 6, 5, 4, 4,6],
          },
          {
            name:'tree' ,
            type: "bar",
            // this.trees
            data: [0.4, 10, 3,5,  6, 4,1],
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
 const res = await this.$http.get('/carbon/'+ this.week)
 if(res.code == 0) {
    res.data.array.forEach(element => {
        this.times.push(element.savetime)
        this.values.push(element.value)
        this.trees.push((element.value).toFixed(2))
    });

 }
} ,
find() {
 if(this.week > 0) {
  this.init(this.week)
 }
}


  },
  created() {
    // this.init(1)
  },
  mounted() {
     this.getEchartData()  
  }
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
    font-size: 1vw;
    color: rgb(105, 105, 103);
    @media (max-width:1000px) {
      font-size: .7vw;
    }
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
    font-size: 1vw;
    cursor: pointer;
    @media (max-width:1000px) {
      font-size: .7vw;
    }
    border-radius: 1vw;
}
}
</style>