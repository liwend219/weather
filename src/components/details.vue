<template>
    <div>
        <br>
        <div class="details">
            <br>
            <span style="font-size:18px">{{zs}}</span>
            <br>
            <br>
            <div style="height:20px;border-left:3px solid red;text-align:left">
                　{{data.brf}}
            </div>
            <br>
            <br>
            <br>
            <div style="text-align:left;color:rgb(208, 154, 70)">
                {{data.txt}}
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data () {
        return {
            data:'',
            zs:''
        }
    },
    mounted () {
        if(this.$route.query.data){
            this.data = JSON.parse(this.$route.query.data)
        }
        
        this.zs = this.$route.query.zs
        console.log(this.data)
        console.log(this.zs)
    }
}
</script>

<style scoped>
.details{
    width:75%;
    height:300px;
    border-radius:10px;
    padding:15px;
    border: 1px solid #ccc;
    margin:0 auto;
}
</style>
