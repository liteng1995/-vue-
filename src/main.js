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
import Vuex from 'vuex'
Vue.use(Vuex)
var car = JSON.parse(localStorage.getItem('car')||'[]')
var store = new Vuex.Store({
    state:{//this.$store.state.***
        car:car //将购物车中商品的数据用一个数组存储起来，在car数组中，存储一些商品的对象
        //咋们可以暂时将这个商品对象，设计成这个样子
        //{id:商品的id,count:要购买的数量,price:商品的单价,selected:true}
    },
    mutations:{ //this.$store.commit('方法名称','按需传递唯一的参数')
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息，保存到store中的car上
            //分析：
            //1.如果购物车中之前就已经有这个对应的商品了，那么只需要更新数量
            //2.如果没有，则直接把商品数据push到Car中就可以了

            //假设在购物车中没有找到对应的商品
            var flag = false
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            //如果最终，循环完毕，得到的flag还是false，则把商品数据直接push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }
            //当更新car之后，把car数组，存储到本地的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            state.car.some(item=>{
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFormCar(state,id){
            //根据id从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id == id){
                    state.car.splice(i,1)
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id == info.id){
                    item.selected = info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{ //this.$store.getters.***
        //相当于计算属性 也相当于filters
        getAllCount(state){
            var c = 0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id]=item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o = {
                count:0,//勾选的数量
                amount:0 //勾选的总价
            }
            state.car.forEach(item=>{
                if(item.selected){
                    o.count += item.count
                    o.amount += item.price*item.count
                }
            })
            return o
        }

    }
})
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
    router,
    store //挂载store状态管理器
})

