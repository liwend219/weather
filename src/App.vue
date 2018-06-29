<template>
  <div id="app">
    <div class="header">
        <mt-header title="天气预报毕设">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
            <mt-button  slot="right" @click="openMeun">设置</mt-button>
        </mt-header>
    </div>
     <!-- 菜单 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible">
    </mt-actionsheet>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            sheetVisible:false,
            actions:[
                {
                    name:'城市管理',
                    method:() => {
                        this.$router.push('/cityManage')
                    }
                },
                {
                    name:'关于作者',
                    method:() => {
                        this.$router.push('/about')
                    }
                }
            ],
        }
    },
    mounted (){
        if (navigator.onLine) {

        } else {
            //执行离线状态时的任务
            this.$toast({
                message: '没有网络！',
                position: 'top',
                duration: 5000
            });
        }
    },
    methods : {
        openMeun () {
            this.sheetVisible = !this.sheetVisible;
        }
    }
}
</script>

<style>
*{
   margin:0;
   padding:0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
