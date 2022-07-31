/* eslint-disable no-undef */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 异步：参考链接:https://blog.csdn.net/qq_32963841/article/details/88413656?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522165867964316781790719268%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=165867964316781790719268&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~baidu_landing_v2~default-3-88413656-null-null.142^v33^pc_search_v2,185^v2^control&utm_term=Uncaught%20ReferenceError%3A%20BMap%20is%20not%20defined&spm=1018.2226.3001.4187
