<template>
    <div>
        <div class="mint-searchbar">
            <div class="mint-searchbar-inner">
                <i class="mintui mintui-search"></i> 
                <input type="search" placeholder="搜索城市" v-model="cityName" style="padding-left:15px;" class="mint-searchbar-core">
            </div> 
            <a class="mint-searchbar-cancel" style="">取消</a>
        </div>
        <div>
            <ul class="ul-style">
                <li class="list-style" v-for="(item,key) in result_1" :key="key" @click="addCity(item)">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import citys from '../lib/citys.json'
import storage from '../lib/storage.js'
export default {
    data () {
        return {
            value:'',
            result:[],
            cityName:'',
            result_1:[],
            cityList:[],
        }
    },
    watch :{
        cityName (val) {
            this.result_1 = []
            this.result.map(v => {
                if(v.indexOf(val)>=0){
                    this.result_1.push(v)
                }
            })
        }
    },
    mounted () {
        if(storage.get("cityList")){
            this.cityList = storage.get("cityList")
        }
        document.getElementsByClassName("ul-style")[0].style.height = (window.screen.height -92)+'px'
        this.aa();
        this.result_1 = this.result
    },
    methods:{
        aa () {
            var i =0;
            citys.map(val => {
                val.children.map(val2 => {
                    this.result.push(val2.label)
                })
            })
        },
        addCity (city) {
            var sta = "0"
            this.cityList.map(val => {
                if(val.indexOf(city)>=0){
                    sta = "1"
                }
            })
            if(sta == "1"){
                this.$toast({
                    message: '城市已存在',
                    position: 'top',
                });
                return
            }
            this.cityList.push(city)
            storage.set("cityList",this.cityList)
            this.$toast({
                message: '添加城市成功',
                position: 'top',
            });
        }
    }
}
</script>

<style scoped>
.ul-style {
    overflow: auto;
}
.list-style {
    width:80%;
    height:60px;
    margin:0 auto;
    list-style:none;
    line-height:60px;
    border-bottom:1px solid #b7aaaa;
}
</style>
