import Vue from 'vue'
import Router from 'vue-router'
import OverView from '@/components/OverView.vue'
import MyMap from '../components/MyMap.vue'
import Total from '../components/Total.vue'
import Info from '../components/Info.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'overview',
      component: OverView
    },
    {
      path: '/',
      name: 'mymap',
      component: MyMap
    },
    {
      path: '/',
      name: 'total',
      component: Total
    },
    {
      path: '/',
      name: 'info',
      component: Info
    }
  ]
})
