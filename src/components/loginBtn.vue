<template>

      <div   @click="registerClick"> 
        <router-link 
        :to = routerUrl
        class="login-btn"
        >{{btntext}}</router-link> 
      </div>
  
</template>

<script>
export default {
props:['btntext' , 'toUrl' , 'fontColor'] ,
methods : {
    registerClick () {
        this.$emit('registerSubmit')
    }
} ,
data() {
    return {
        routerUrl : this.toUrl
    }
}

}
</script>

<style lang = "less" scoped>

.login-btn {
    display: block;
    width: 100%;
    text-align: center;
    line-height: 3VW;
    height: 100%;
    color: white;
   border-radius: 5% ;
      @media (max-width:1000px) {
        padding: .5vh 0 ;
        font-size: .8vw !important;
        
    }
}

</style>