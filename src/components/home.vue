<template>
    <div class="home" v-cloak>
        <div class="content">
            <div id="allmap"></div>
            <!-- 轮播 -->
            <mt-swipe :auto="0" @change="handleChange">
                <mt-swipe-item v-for="(item,key) in allWeather" :key="key" :class="item.data.HeWeather6[0].now.cond_txt|setback" >
                    <span class="city-name">{{item.data.HeWeather6[0].basic.location}}</span>
                        <div style="width:100px;height:100px;margin:10px auto">
                            <img style="width:100%" :src="item.data.HeWeather6[0].now.cond_txt|setIcon" alt="">
                        </div>
                        <span style="font-size:18px;color:#000000">{{item.data.HeWeather6[0].now.cond_txt}}</span>
                        <br>
                    <span style="font-size:32px;color:#000000">{{item.data.HeWeather6[0].now.tmp}}℃</span>
                </mt-swipe-item>
            </mt-swipe>
            <br>
            <div >
                <div class="weilai" v-for="(item,key) in temLine" :key="key">
                    <div>{{item.date|setdate}}</div><div style="width:30%;"><img :src="item.cond_txt_d|setIcon" style="height:13px;" alt="">　<span style="line-height:25px;" v-text="item.cond_txt_d"></span></div><div>{{item.tmp_max}}℃~{{item.tmp_min}}℃</div>
                </div>
            </div>
            
            <!-- <div class="weilai">
                <div>明天　6/13</div><div><img src="http://weixin.jirengu.com/images/weather/code/0.png" style="height:13px;" alt="">　<span style="line-height:25px;">小雨</span></div><div>33-35</div>
            </div>
            <div class="weilai">
                <div>后天　6/14</div><div><img src="http://weixin.jirengu.com/images/weather/code/32.png" style="height:13px;" alt="">　<span style="line-height:25px;">小雨</span></div><div>33-35</div>
            </div> -->
            <br>
            <div class="parameter">
                <div style="width:25%;" @click="pushXq('舒适指数',0)">
                    <img :src="icon.ren" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">舒适指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[0].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('穿着指数',1)">
                    <img :src="icon.yifu" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">穿着指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[1].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('感冒指数',2)">
                    <img :src="icon.wendu" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">感冒指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[2].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('运动指数',3)">
                    <img :src="icon.yundong" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">运动指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[3].brf"></span>
                </div>
            </div>
            <div class="parameter">
                <div style="width:25%;" @click="pushXq('旅行指数',4)">
                    <img :src="icon.lvxing" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">旅行指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[4].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('紫外线指数',5)">
                    <img :src="icon.taiyang" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">紫外线指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[5].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('洗车指数',6)">
                    <img :src="icon.qiche" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">洗车指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[6].brf"></span>
                </div>
                <div style="width:25%;" @click="pushXq('pm2.5指数',7)">
                    <img :src="icon.pm25" style="width:25px" alt="">
                    <br>
                    <span style="font-size:12px;color:rgb(175, 175, 175)">pm2.5指数</span>
                    <br>
                    <span style="font-size:16px" v-text="parameters[7].brf"></span>
                </div>
            </div>
            <br>
            <div id="charts">
                <div id="main" style="width:100%;margin:0 auto;padding:20px 0;height:250px;background:#fff"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import storage from '../lib/storage.js'
    import qs from 'qs'
    import echarts from 'echarts'
    //图标
    import ren from '../images/ren.png'
    import yifu from '../images/yifu.png'
    import wenduji from '../images/wenduji.png'
    import wendu from '../images/wendu.png'
    import yundong from '../images/yundong.png'
    import lvxing from '../images/lvxing.png'
    import taiyang from '../images/taiyang.png'
    import qiche from '../images/qiche.png'
    import pm25 from '../images/pm25.png'
    //
    import qintian from '../images/qintian.gif'
    import duoyun from '../images/duoyun.gif'
    import yutian1 from '../images/yutian1.gif'
    import xuetian2 from '../images/xuetian2.gif'
    import yintian from '../images/yintian.gif'
    export default {
        data () {
            return {
                allWeather:[],
                cityList:[],
                parameters:[
                    {brf:''},{brf:''},{brf:''},{brf:''},{brf:''},{brf:''},{brf:''},{brf:''},
                ],
                index:0,
                temLine:[
                    {tmp_max:'2',date:'',cond_txt_d:'',tmp_min:'1'},{tmp_max:'10',date:'',cond_txt_d:'',tmp_min:'2'},{tmp_max:'2',date:'',cond_txt_d:'',tmp_min:'2'}
                ],
                icon:{
                    "ren":ren,
                    "yifu":yifu,
                    "wenduji":wenduji,
                    "wendu":wendu,
                    "yundong":yundong,
                    "lvxing":lvxing,
                    "taiyang":taiyang,
                    "qiche":qiche,
                    "pm25":pm25,
                    "qintian":qintian,
                    "duoyun":duoyun,
                    "yutian1":yutian1,
                    "xuetian2":xuetian2,
                    "yintian":yintian,
                },
                weilai:[],
            }
        },
        mounted () {
            if(storage.get("cityList")){
                this.cityList = storage.get("cityList")
            }
            // this.$indicator.open({
            //     spinnerType: 'fading-circle'
            // });
            this.getCityIp()
        },
        methods:{
            pushXq (zs,index) {
                this.$router.push({path:'/details',query:{"data":JSON.stringify(this.parameters[index]),'zs':zs}})
            },
            getCityIp () {
                //获取当前定位地址
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(116.331398,39.897445);
                map.centerAndZoom(point,12);
                var self = this
                var geolocation = new BMap.Geolocation();
                // 开启SDK辅助定位
                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        self.cityList.unshift(r.point.lng+','+r.point.lat)
                        //如果获取地址成功，执行此方法获取天气数据
                        self.getWeather()
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                });
            },
            linePic (){
                var myChart = echarts.init(document.getElementById('main'));
                var self =this
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['最高温度','最低温度'],
                        // show:false  
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['今天','明天','后天'],
                        // show:false  
                    },
                    yAxis: {
                        type: 'value',
                        // show:false  
                        axisLabel: {
                            formatter: '{value} °C'
                        },
                    },
                    series: [
                        {
                            name:'最高温度',
                            type:'line',
                            data:[self.temLine[0].tmp_max,self.temLine[1].tmp_max,self.temLine[2].tmp_max,]
                        },
                        {
                            name:'最低温度',
                            type:'line',
                            data:[self.temLine[0].tmp_min,self.temLine[1].tmp_min,self.temLine[2].tmp_min,]
                        },
                        
                        
                    ]
                };
                
                myChart.setOption(option);
            },
            //切换轮播页面时触发事件
            handleChange (index) {
                this.parameters = this.allWeather[index].data.HeWeather6[0].lifestyle
                this.temLine = this.allWeather[index].data.HeWeather6[0].daily_forecast
                this.linePic()
            },
            getWeather (city) {
                this.cityList.map(val => {
                    this.getTqData(val)
                })
                // this.$indicator.close();
            },
            getTqData (val) {
                axios.get("https://free-api.heweather.com/s6/weather?location="+val+"&key=44949a62ff8b4ea0baa7eda733d1aee2").then(data => {
                    // console.log(data);
                    this.allWeather.push(data)
                    this.parameters = this.allWeather[0].data.HeWeather6[0].lifestyle
                    this.temLine = this.allWeather[0].data.HeWeather6[0].daily_forecast
                    // this.weilai = data.HeWeather6[0].daily_forecast
                    console.log("132468")
                    console.log(this.temLine)
                    var self =this
                    self.linePic()
                    // var time= setTimeout((data) => {
                        this.messageBox('提示', '操作成功');
                    // }, 300);
                }).catch(err => {
                    console.log(err);
                    
                });
            },
            
        },
        filters:{
            setdate:function(val){
                return val.slice(5,7)+'/'+val.slice(-2)
            },
            setIcon:function (val) {
                if(val=="晴"){
                    return 'http://weixin.jirengu.com/images/weather/code/0.png'
                }else if(val == "多云"){
                    return 'http://weixin.jirengu.com/images/weather/code/4.png'
                }else if(val == "少云"){
                    return 'http://weixin.jirengu.com/images/weather/code/5.png'
                }else if(val == "晴间多云"){
                    return 'http://weixin.jirengu.com/images/weather/code/5.png'
                }else if(val == "阴"){
                    return 'http://weixin.jirengu.com/images/weather/code/9.png'
                }else if(val == "有风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "平静"){
                    return 'http://weixin.jirengu.com/images/weather/code/2.png'
                }else if(val == "微风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "和风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "清风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "强风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "劲风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "疾风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "大风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "烈风"){
                    return 'http://weixin.jirengu.com/images/weather/code/32.png'
                }else if(val == "风暴"){
                    return 'http://weixin.jirengu.com/images/weather/code/34.png'
                }else if(val == "狂暴风"){
                    return 'http://weixin.jirengu.com/images/weather/code/34.png'
                }else if(val == "飓风"){
                    return 'http://weixin.jirengu.com/images/weather/code/34.png'
                }else if(val == "龙卷风"){
                    return 'http://weixin.jirengu.com/images/weather/code/34.png'
                }else if(val == "热带风暴"){
                    return 'http://weixin.jirengu.com/images/weather/code/34.png'
                }else if(val == "阵雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/10.png'
                }else if(val == "强阵雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/10.png'
                }else if(val == "雷阵雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "强雷阵雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "雷阵雨伴有冰雹"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "小雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/13.png'
                }else if(val == "中雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/14.png'
                }else if(val == "大雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/15.png'
                }else if(val == "极端降雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/18.png'
                }else if(val == "毛毛雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/13.png'
                }else if(val == "暴雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "大暴雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "特大暴雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/16.png'
                }else if(val == "冻雨"){
                    return 'http://weixin.jirengu.com/images/weather/code/19.png'
                }else if(val == "小雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/22.png'
                }else if(val == "中雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/23.png'
                }else if(val == "大雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/24.png'
                }else if(val == "暴雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/25.png'
                }else if(val == "雨夹雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/20.png'
                }else if(val == "雨雪天气"){
                    return 'http://weixin.jirengu.com/images/weather/code/20.png'
                }else if(val == "阵雨夹雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/20.png'
                }else if(val == "阵雪"){
                    return 'http://weixin.jirengu.com/images/weather/code/21.png'
                }else if(val == "薄雾"){
                    return 'http://weixin.jirengu.com/images/weather/code/30.png'
                }else if(val == "雾"){
                    return 'http://weixin.jirengu.com/images/weather/code/30.png'
                }else if(val == "霾"){
                    return 'http://weixin.jirengu.com/images/weather/code/31.png'
                }else if(val == "扬沙"){
                    return 'http://weixin.jirengu.com/images/weather/code/27.png'
                }else if(val == "浮沉"){
                    return 'http://weixin.jirengu.com/images/weather/code/26.png'
                }else if(val == "沙尘暴"){
                    return 'http://weixin.jirengu.com/images/weather/code/28.png'
                }else if(val == "强沙尘暴"){
                    return 'http://weixin.jirengu.com/images/weather/code/29.png'
                }else if(val == "热"){
                    return 'http://weixin.jirengu.com/images/weather/code/38.png'
                }else if(val == "冷"){
                    return 'http://weixin.jirengu.com/images/weather/code/37.png'
                }else if(val == "未知"){
                    return 'http://weixin.jirengu.com/images/weather/code/99.png'
                }
            },
            setback: function (val) {
                if(val=="晴"){
                    return 'page-swipe1'
                }else if(val == "多云"){
                    return 'page-swipe2'
                }else if(val == "少云"){
                    return 'page-swipe2'
                }else if(val == "晴间多云"){
                    return 'page-swipe2'
                }else if(val == "阴"){
                    return 'page-swipe5'
                }else if(val == "有风"){
                    return 'page-swipe2'
                }else if(val == "平静"){
                    return 'page-swipe1'                
                }else if(val == "微风"){
                    return 'page-swipe1'
                }else if(val == "和风"){
                    return 'page-swipe1'
                }else if(val == "清风"){
                    return 'page-swipe1'
                }else if(val == "强风"){
                    return 'page-swipe2'
                }else if(val == "劲风"){
                    return 'page-swipe5'
                }else if(val == "疾风"){
                    return 'page-swipe5'
                }else if(val == "大风"){
                    return 'page-swipe5'
                }else if(val == "烈风"){
                    return 'page-swipe5'
                }else if(val == "风暴"){
                    return 'page-swipe5'
                }else if(val == "狂暴风"){
                    return 'page-swipe5'
                }else if(val == "飓风"){
                    return 'page-swipe5'
                }else if(val == "龙卷风"){
                    return 'page-swipe5'
                }else if(val == "热带风暴"){
                    return 'page-swipe5'
                }else if(val == "阵雨"){
                    return 'page-swipe3'
                }else if(val == "强阵雨"){
                    return 'page-swipe3'
                }else if(val == "雷阵雨"){
                    return 'page-swipe3'
                }else if(val == "强雷阵雨"){
                    return 'page-swipe3'
                }else if(val == "雷阵雨伴有冰雹"){
                    return 'page-swipe3'
                }else if(val == "小雨"){
                    return 'page-swipe3'
                }else if(val == "中雨"){
                    return 'page-swipe3'
                }else if(val == "大雨"){
                    return 'page-swipe3'
                }else if(val == "极端降雨"){
                    return 'page-swipe1'
                }else if(val == "毛毛雨"){
                    return 'page-swipe3'
                }else if(val == "暴雨"){
                    return 'page-swipe3'
                }else if(val == "大暴雨"){
                    return 'page-swipe3'
                }else if(val == "特大暴雨"){
                    return 'page-swipe3'
                }else if(val == "冻雨"){
                    return 'page-swipe4'
                }else if(val == "小雪"){
                    return 'page-swipe4'
                }else if(val == "中雪"){
                    return 'page-swipe4'
                }else if(val == "大雪"){
                    return 'page-swipe4'
                }else if(val == "暴雪"){
                    return 'page-swipe4'
                }else if(val == "雨夹雪"){
                    return 'page-swipe4'
                }else if(val == "雨雪天气"){
                    return 'page-swipe4'
                }else if(val == "阵雨夹雪"){
                    return 'page-swipe4'
                }else if(val == "阵雪"){
                    return 'page-swipe4'
                }else if(val == "薄雾"){
                    return 'page-swipe2'
                }else if(val == "雾"){
                    return 'page-swipe2'
                }else if(val == "霾"){
                    return 'page-swipe5'
                }else if(val == "扬沙"){
                    return 'page-swipe5'
                }else if(val == "浮沉"){
                    return 'page-swipe5'
                }else if(val == "沙尘暴"){
                    return 'page-swipe5'
                }else if(val == "强沙尘暴"){
                    return 'page-swipe5'
                }else if(val == "热"){
                    return 'page-swipe1'
                }else if(val == "冷"){
                    return 'page-swipe1'
                }else if(val == "未知"){
                    return 'page-swipe1'
                }
            }
        }
    }
