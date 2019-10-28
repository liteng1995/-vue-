// 入口文件
import Vue from 'vue'
import app from'./App.vue'
// 我这个版本，发现局部引用，如果不全局引用import 'mint-ui/lib/style.css'，
// 会造成局部引用没有样式的情况，解决办法就是全局引用一下样式。
// 如果有遇到跟我一样问题的朋友，这样做就可以。不用引入文档中说的.babelrc的配置

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import '../src/lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter) 
//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
import 'mint-ui/lib/style.css'
// 按需导入mint-ui 中的组件
// import {Header,Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header)
// Vue.component(Swipe.name,Swipe)
// Vue.component(SwipeItem.name,SwipeItem)
// Vue.component(Button.name,Button)
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
// 导入格式化时间的插件
import moment from 'moment'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置post时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
import router from './router'
// 定义全局过滤器
Vue.filter('dateFormat',function(datestr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(datestr).format(pattern)
})

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router
})

