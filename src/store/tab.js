import Cookies from "js-cookie"
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {
        path: '/home',
        name: 'home',
        label: '首页',
        icon: 'home'
      }
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, val) {
      if(val.name !== 'home') {
        state.currentMenu = val
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if(result === -1) {
          state.tabsList.push(val)
        } 
      } else {
        state.currentMenu = null
      }
    },
    closeTag(state,val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result,1)
    },

    setMenu(state, val) {
      state.menu = val;
      Cookies.set("menu", JSON.stringify(state.menu));
    },
    clearMenu(state) {
      state.menu = [];
      Cookies.remove("");
    },
    addMenu(state,router){
      if(!Cookies.get('menu')){
        Cookies.set("menu", JSON.stringify(state.menu));
      }else{
        const menu = JSON.parse(Cookies.get('menu'))
        console.log('menu----------------------------------',menu)
        state.menu = menu
        const menuArray =[]
        menu.forEach(item=>{
          if(item.children){//item.children 有值的时候返回true
            item.children = item.children.map(item=>{
              item.component = ()=> import(`../views/${item.url}`)
              return item
            })
            menuArray.push(...item.children)
            console.log('item.children',menuArray)
          }else{
            item.component = ()=> import(`../views/${item.url}`)
            menuArray.push(item)
            console.log('直接push   item',menuArray)
          }
        })
        console.log('menuArray',menuArray)
        
        //路由动态添加
        // 添加一条新的路由记录作为现有路由的子路由。如果路由有一个 name，并且已经有一个与之名字相同的路由，它会先删除之前的路由。
        // addRoute(parentName: string | symbol, route: RouteRecordRaw): () => void
        menuArray.forEach(item=>{
          router.addRoute('Main',item)
        })
      }
   
    }
  }
}