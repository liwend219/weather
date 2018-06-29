const root = {
    //获取详细天气，参数：无
    url1 : 'http://weixin.jirengu.com/weather',
    //获取ip，参数：无
    url2: 'http://weixin.jirengu.com/weather/ip',
    //通过cityid获取天气 ，url 后接上ID
    url3: 'http://weixin.jirengu.com/weather/now?cityid=',
    //get  获取当前城市，参数：无
    url4: 'http://api.jirengu.com/city.php',
    //get  参数：city:城市名，为空则当前城市
    url5 :'http://api.jirengu.com/weather.php',
    // WX4FBXXFKE4F 接上cityid
    url6 : 'http://weixin.jirengu.com/weather/now?cityid=',
    // 获取城市id ,后可接城市名，经纬度，ip
    url7 : 'http://weixin.jirengu.com/weather/cityid?location=',

}

export default root