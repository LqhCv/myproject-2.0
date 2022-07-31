<template>
  <div id="app">
    <mainMap></mainMap>
    <OverView></OverView>
    <MyMap></MyMap>
    <Total></Total>
    <Info></Info>
    <div class="contactUs">
      <div class="contactText">
        联系我们
      </div>
      <div class="contactLogo">
        <img src="./assets/contactLogo.png" alt="联系我们">
      </div>

    </div>
  </div>
</template>

<script>
import OverView from '@/components/OverView.vue'
import MyMap from '@/components/MyMap.vue'
import mainMap from '@/components/mainMap.vue'
import Total from '@/components/Total.vue'
import Info from '@/components/Info.vue'
export default {
  name: 'App',
  components: {
    mainMap,
    OverView,
    MyMap,
    Total,
    Info
  },
  data () {
    return {

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.contactUs{
  float: left;
  display: block;
  position: relative;
  width: 100%;
  right:  0%;
  /* background-color:yellow; */
}
.contactLogo,.contactText{
  float: right;
  display: block;
  margin: 10px;
}
.contactLogo:hover,.contactText:hover{
  cursor: pointer;
}
</style>
