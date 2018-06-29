import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home';
import about from '@/components/about';
import cityManage from '@/components/cityManage'
import addCity from '@/components/addcity'
import details from '@/components/details'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
        path:'/',
        component:home
    },
    {
        path:'/about',
        component:about
    },
    {
        path:'/cityManage',
        component:cityManage
    },
    {
        path:'/addCity',
        component:addCity
    },
    {
        path:'/details',
        component:details
    }
  ]
})