</script>

<style scoped>
    [v-cloak] {
        display: none !important;
    }
    .home {
        background-color: #d3d3d3;
    }
    .content {
        width:100vw;
        height: 40vh;
        background: #ccc;
        /* color:#fff; */
        
        /* padding:15px; */
    }
    .parameter {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:space-around;
        align-items:center;
        background-color: rgb(255, 255, 255);
        padding:10px 0;
    }
    .weilai {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:space-around;
        align-items:center;
        background-color: rgb(255, 255, 255);
        padding:3px 0;
        height:20px;
        height:20px;
    }
    .page-swipe1 {
       background: url("../images/qintian.gif") no-repeat;
       background-size: 100% 100%;
       /* opacity: .7; */
    }
    .page-swipe2 {
       background: url("../images/duoyun.gif") no-repeat;
       background-size: 100% 100%;
       /* opacity: .7; */
    }
    .page-swipe3 {
       background: url("../images/yutian1.gif") no-repeat;
       background-size: 100% 100%;
       /* opacity: .7; */
    }
    .page-swipe4 {
       background: url("../images/xuetian2.gif") no-repeat;
       background-size: 100% 100%;
       /* opacity: .7; */
    }
    .page-swipe5 {
       background: url("../images/yintian.gif") no-repeat;
       background-size: 100% 100%;
       /* opacity: .7; */
    }
    .city-name {
        float:left;
        margin: 10px;
        color:#fff;
    }
</style>
