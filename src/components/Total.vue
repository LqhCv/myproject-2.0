<template>
  <div class="total">
    <div class="left">
      <p>
        共计
      </p>
    </div>
    <div class="right">
      <p class="number">{{total}} </p>
      <p>方言条数</p>
      <p class="number" id="num1">{{people}}</p>
      <p>贡献人数</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Total',
  data () {
    return {
      total: '243456',
      people: '15430'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.total{
  float: left;
  display: block;
  position: relative;
  margin-top: 10px;
  /* margin-bottom: 100px ; */
  width: 33%;
  min-height:336px;
  left: 8%;
  background-color:#9E3537;
   border: 1px solid;
}
.total:hover{
  /* padding: 20px; */
  border: 1px solid white;
}
.left,.right{
  float: left;
  /* position:absolute; */
}
.right{
  width: 80%;
  text-align: left;
}
.left{
  width: 20%;
}

.left>p,
.right>.number {
  color: yellow;
  /* font-size: large; */
}

.left>p {
  font-size: x-large;
}

.right>p {
  color: white;
  font-size: large;
  margin-left: 20px;
}

p[class="number"] {
  font-weight: bolder;
  font-size: xx-large;
  margin-top: 25px;
}

#num1 {
  margin-top: 80px;
}
</style>
