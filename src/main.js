// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './service/axios'
Vue.config.productionTip = false

// import { NavBar, Icon, Popup, Row, Col, Button, Tag, List, Picker, Field, RadioGroup, Radio, Cell, CellGroup, Dialog, Checkbox, CheckboxGroup } from 'pagoda-mobile'

import 'pagoda-mobile/lib/index.css';
import Pagoda from 'pagoda-mobile';
Vue.use(Pagoda)
Vue.prototype.$axios = axios
Vue.prototype.eventBus = new Vue()


// Vue.use(NavBar).use(Icon).use(Popup).use(Row).use(Col).use(Button).use(Tag).use(List).use(Picker).use(Field).use(RadioGroup).use(Radio).use(Cell).use(CellGroup).use(Dialog).use(Checkbox).use(CheckboxGroup)
/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
export default vue
