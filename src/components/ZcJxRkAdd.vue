<template>
  <div class="zjr_add">
    <el-dialog :title="stateType?'新增设备':'修改设备'" :close-on-click-modal="false" :visible.sync="visible">
      <el-form label-width="80px">
        <el-form-item label="活动名称：">
          <el-input v-model="from.zc_type"></el-input>
        </el-form-item>
        <el-form-item label="设备名称：">
          <el-input v-model="from.zc_name"></el-input>
        </el-form-item>
        <el-form-item label="编码：">
          <el-input v-model="from.zc_code"></el-input>
        </el-form-item>
        <el-form-item label="单价：">
          <el-input v-model="from.zc_price" style="width:80%;"></el-input><div style="width:20%;display: inline-block;">元</div>
        </el-form-item>
        <el-form-item label="数量：">
          <el-input v-model="from.zc_num"></el-input>
        </el-form-item>
        <el-form-item label="规格：">
          <el-input v-model="from.zc_gmType"></el-input>
        </el-form-item>
        <el-form-item label="放置地点：">
          <el-input v-model="from.zc_address"></el-input>
        </el-form-item>
         <el-form-item label="是否唯一：">
          <el-radio-group v-model="from.zc_pri">
            <el-radio :label=0>是</el-radio>
            <el-radio :label=1>否</el-radio>
          </el-radio-group>
        </el-form-item>

          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="exit">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ZcJxRkAdd',
  data(){
    return{
      visible:true,
      stateType:true,
      updIndex:0,
      from:{
        zc_type: '',
        zc_name: '',
        zc_code: '',
        zc_price: '',
        zc_num: '',
        zc_gmType: '',
        zc_address: '',
        zc_pri: 0,
        zc_date: ''
      }
    }
  },
  methods:{
    onSubmit(){
      this.visible=false;
      if(this.stateType){
        this.$emit('addR' , this.from);
      }else{
        // console.log(this.updIndex)
        // this.$emit('updR' , (this.from,this.updIndex));
      }
    },
    exit(){
      this.visible=false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .zjr_add>>>.el-dialog{
    width: 30%!important;
  }
  .zjr_add>>>.el-form-item__label{
    width: 100px!important;
  }
  .zjr_add>>>.el-form-item__content{
    margin-left: 100px!important;
    text-align: left;
  }
</style>
