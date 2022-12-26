<template>
  <div  class="home" v-if="category">
    <topNav></topNav>
<div class="style-box">
<computestle></computestle>
</div>
    <div class="carbon-box">
  
        <van-tabs v-model="active" swipeable  color=#0ab48f>
          <van-tab v-for="item in category" :key="item.id" :title="item.name" >
            <div class="detailparent">
              <cItem
                class="detailitem"
                :detailitem="item"
                v-for="item in items"
                :key="item.id"
                @bechose="chose"
              ></cItem>
            </div>
          </van-tab>
        </van-tabs>
      
      <div class="compute-box">
        <div class="con-one" >
          <p >{{this.comItem.name}}</p>
            <div class="num-box">
                <button type="primary" @click="reduce()"> - </button>
            <!-- <p style="margin-left: 1vw;margin-right: 2vw;"> {{ this.comItem.count }} </p> -->
            <div class="in">
            <input type="text" class="inWeek" v-model = comItem.count>
          </div>
            <button type="primary" @click="add()" > + </button>
          
            </div>
            <p>{{this.comItem.unit}}</p>

             
        </div>
        <div class="btn-line">
                      <button type="primary" @click="addItem()" > 添加 </button>
             <button type="primary" @click="compute()" style="margin-left:1vw;margin-top:2vh;" > 计算 </button>
        </div>
        <div class="day-items-box" >
          <!-- -->
          <div class="items" v-for="item in this.coms " :key="item.name" :v-if="coms " >
             <div >
              <span >{{item.name }}</span>
            <span  >{{ item.count }}</span>
            <span  >{{item.unit}}</span>
            <span class="del" @click="del(item.index)"  >删除</span>
             </div>
          </div>
        </div>
        <div class="res-box" >
          <p style="margin-top:2vh;">共排放二氧化碳 {{this.carbon}} 千克</p>
          <p>你需要种植  {{this.tree}}  棵树才能实现碳中和</p>
          <span class="updata" @click="updata">将本次结果更新为今日碳轨迹</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemData from "@/data";
import category from "@/category";
import cItem from "@/components/carbonItem.vue";
import topNav from "@/components/nav.vue";
import computestle from '@/components/computeStyle.vue'
export default {
  components: {
    cItem,
    topNav,
    computestle
  },
  props: {},
  data() {
    return {
      category: category,
      data: itemData,
      items: itemData[0],
      active: 0,
      coms:[],
      comItem:{
        name:'物品' ,
        count:0 ,
        unit:'单位' ,
        carbon: 0 ,
        index:0 
      } ,
      is_compute:false ,
      carbon:0 ,
      tree:0,

    };
  },
  watch: {
    active() {
      this.items = this.data[this.active];
    },
  },
  methods:{
add() {
  this.comItem.count++ ;
} ,
reduce() {
  if (this.comItem.count>0) this.comItem.count-- ;
   
} ,
chose(item) {
this.comItem = item ;
 $('.res-box').css('display','none')
 if(this.is_compute) {
  this.coms = []
 
  this.is_compute = !this.is_compute
 }
},
compute() {
  this.is_compute = true
   this.carbon = 0 ;
    this.tree = 0
  if(this.coms.length>0) {
 this.coms.forEach(item =>{
   
    this.carbon += item.count * item.carbon
  })

  } else {
    this.carbon = this.comItem.count * this.comItem.carbon
  }
 
if(this.carbon > 0) {
  this.tree = (this.carbon / 270).toFixed(2)
  this.carbon = (this.carbon).toFixed(2)
  $('.res-box').css('display','block')

  this.comItem.count = 0
}
} ,
addItem() {
  this.comItem.index = this.coms.length

  var item = {...this.comItem}
 
   if(item.count>0 && item.name != '物品') {
     this.coms.push(item)
  }
  this.comItem.count = 0
} ,
del(index) {
  this.coms.splice(index, 1)
  if(this.coms.length == 1) {
    this.coms[0].index = 0
  }
  for(var i = index  ; i < this.coms.length ; i++) {
    this.coms[i].index--
  }
  
} ,
// 更新碳轨迹
async updata() {
  console.log(this.carbon);
 const  {data:res} = await this.$http.post('/carbon' , {
  value: Number(this.carbon)
 })
 console.log(res);
 if(res.code == 0) {
  this.$msg.fail('更新成功')
 } else {
  this.$msg.fail(res.info)
 }

}



  } ,
  created() {
 
  },
};
</script>
<style lang="less" scoped>
.home {
  background-color: white;
}
.carbon-box {
  position: relative;

  .compute-box {
    margin: auto;
    margin-top: 1vh;
    width: 90vw;
    
      @media (min-width: 1000px) {
    width: 70vw;
  
  }
   overflow: hidden;
    border-bottom: 1px solid rgb(194, 190, 190);
  padding-bottom: 1vh;
  padding-top: 2vh;
  padding-bottom: 2vh;
  .con-one {
    display: flex;
    align-items: center;
    justify-content: center;
  
    // p {
    //    @media (max-width:450px) {
    //           font-size: .2vw ;
    //         }
    // }

  }
      .num-box {
        width: 20vw;
        height: 4vh;
        display: flex;
        justify-content: center;
        align-items: center;
   @media (max-width:850px) {
              width: 40vw;
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
        button {
            height: 3vh;
            padding: 0 1.5vw;
            margin-right: 1vw;
            background-color: #0ab48f;
            color: white;
            font-weight: 900;
            line-height: 3vh;
            border: none;
            border-radius: .3vw;
            cursor: pointer;
            @media (max-width:850px) {
              padding: 0 3vw;
            height: 2vh;
            line-height: 2vh;
            }
           @media (max-width:450px) {
              padding: 0 4vw;
            height: 2.5vh;
            line-height: 2.5vh;
            }
        }
        button:hover {
            background-color: rgb(6, 163, 142);
        }
      .day-items-box {
     
        width: 40vw;
        margin:auto;
        margin-top: 2vh;
        @media (max-width:1200px) {
          width: 80vw;
        }
      }
        .items {
          
          display: inline-block;
          padding: .6vh 2vw;
         border-bottom: 1px solid rgb(211, 205, 205);
          color: rgb(92, 92, 92);
         
          span {
               display: inline-block;
            width: 5vw;
            @media (max-width:900px) {
              width: 10vh;
            }
          }
          .del {
            width: 3.5vw;
            color: rgb(184, 124, 124);
            border-bottom: 1px solid rgb(184, 124, 124);
            cursor: pointer;
            @media (max-width:1000px) {
               width: 5vh;
            }
          }
        }
  }
}
.detailparent {
  margin: auto;
  width: 90vw;
 
  @media (min-width: 1000px) {
    width: 70vw;
  }
  
  
  display: flex;
   flex-direction: row;
  flex-wrap: wrap;
  align-content:flex-start;
  margin-top: 2.5vw;
  border-bottom: 1px solid rgb(194, 190, 190);
  padding-bottom: 1vh;
}

.res-box {
  display: none;
  .updata {
    display: inline-block;
    padding: 0 1vw;
    margin-top: 1vh;
     color: rgb(184, 124, 124);
   border-bottom: 1px solid rgb(184, 124, 124);
   cursor: pointer;
  }
}
</style>