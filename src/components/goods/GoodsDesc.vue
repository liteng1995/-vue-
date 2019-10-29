<template>
    <div class="goodsdesc-container">
        <h3>{{info.title}}</h3>

        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data () {
        return {
            info:{}
        };
    },
    created(){
        this.getGoodsDesc();
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.$route.params.id).then(result=>{
                if(result.body.status===0){
                    this.info = result.body.message[0];
                }else{
                    Toast("加载图文信息失败！")
                }
            });
        }
    }
}
</script>

<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 15px;
    }
    .content{
        //加了scoped的话就是内容里面的特定的图片，不加图片的话就是内容里面的所有图片
        img{
            width: 100%;
        }
    }
}
</style>