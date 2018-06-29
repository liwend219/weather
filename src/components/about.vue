<template>
    <div class="about">
        <div class="title-border">
            　关于作者
        </div>
        <hr>
        <p class="about-content">
            <span class="about-key">姓名：</span> 李文东<br>
            <span class="about-key">班级：</span>15届计算机应用技术1班 <br>
            <span class="about-key">毕业设计课题：</span>天气预报App <br>
            <span class="about-key">作品介绍：</span>这是一款基于最前沿的前端技术，使用混合式app开发模式做出的跨三端（ios，Android，web)的天气预报app，具体使用到的技术有vue，elementui，axios，javascript，使用native技术打包生产，可完美运行在Android，ios，web端，做到一套代码到处运行。
            <br>特此鸣谢：和风天气（天气接口），百度地图（位置接口）
             <br>
            <span class="about-key" style="float:right">
                时间：2017.11
            </span>
         </p>
         <div class="title-border">
            　app介绍
        </div>
        <hr>
        <p class="about-content">
            <span class="about-key">模块</span> 
            <ul>
                <li>
                    主页天气展示模块
                </li>
                <li>
                    各项生活指数模块
                </li>
                <li>
                    未来三天气温变化折线图
                </li>
                <li>
                    城市管理列表
                </li>
                <li>
                    添加城市模块
                </li>
                <li>
                    城市模糊查询
                </li>
            </ul>
            <span class="about-key">演示</span><br>
            主页：
            <img src="../images/yanshi1.png" style="width:100%;" alt="">
            <br>
            生活指数：
            <img src="../images/yanshi2.png" style="width:100%" alt="">
            <br>
             设置：
            <img src="../images/yanshi3.png" style="width:100%" alt="">
            <br>
            城市管理：
            <img src="../images/yanshi4.png" style="width:100%" alt="">
            <br>
            添加城市：
            <img src="../images/yanshi5.png" style="width:100%" alt="">
            <br>
            城市模糊查询：
            <img src="../images/yanshi6.png" style="width:100%" alt="">
            <br>
            城市模糊查询：
            <img src="../images/yanshi7.png" style="width:100%" alt="">
            <br>
            重复城市：
            <img src="../images/yanshi8.png" style="width:100%" alt="">
            <br>
            <!-- <span class="about-key">班级：</span>15届计算机应用技术1班 <br>
            <span class="about-key">毕业设计课题：</span>做出一款天气预报App <br>
            <span class="about-key">作品介绍：</span>这是一款基于最前沿的前端技术，使用混合式app开发模式做出的...跨平台，ios，Android <br>
            <span class="about-key" style="float:right">
                时间：2017.11
            </span> -->
         </p>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    mounted(){
        // document.getElementsByClassName('a-link')[0].style.display = "block"
        // if(location.hash == "#/"){
        //     this.showBack = false
        // }else{
        //     this.showBack = true
        // }
    }
}
</script>

<style scoped>
    .about {
        /* margin:20px 10px; */
        background: #f1f1f1;
        text-align: left;
        padding:20px 10px 0;
        font-size: 14px;
    }
    .about-content {
        padding:10px 20px 20px;
        line-height: 40px;
    }
    .about-key {
        font-size: 14px;
        color:#d46961;
        /* float:left; */
    }
    .title-border{
        height:25px;
        border-left:3px solid rgb(90, 75, 75);
        text-align:left;line-height:25px;
    }
    li{
        font-size:14px;
        line-height:22px;
    }
</style>
