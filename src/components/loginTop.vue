<template>
<div class="LoginTop">
 <div class="LoginTop-box">
 
     <span class="top">{{ middleTop }}</span>
  
  </div>
</div>
</template>

<script>
export default {
props:['middleTop']
}
</script>

<style  lang = "less" scoped>

.LoginTop-box {
    height: 4vw;
    padding-top: 3vw;
 justify-content: center;
 display: flex;
    background-color: white;
  
  
    @media (max-width:1000px) {
        margin-top: 6vh;
        margin-bottom: 5vh;
    }
    .top {
        margin: auto;
          font-size: 1.1em !important;
    }
}
</style>