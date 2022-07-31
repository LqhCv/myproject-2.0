<template>
  <!--地图容器-->
  <div id="mainMap" class="mainMap"></div>
</template>
<script>
import bus from './Bus.js'
export default {
  name: 'mainMap',
  data () {
    return {
      MapData: [
        { // 成渝片
          id: '1',
          city: '成都市',
          area: '1'
        },
        {
          id: '5',
          city: '资阳市',
          area: '1'
        },
        {
          id: '10',
          city: '遂宁市',
          area: '1'
        },
        {
          id: '7',
          city: '德阳市',
          area: '1'
        },
        {
          id: '14',
          city: '绵阳市',
          area: '1'
        },
        {
          id: '13',
          city: '重庆市',
          area: '1'
        },
        {
          id: '8',
          city: '南充市',
          area: '1'
        },
        {
          id: '12',
          city: '达州市',
          area: '1'
        },
        {
          id: '11',
          city: '泸州市',
          area: '2' // 灌赤片岷江小片
        },
        {
          id: '4',
          city: '乐山市',
          area: '2'
        },

        {
          id: '6',
          city: '宜宾市',
          area: '2'
        },
        {
          id: '3',
          city: '眉山市',
          area: '2'
        },
        { // 灌赤片仁富小片
          id: '9',
          city: '内江市',
          area: '3'
        },
        {
          id: '2',
          city: '雅安市',
          area: '4' // 灌赤片雅棉小片
        }
      ],
      CurrentCity: {
        city: '成都市',
        point: {
          lng: 104.07274727406208,
          lat: 30.578993724029967
        },
        area: 1
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    var map = new BMap.Map('mainMap', { enableMapClick: true }) // 创建Map实例
    // eslint-disable-next-line no-undef
    map.centerAndZoom(new BMap.Point(105.1, 30.34), 8) // 初始化地图,设置中心点坐标和地图级别
    // 向地图中添加缩放控件
    // eslint-disable-next-line no-undef
    var sizeOffset = new BMap.Size(20, 200) // 设置偏移量
    var ctrlNav = new window.BMap.NavigationControl({ // 左上角
      // eslint-disable-next-line no-undef
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // eslint-disable-next-line no-undef
      type: BMAP_NAVIGATION_CONTROL_PAN,
      // BMAP_NAVIGATION_CONTROL_LARGE 标准的平移缩放控件（包括平移、缩放按钮和滑块）
      // BMAP_NAVIGATION_CONTROL_SMALL 仅包含平移和缩放按钮
      // BMAP_NAVIGATION_CONTROL_PAN 仅包含平移按钮
      // BMAP_NAVIGATION_CONTROL_ZOOM 仅包含缩放按钮
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

    // 定义一个返回主页控件类
    function ZoomControl () {
      // eslint-disable-next-line no-undef
      this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT
      // eslint-disable-next-line no-undef
      this.defaultOffset = new BMap.Size(20, 20)
    }
    // 通过JavaScript的prototype属性继承于BMap.Control
    // eslint-disable-next-line no-undef
    ZoomControl.prototype = new BMap.Control()

    // 自定义控件必须实现自己的initialize方法，并且将控件的DOM元素返回
    // 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中
    ZoomControl.prototype.initialize = function (map) {
      // 创建一个dom元素
      var div = document.createElement('div')
      // 添加文字说明
      div.appendChild(document.createTextNode('回到主页中心'))
      // 设置样式
      div.style.cursor = 'pointer'
      div.style.padding = '7px 10px'
      div.style.boxShadow = '0 2px 6px 0 rgba(27, 142, 236, 0.5)'
      div.style.borderRadius = '5px'
      div.style.backgroundColor = 'white'
      // 绑定事件,点击一次回到主页
      div.onclick = function (e) {
        map.clearOverlays()
        // map.setZoom(8)
        map.setCurrentCity('成都')
        // eslint-disable-next-line no-undef
        map.centerAndZoom(new BMap.Point(105.1, 30.34), 8) // 初始化地图,设置中心点坐标和地图级别
      }
      // 添加DOM元素到地图中
      map.getContainer().appendChild(div)
      // 将DOM元素返回
      return div
    }
    // 创建控件元素
    var myZoomCtrl = new ZoomControl()
    // 添加到地图中
    map.addControl(myZoomCtrl)

    // 添加地图类型控
    map.addControl(
      // eslint-disable-next-line no-undef
      new BMap.MapTypeControl({
        mapTypes: [
          // eslint-disable-next-line no-undef
          BMAP_NORMAL_MAP,
          // eslint-disable-next-line no-undef
          BMAP_HYBRID_MAP
          // BMAP_NORMAL_MAP 此地图类型展示普通街道视图
          // BMAP_SATELLITE_MAP 此地图类型展示卫星视图
          // BMAP_HYBRID_MAP 此地图类型展示卫星和路网的混合视图
        ]
      })
    )
    map.setCurrentCity('成都') // 设置地图显示的城市 此项是必须设置的
    // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
    map.disableDragging() // 禁用地图拖拽
    map.disableDoubleClickZoom() // 禁用双击放大
    map.disableKeyboard() // 禁用键盘操作
    map.disablePinchToZoom() // 禁用双指操作缩放
    // eslint-disable-next-line no-undef
    var myGeo = new BMap.Geocoder()
    var mapData = this.MapData
    // eslint-disable-next-line no-unused-vars
    var curCity = this.CurrentCity
    var index = 0
    function start () { // 添加标注
      while (index < mapData.length) {
        var add = mapData[index]['city']
        geocodeSearch(add, mapData[index]['id'])
        index++
      }
    }
    function geocodeSearch (add, index) {
      // if (index < mapData.length) {
      //   setTimeout(window.start, 20)
      // }
      myGeo.getPoint(add, function (point) { // 地址正解析 城市->经纬度
        if (point) {
          // eslint-disable-next-line no-undef
          var address = new BMap.Point(point.lng, point.lat)
          // eslint-disable-next-line no-undef, standard/object-curly-even-spacing
          var opt = { // 标注样式
            // eslint-disable-next-line no-undef
            offset: new BMap.Size(10, 2)
          }
          // eslint-disable-next-line no-undef
          var label = new BMap.Label(index, opt)
          label.setStyle({ // 设置文本样式
            width: '25px',
            color: 'black',
            border: 'none',
            backgroundColor: 'none',
            textAlign: 'center',
            height: '30px',
            lineHeight: '30px',
            fontFamily: '微软雅黑'
          })
          // eslint-disable-next-line no-undef
          addMarker(address, label)
        }
      }, '四川省')
    }
    // eslint-disable-next-line no-undef
    var myIcon = new BMap.Icon(require('@/assets/marker.png'), new BMap.Size(48, 48), {
      // 自定义图标不显示问题，参考：https://blog.csdn.net/Bule_daze/article/details/101011205?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165873117116782425158496%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=165873117116782425158496&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-4-101011205-null-null.185^v2^control&utm_term=%E7%99%BE%E5%BA%A6%E5%9C%B0%E5%9B%BE%E8%87%AA%E5%AE%9A%E4%B9%89icon&spm=1018.2226.3001.4450
      // 指定定位位置。
      // 当标注显示在地图上时，其所指向的地理位置距离图标左上
      // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
      // 图标中央下端的尖角位置。
      // eslint-disable-next-line no-undef
      anchor: new BMap.Size(24, 63)
      // 设置图片偏移。
      // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
      // 需要指定大图的偏移位置，此做法与css sprites技术类似。
      // eslint-disable-next-line no-undef
      // imageOffset: new BMap.Size(0, 0 - index * 25) // 设置图片偏移
    })
    // eslint-disable-next-line no-undef
    // var myIcon1 = new BMap.Icon(require('@/assets/marker1.png'), new BMap.Size(48, 48), {
    //   // eslint-disable-next-line no-undef
    //   anchor: new BMap.Size(24, 63)
    // })
    // eslint-disable-next-line no-undef
    // var myIcon2 = new BMap.Icon(require('@/assets/marker2.png'), new BMap.Size(48, 48), {
    //   // eslint-disable-next-line no-undef
    //   anchor: new BMap.Size(24, 63)
    // })
    // 编写自定义函数,创建标注
    function addMarker (point, label) {
      // eslint-disable-next-line no-undef
      var marker = new BMap.Marker(point, { icon: myIcon })
      marker.disableMassClear() // 禁止覆盖物在map.clearOverlays方法中被清除
      label.disableMassClear() //
      map.addOverlay(marker)
      // console.log(marker)
      marker.setLabel(label)
      // setTimeout(() => {
      //   markers[i++] = marker
      // }, 500)
      // 监听标注点击事件
      marker.addEventListener('click', function () {
        // setTimeout(() => {
        //   lastMarker.setIcon(myIcon)
        //   console.log(lastMarker)
        //   marker.setIcon(myIcon1)
        //   lastMarker = marker
        // }, 1000 + i)
        console.log(this.OA)
        var point = this.OA
        myGeo.getLocation(point, function (rs) { // 地址逆解析=>经纬度到地点名称
          // console.log(rs)
          var addComp = rs.addressComponents
          console.log(addComp.city)
          curCity['city'] = addComp.city // 设置当前城市,用于组件通信
          curCity['point'] = point
          console.log('curCity')
          console.log(curCity)
          map.setCurrentCity(addComp.city) // 设置地图显示的城市 此项是必须设置的
          // map.setCenter(point) // 设置地图中心
          map.clearOverlays() // 清除除标注的其他覆盖物
          getBoundary(addComp.city) // 设置边界
          // addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber
          for (let idx = 0; idx < mapData.length; idx++) {
            if (mapData[idx]['city'] === addComp.city) {
              var area1 = mapData[idx]['area'] // 找到区域，同一区域设置边界
              curCity['area'] = area1
              for (let idx1 = 0; idx1 < mapData.length; idx1++) {
                if (area1 === mapData[idx1]['area']) { // 设置边界
                  getBoundary(mapData[idx1]['city'])
                }
              }
              // sleep(2000)
              break
            }
          }
          // console.log(map.getZoom())
          // setTimeout(() => {
          //   if (map.getZoom() === 8) {
          //     // sleep(500)
          //     // eslint-disable-next-line no-undef
          //     map.centerAndZoom(new BMap.Point(point.lng, point.lat), 10) // 初始化地图,设置中心点坐标和地图级别
          //     // console.log(map.getZoom())
          //   } else {
          //     // eslint-disable-next-line no-undef
          //     map.centerAndZoom(new BMap.Point(point.lng, point.lat), 8) // 初始化地图,设置中心点坐标和地图级别
          //   }
          // }, 1000)
        })
        setTimeout(() => { // 组件通信
          console.log('bus传递城市' + curCity)
          bus.$emit('City', curCity)
        }, 100)
      })
    }
    // function sleep (delay) {
    //   let endTime = new Date().getTime() + parseInt(delay)
    //   while (new Date().getTime() < endTime) { }
    // }
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
            fillColor: 'purple', // 填充颜色
            fillOpacity: 0.2, // 填充的透明度
            strokeStyle: 'dashed' // 边线的样式，solid或dashed
          })
          map.addOverlay(ply) // 添加覆盖物
          // map.setViewport(ply.getPath()) // 调整视野
        }
      })
    }
    start()
  },
  methods: {
    // passCurCity () { // 组件通信-传递
    //   console.log('当前城市=' + this.CurrentCity)
    //   this.$bus.$emit('CityName', this.CurrentCity)
    // }
  }
}
</script>
<style scoped>
.mainMap {
  overflow: hidden;
  width: 100%;
  height: 450px;
  margin: 1% auto;
  background-color: rgb(167, 140, 140);
  display: block;
  /* float: right; */
}
</style>
