// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { NavBar, Icon, Popup, Row, Col, Button, Tag, List } from 'pagoda-mobile'
Vue.config.productionTip = false

Vue.use(NavBar).use(Icon).use(Popup).use(Row).use(Col).use(Button).use(Tag).use(List)
Vue.prototype.$EventBus = new Vue()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
