<template>
    <el-dialog title="新增" :close-on-click-modal="false" :visible.sync="visible">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="exit">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
  name: 'PdAdd',
  data(){
    return{
      visible:true,
      name: '',
    }
  },
  methods:{
    onSubmit(){
      this.$emit('addR' , this.name);
      this.exit();
    },
    exit(){
      this.visible=false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
