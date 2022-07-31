<template>
  <div class="info">
    <div class="info-item" v-for="(item,index) in InfoList" :key="index">
      <div class="info-item-title">
        {{item.title}}
      </div>
      <div class="info-item-img">
        <img :src="item.img" alt="资讯">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data () {
    return {
      InfoList: [
        {
          id: 1,
          title: '留音计划方言保护系列活动',
          img: require('@/assets/info/info1.jpg'),
          url: ''
        },
        {
          id: 2,
          title: '留音计划语音征集',
          img: require('@/assets/info/info2.jpg'),
          url: ''
        },
        {
          id: 3,
          title: '方言创意短视频展示活动',
          img: require('@/assets/info/info3.jpg'),
          url: ''
        },
        {
          id: 4,
          title: '我为方言影视剧方言人物配音',
          img: require('@/assets/info/info4.jpg'),
          url: ''
        },
        {
          id: 5,
          title: '听听我的家乡话',
          img: require('@/assets/info/info5.jpg'),
          url: ''
        },
        {
          id: 6,
          title: '训练AI为方言发音打分',
          img: require('@/assets/info/info6.jpg'),
          url: ''
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info{
  float:left;
  display: block;
  position: relative;
  /* margin-top: 10px; */
  /* margin-bottom: 100px ; */
  width: 58%;
  left: 9%;
  /* background-color:#d29a9b; */
}
.info-item{
  margin-right:10px;
  margin-top:10px ;
  display: block;
  float: left;
  width: 229px;
  height: 162px;
  overflow: hidden;
  /* background-color: green; */
  cursor: pointer;
  border: 1px solid rgb(218, 209, 209);
}
.info-item:hover{
  border: 1px solid black;

}
.info-item-img{
    width: 100%;
    overflow: hidden;
}
.info-item-img img{
    width: 100%;
    margin-top: 10px;
}

</style>
