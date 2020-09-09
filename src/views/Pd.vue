<template>
  <div class="pd">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>统计分析</el-breadcrumb-item>
          <el-breadcrumb-item>盘点</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">盘点记录</div>
        <div>
          <el-button type="danger" @click="clickAddBtn()"><i class="el-icon-plus"></i>新增盘点</el-button>
          <el-input placeholder="请输入盘点名称" v-model="input_pandian" class="el-inp-m" style="margin-left:20px"></el-input>
          <div class="demo-input-suffix">开始日期：
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_startDate"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>
          </div>
          <div class="demo-input-suffix">结束日期：
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_endDate"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input2"></el-input>
          </div>
          <el-button type="primary" @click="searchTableData(input_pandian)">查询</el-button>

          <el-button type="warning" style="float:right">导出excel<i class="el-icon-arrow-down"></i></el-button>
        </div>
        <div style="font-size:16px;margin-top:20px">
          <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
            <el-table-column type='selection' width="50" align="center"></el-table-column>
            <el-table-column prop="pd_name" label="盘点名称" width="260" align="center"></el-table-column>
            <el-table-column prop="c_name" label="创建人" width="134" align="center"></el-table-column>
            <el-table-column prop="startTime" label="盘点开始时间" width="260" align="center"></el-table-column>
            <el-table-column prop="endTime" label="盘点结束时间" width="260" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" width="134" align="center"> 
              <template slot-scope="scope">
                <span v-text="['未开始', '已开始','已完成'][scope.row.status]"></span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="280" align="center">
              <template slot-scope="scope">
                <span v-text="['开始盘点', '继续盘点','查看详情'][scope.row.status]" style="margin:0 20px;cursor: pointer;"></span>
                <span type="text" size="small" style="margin:0 20px;cursor: pointer;" @click="handleDelete(scope.$index)">删除</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination  @current-change="handleCurrentChange"
                          :current-page="currentPage" 
                          layout="prev, pager, next" 
                          :total="this.tableData.length" 
                          :page-size="pagesize"
                          style="margin:50px 0 20px 70%;"></el-pagination>
        </div>
      </div>
    </div>
    <PdAdd v-if="this.pdAddVisible" @addR="addRow" ref="pdAdd"/>
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
import PdAdd from '@/components/PdAdd.vue'
import echarts from 'echarts'

export default {
  name: 'Pd',
  components: {
    SamssTop,
    PdAdd
  },
  mounted(){
    this.tableData2=this.tableData;
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    addRow(rowName){
      let newDate = new Date();
      let createDate = newDate.getFullYear()+"-"+newDate.getMonth()+"-"+newDate.getDate()+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds();
      console.log(newDate);
      let pdRow  = {
        pd_name :rowName,
        c_name: '张小丰',
        startTime: createDate,
        endTime: '',
        status: '0',
      }
      this.tableData.push(pdRow);
      this.tableData2=this.tableData;
      console.log(this.tableData)
    },
    //add
    clickAddBtn(){
      this.pdAddVisible=true
      this.$refs.pdAdd.visible=true;
    },
    //Search
    searchTableData(arr) {
      console.log(arr)
      let searchList=[];
      if(arr!=''){
        this.tableData.forEach(function (item) {
            if (item.pd_name==arr) {
                searchList.push(item);
            } 
        });
        this.tableData=searchList;
      }else{
        this.tableData=this.tableData2;
      }
    },
    //delete
    handleDelete(index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(this.pagesize*(this.currentPage-1)+index, this.pagesize*(this.currentPage-1)+index+1)
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err
        })
      })
    },
  },
  data() {
      return {
        currentPage:1, //初始页
        pagesize:4,    //    每页的数据
        userList: [],
        pdAddVisible:false,
        input_startDate:'',
        input_endDate:'',
        input_pandian:'',
        input2:'',
        input21:'',
        tableData2:[],
        tableData: [{
          pd_name :'20171106第二次盘点',
          c_name: '王一',
          startTime: '2017-11-6   09:00',
          endTime: '',
          status: '0',
        }, {
          pd_name :'20171006第一次盘点',
          c_name: '王一',
          startTime: '2017-11-6   09:00',
          endTime: '',
          status: '1',
        }, {
          pd_name :'20171006第一次盘点',
          c_name: '王一',
          startTime: '2017-11-6   09:00',
          endTime: '',
          status: '2',
        }, {
          pd_name :'20171006第三次盘点',
          c_name: '王一',
          startTime: '2017-11-6   09:00',
          endTime: '',
          status: '1',
        },{
          pd_name :'20171106第二次盘点',
          c_name: '王一',
          startTime: '2017-11-6   09:00',
          endTime: '',
          status: '2',
        }]
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
  .searchDiv{
    display: inline-block;
    width: 30%;
    margin-left: 50%;
  }
  .el-input{
    width: 80%;
  }
  .elButtonDiv>.el-button{
    border-radius: 0;
    background: rgb(228, 228, 228);
    /*  */
    font-size: 14px;
    padding: 14px 26px;
  }
  .el-button:hover {
    color: #000;
    border-color: #c6e2ff;
    background-color: rgb(26, 179, 148);
  }
  .el-inp-m{
    width: 20%;
  }
  .demo-input-suffix>.el-input{
    width: 37%;
  }
  .demo-input-suffix{
    display: inline-block;
    width:25%;
  }
</style>