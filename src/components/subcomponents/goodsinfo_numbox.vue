<template>
<!-- 问题：我们不知道什么时候能够拿到max值，但是总归有一刻，会得到一个真正的max值 -->
<!-- 我们可以 使用watch属性监听，来监听父组件传递过来的max值，不管watch会被触发几次，
但是，最后一次，肯定是一个合法的max数值 -->
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" 
        @change="countChanged" ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
    <!-- 分析子组件什么时候把值传递给父组件 -->
</template>

<script>
import mui from '../../lib/mui/js/mui.js';
export default {
    mounted(){
        //初始化数字选择框组件
        mui(".mui-numbox").numbox();
    },
    methods:{
        countChanged(){
            //每当文本框的数据被修改的时候，立即把最新的数据传递给父组件
            this.$emit('getcount',parseInt(this.$refs.numbox.value));
        }
    },
    props:["max"],
    watch:{
        'max':function(newVal,oldVal){
            //使用JS API设置numbox的最大值
            mui(".mui-numbox").numbox().setOption('max',60)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>