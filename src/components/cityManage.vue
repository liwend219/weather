<template>
    <div>
        <br>
        <span style="float:left;margin-left:10px;font-size:12px;color:rgb(94, 90, 90);">
            城市列表(左拉删除)：
        </span>
        <br>
        <br>
        <ul style="height:60vh;overflow:auto">
           <li style="list-style:none;border-bottom:1px solid #ccc" v-for="(item,key) in cityList" :key="key">
               <mt-cell-swipe
                :title="item"
                :right="[ 
                    {  
                        content: '删除城市',  
                        style: { background: '#f56a6a', color: '#fff' },  
                        handler: () => deleteCity(key)
                    }  
                ]">
                </mt-cell-swipe>
           </li>
        </ul>
        <br>
        <br>
        <br>
         <div class="add-btn" @click="pushAdd">
            +
         </div>
    </div>
</template>

<script>
import storage from '../lib/storage.js'
export default {
    data () {
        return {
            cityList:[],
        }
    },
    mounted () {
        if(storage.get("cityList")){
            this.cityList = storage.get("cityList")
            console.log(this.cityList)
        }
    },
    methods:{
        deleteCity (key){
            this.cityList.splice(key, 1);
            storage.set('cityList',this.cityList)
        },
        pushAdd () {
            this.$router.push('/addCity')
        },
        
    }
}
</script>

<style scoped>
.a{
    color:rgb(94, 90, 90);
    
}
.add-btn {
    position: absolute;
    bottom:80px;
    width:56px;
    height:56px;
    background:#26a2ff;
    color: #fff;
    border-radius:50%;
    line-height:56px;
    font-size:30px;
    left:50%;
    margin-left:-28px;
}
</style>
