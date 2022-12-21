<template>
  <div class="item"   v-if="detailitem" style="cursor: pointer;">
    <div class="item-box">
        <!-- + detailitem.img -->
        <!-- :style="{background: 'url(' + this.url + ') ' + 'no-repeat center center'}" -->
            <!--    :style=" 'background: ' + 'url(' + encodeURI(detailitem.img) + ') '"  -->
    <div class="itemimg"
:style=" 'background: ' + 'url(' + encodeURI(detailitem.img) + ') '  + 'no-repeat center center'"
    @click="chooseitem">
  </div>

  
    <!-- {{ + detailitem.name}} -->
    <span class="name"  @click="chooseitem">{{detailitem.name}}</span>
  </div>
  
  </div>
</template>

<script>
export default {
    props:['detailitem'],
  data() {
    return {
       
    };
  },
  methods: {
    chooseitem() {
        this.$emit('bechose',this.detailitem)
    } ,
    setImg() {
      var img = document.querySelector('.itemimg')
  
      img.style.background = 'url(' + this.detailitem.img + ') ' 
    }
  },
 mounted() {
  // this.setImg()
 }
};
</script>
<style lang="less" scoped>
.item {
    display: flex;
}

.item-box {
    width: 18vw;
    height: 9vh !important;
    background-color: white;
     
    display: flex;
    flex-direction: column;
    align-items: center;
    
    // and (orientation: landscape)
    @media (min-width:1000px)  {
        width: 6vw;
    }
    .itemimg {
     background-size:contain;
    width: 80%;
    height: 80%;
    cursor: pointer;
      @media (max-width:500px) {
        width: 50%;
    height: 50%;
      background-size:contain !important;
    }
    }
    .name {
        color: rgb(129, 134, 134);
  font-size: .1rem;
        font-weight: 600;
        cursor: pointer;
    }
}
</style>