<template>
  <div class="sp">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>审批管理</el-breadcrumb-item>
          <el-breadcrumb-item>教学设备相关审批</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">教学设备相关审批记录</div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick2">
          <el-tab-pane label="借入" name="first">
            <div>
              <el-button type="danger">同意</el-button> 
              <el-button type="danger">拒绝</el-button> 
              <div class="sq_name">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                  <el-input v-model="sq_name" placeholder="申请人姓名" style="margin-left:20px;width:100px"></el-input>
                </el-form>
              </div>
              <div class="demo-input-suffix">申请时间：
                <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>
              </div>
              <el-button type="primary">查询</el-button>
              <el-button type="warning" style="float:right">导出excel<i class="el-icon-arrow-down"></i></el-button>
              <div style="clear:both"></div>
            </div>
            <div style="font-size:16px;margin-top:20px">
              <el-table @selection-change="handleSelectionChange" :data="tableData" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
                <el-table-column type='selection' width="50" align="center"></el-table-column>
                <el-table-column prop="date" label="申请时间" width="260" align="center"></el-table-column>
                <el-table-column prop="name" label="借入物品" width="260" align="center"></el-table-column>
                <el-table-column prop="bacTime" label="预计归还时间" width="260" align="center"></el-table-column>
                <el-table-column prop="status" label="审核状态" width="260" align="center"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="280" align="center">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small"  v-if="scope.row.status!=null">查看详情</el-button>
                    <el-button type="text" size="small" v-if="scope.row.status=='审核中'">撤回申请</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination layout="prev, pager, next" :total="50" style="margin:50px 0 20px 70%;" align="center"></el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂失" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="报修" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="挂失" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
        
      </div>
    </div>
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
export default {
  name: 'Sp',
  components: {
    SamssTop,
  },
  methods:{
    handleClick(row) {
      console.log(row);
    },
    handleClick2(tab, event) {
      console.log(tab, event);
    }
  },
  data() {
      return {
        input2:'',
        sq_name:'',
        activeName2: 'first',
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
  .sq_name{
    display: inline-block;
    height: 32.4px;
  }
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
</style>