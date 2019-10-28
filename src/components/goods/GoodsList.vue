<template>
    <div class="goods-list">
        <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id"
        :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

<!-- 在网页中两种跳转方式 -->
<!-- 方式1：使用a标签的形式，叫做标签跳转 -->
<!-- 方式2:使用window.location.href的形式，叫做编程时导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" 
        @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data () {
        //data 是往自己组建内部，挂载一些私有数据
        return {
            pageindex:1,//默认分页页数
            goodslist:[]//存放商品列表的数组
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status ===0){
                    this.goodslist =this.goodslist.concat(result.body.message);
                }else{
                    Toast('获取商品列表失败！')
                }
            });
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },
        goDetail(id){
            //使用JS的形式进行路由导航
            //注意:一定要区分 this.$route和this.$router 这两个对象，
            //其中:this.$route 是路由参数对象，所有路由中的参数，params,query都属于它
            //其中:this.$router 是一个路由导航对象，用它可以方便的使用JS代码，实现路由
            //的前进，后退，跳转到新的URL地址

            //1.最简单的
            // this.$router.push("/home/goodsinfo/"+id);
            //2.传递对象
            // this.$router.push({path:"/home/goodsinfo/"+id});
            //3.传递一个命名的路由
            this.$router.push({ name:"goodsinfo", params:{ id } });
            //query是使用问号形式进行传参，router.push({path:'register',query:{plan:'private'}})
        }
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction:column;
        justify-content:space-between;
        min-height: 293px;
        img{width: 100%;}
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>