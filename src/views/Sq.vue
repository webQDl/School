<template>
  <div class="sq">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>申请管理</el-breadcrumb-item>
          <el-breadcrumb-item>教学设备借入申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">教学设备借入申请记录</div>
        <div>
          <div>
            <el-button type="danger">发起借入申请</el-button> 
            <div class="demo-input-suffix">申请时间：
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>
            </div>
            <el-button type="primary">查询</el-button>
            <el-button type="warning" style="float:right">导出excel<i class="el-icon-arrow-down"></i></el-button>
            <div style="clear:both"></div>
          </div>
        </div>
        <div style="font-size:16px;margin-top:20px">
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
            <el-table-column fixed prop="date" label="申请时间" width="260" align="center"></el-table-column>
            <el-table-column prop="name" label="借入物品" width="260" align="center"></el-table-column>
            <el-table-column prop="bacTime" label="预计归还时间" width="260" align="center"></el-table-column>
            <el-table-column prop="status" label="审核状态" width="260" align="center"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="300" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small"  v-if="scope.row.status!=null">查看详情</el-button>
                <el-button type="text" size="small" v-if="scope.row.status=='审核中'">撤回申请</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination layout="prev, pager, next" :total="50" style="margin:50px 0 20px 70%;" align="center"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
export default {
  name: 'Sq',
  components: {
    SamssTop,
  },
  methods:{
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
      return {
        input2:'',
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '审核中',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已通过',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已拒绝',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },{
          date: '2016-05-01',
          name: '王小虎',
          bacTime: '2017-11-26',
          status: '已撤回',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },]
      }
    }
}
</script>
<style scoped>
  
  .sq_sp_content{
    padding: 0 50px 50px 50px;
    background: rgba(244, 244, 246);
  }
  .jx_top_bc_title{
    padding: 20px 0;
  }
  .jx_top_bc_content{
    background: #fff;
    padding: 20px;
    font-size: 14px;
    text-align: left;
  }
  .demo-input-suffix{
    display: inline-block;
    margin-left: 50px;
  }
  .el-input{
    width: 40%;
  }
  .el-table{
      
  }
  .el-table_1_column_1{
    text-align: center;
  }
</style>