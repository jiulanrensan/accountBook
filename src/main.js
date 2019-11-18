// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import { NavBar } from 'pagoda-mobile'



Vue.config.productionTip = false

Vue.use(NavBar)

=======
import { NavBar, Icon, Popup, Row, Col, Button, Tag, List } from 'pagoda-mobile'
Vue.config.productionTip = false

Vue.use(NavBar).use(Icon).use(Popup).use(Row).use(Col).use(Button).use(Tag).use(List)
>>>>>>> 8c461632c32d73e597d52e77580a168f367e4bb2
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
