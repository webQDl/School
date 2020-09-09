<template>
  <div class="role">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>系统设置</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">角色列表</div>
        <div>
          <el-button type="danger" @click="clickAddBtn()"><i class="el-icon-plus"></i>新增角色</el-button>
          <el-input placeholder="请输入角色名称" v-model="input_pandian" class="el-inp-m" style="margin-left:20px"></el-input>
          <el-button type="primary" @click="searchTableData(input_pandian)">查询</el-button>

          <el-button type="warning" @click="fileSaver()" style="float:right">导出excel<i class="el-icon-arrow-down"></i></el-button>
        </div>
        <div style="font-size:16px;margin-top:20px">
          <el-table id="roleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
            <el-table-column prop="QuestionId" label="序号" width="150" align="center"></el-table-column>
            <el-table-column prop="Title" label="标题" width="360" align="center"></el-table-column>
            <el-table-column prop="Content" label="内容" width="360" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="500" align="center">
              <template slot-scope="scope" v-if="scope.row.role_name!=''">
                <span size="small" style="margin:0 20px;cursor: pointer;">编辑</span>
                <span size="small" style="margin:0 20px;cursor: pointer;">删除</span>
                <span size="small" style="margin:0 20px;cursor: pointer;">配置</span>
                <span size="small" style="margin:0 20px;cursor: pointer;">菜单</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination background
                          @current-change="handleCurrentChange"
                          :current-page="currentPage" 
                          layout="prev, pager, next" 
                          :total="this.tableData.length" 
                          :page-size="pagesize"
                          style="margin:50px 0 20px 70%;"></el-pagination>
        </div>
      </div>
    </div>
    <!-- <PdAdd v-if="this.pdAddVisible" @addR="addRow" ref="pdAdd"/> -->
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
// import PdAdd from '@/components/PdAdd.vue'
import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'Role',
  components: {
    SamssTop,
    // PdAdd
  },
  mounted(){
    this.axios.get('http://47.111.250.151:8081/api/Question/GetQuestion').then((response) => {
      this.tableData = response.data.rows;
      console.log(response.data)
    })
    this.tableData2=this.tableData;
  },
  methods:{
    //导出
    fileSaver(){
      this.$nextTick(function () {
        let wb = XLSX.utils.table_to_book(document.getElementById('roleTable'));
        let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '学生信息.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout;
      });
    },
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
        this.tableData.splice(index, 1)
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
        pagesize:10,    //    每页的数据
        userList: [],
        pdAddVisible:false,
        input_startDate:'',
        input_endDate:'',
        input_pandian:'',
        input2:'',
        input21:'',
        tableData2:[],
        tableData: [
        //   {
        //   role_id :'1',
        //   role_name: '系统管理员',
        //   role_sId: '0',
        // }, {
        //   role_id :'2',
        //   role_name: '省级管理员',
        //   role_sId: '1',
        // }, {
        //   role_id :'3',
        //   role_name: '市级管理员',
        //   role_sId: '2',
        // }, {
        //   role_id :'4',
        //   role_name: '区县管理员',
        //   role_sId: '3',
        // },{
        //   role_id :'5',
        //   role_name: '区县管理员',
        //   role_sId: '4',
        // },{
        //   role_id :'6',
        //   role_name: '老师',
        //   role_sId: '5',
        // },{
        //   role_id :'7',
        //   role_name: '',
        //   role_sId: '',
        // },{
        //   role_id :'8',
        //   role_name: '',
        //   role_sId: '',
        // },{
        //   role_id :'9',
        //   role_name: '',
        //   role_sId: '',
        // },{
        //   role_id :'10',
        //   role_name: '',
        //   role_sId: '',
        // }
        ]
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