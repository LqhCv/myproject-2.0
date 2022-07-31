<template>
  <!--地图容器-->
  <div id="map" class="map"></div>

</template>
<script>
import bus from './Bus.js'
export default {
  name: 'MyMap',
  data () {
    return {
      MapData: [
        {
          id: '1',
          city: '成都市',
          area: '1'
        },
        {
          id: '2',
          city: '雅安市',
          area: '1'
        },
        {
          id: '3',
          city: '眉山市',
          area: '1'
        },
        {
          id: '4',
          city: '乐山市',
          area: '1'
        },
        {
          id: '5',
          city: '资阳市',
          area: '1'
        },
        {
          id: '6',
          city: '宜宾市',
          area: '2'
        },
        {
          id: '7',
          city: '德阳市',
          area: '1'
        },
        {
          id: '8',
          city: '南充市',
          area: '4'
        },
        {
          id: '9',
          city: '内江市',
          area: '2'
        },
        {
          id: '10',
          city: '遂宁市',
          area: '4'
        },
        {
          id: '11',
          city: '泸州市',
          area: '2'
        },
        {// 修订定位
          id: '12',
          city: '广安市',
          area: '4'
        },
        {
          id: '13',
          city: '达州市',
          area: '4'
        },
        {
          id: '14',
          city: '重庆市',
          area: '3'
        },
        {
          id: '15',
          city: '绵阳市',
          area: '1'
        }
      ],
      CurrentCity: '成都市'
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    var map = new BMap.Map('map', { enableMapClick: true }) // 创建Map实例
    // eslint-disable-next-line no-undef
    map.centerAndZoom(new BMap.Point(104.06, 30.67), 9) // 初始化地图,设置中心点坐标和地图级别
    // 向地图中添加缩放控件
    // eslint-disable-next-line no-undef
    var sizeOffset = new BMap.Size(20, 120) // 设置偏移量
    var ctrlNav = new window.BMap.NavigationControl({ // 左上角
      // eslint-disable-next-line no-undef
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // eslint-disable-next-line no-undef
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      offset: sizeOffset
    })
    map.addControl(ctrlNav)

    // 向地图中添加缩略图控件
    var ctrlOve = new window.BMap.OverviewMapControl({ // 右下角
      // eslint-disable-next-line no-undef
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: 1
    })
    map.addControl(ctrlOve)

    // 向地图中添加比例尺控件
    var ctrlSca = new window.BMap.ScaleControl({ // 左下角
      // eslint-disable-next-line no-undef
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    })
    map.addControl(ctrlSca)

    map.setCurrentCity('成都') // 设置地图显示的城市 此项是必须设置的
    map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    setTimeout(() => {
      bus.$on('City', (value) => {
        this.CurrentCity = value
        console.log('bus-myMap接收城市')
        console.log(this.CurrentCity)
        var cityName = this.CurrentCity['city']
        var cityPoint = this.CurrentCity['point']
        map.setCurrentCity(cityName) // 设置地图显示的城市
        map.centerAndZoom(cityPoint, 10) // 设置城市中心和地图级别
        map.clearOverlays() // 清除除标注的其他覆盖物
        addMarker(cityPoint) // 添加标注
        getBoundary(cityName) // 设置边界
      })
    }, 301)// 组件通信-接受
    function getBoundary (cityName) { //* 输入城市名字**
      // eslint-disable-next-line no-undef
      var bdary = new BMap.Boundary()
      bdary.get(cityName, function (rs) { // 获取行政区域
        // map.clearOverlays() // 清除地图覆盖物
        var count = rs.boundaries.length // 行政区域的点有多少个
        for (var i = 0; i < count; i++) {
          // eslint-disable-next-line no-undef
          var ply = new BMap.Polygon(rs.boundaries[i], { // 建立多边形覆盖物
            strokeWeight: 1, // 边线颜色
            strokeColor: 'red', // 边线的宽度
            fillColor: 'green', // 填充颜色
            fillOpacity: 0.2, // 填充的透明度
            strokeStyle: 'dashed' // 边线的样式，solid或dashed
          })
          map.addOverlay(ply) // 添加覆盖物
          // map.setViewport(ply.getPath()) // 调整视野
        }
      })
    }
    function addMarker (point) {
      // eslint-disable-next-line no-undef
      var marker = new BMap.Marker(point, { icon: myIcon1 })
      map.addOverlay(marker)
      // console.log(marker)
      // marker.setLabel(label)
    }
    // eslint-disable-next-line no-undef
    var myIcon1 = new BMap.Icon(require('@/assets/marker1.png'), new BMap.Size(48, 48), {
      // eslint-disable-next-line no-undef
      anchor: new BMap.Size(24, 63)
    })
  }
}
</script>
<style scoped>
.map {
  overflow: hidden;
  width: 58%;
  /* 58% */
  min-height: 640px;
  margin-left: 1%;
  background-color: red;
  display: block;
  float: right;
}
</style>
