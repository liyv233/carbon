<template>
  <div class="logintext-box" >
      <van-field
      label-width = 1px
       v-model="content" 
      :type="type"
      :placeholder="placeholder"
      :rule="rule"
      />
  </div>
</template>

<script>
export default {
props:['label' , 'type' , 'placeholder' , 'rule' ,'errMsg'] ,
 methods : {
   jugRule () {
     const rue = new RegExp(this.rule)
     if(rue.test(this.content)) {
       this.$emit('inputContent' , this.content)
     } else {
       
       this.$emit('inputContent' , 'error')
     }
   } ,

 } ,
data() {
  return {
    content : '' 
  }
} ,
watch : {
  content () {
    this.jugRule () 
  }
}
}
</script>

<style lang = "less" >

.van-field {
    height: 3vw;
    font-size: 1vw !important;
 width: 80% !important;
 justify-content: center;
 align-items: center;
 margin: auto;
 border-bottom: 1px solid rgb(6, 141, 85);
    @media (max-width:1000px) {
         /* font-size: .8vw !important; */
         margin-bottom: 1vh;
    }
}

</style>