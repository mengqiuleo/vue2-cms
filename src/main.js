import Vue from 'vue'
import { Button, Radio, Container, Main, Aside, Header,Menu, 
  Submenu,MenuItemGroup,MenuItem, Dropdown,DropdownItem, DropdownMenu, 
  Row, Col, Card, Table, TableColumn, Breadcrumb,BreadcrumbItem,Tag,
  Form,FormItem,Input,Select,Switch,DatePicker,Option, Dialog,
  Pagination
} from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import http from 'axios'
import './api/mock.js'
import './assets/less/index.less'

Vue.config.productionTip = false
Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Pagination);


Vue.prototype.$http = http

router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if(token && to.name === 'login'){
    next({name: 'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
