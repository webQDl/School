<template>
  <div class="zc_jx_jh">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>教学设备管理</el-breadcrumb-item>
          <el-breadcrumb-item>设备借出和归还</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">借出和归还记录</div>
        <div>
          <el-badge :value="2" class="item">
            <el-button style="border:1px solid red; color:red;" @click="clickAddBtn()"><i class="el-icon-plus"></i>查看未处理申请</el-button>
          </el-badge>
          <el-input placeholder="请输入编码或名称" v-model="input_rkName" class="el-inp-m" style="margin-left:20px;width:15%"></el-input>
          <el-input placeholder="借用人姓名" v-model="input_jyName" class="el-inp-m" style="margin-left:10px;width:10%"></el-input>
          <div class="demo-input-suffix" style="margin-left:20px">借出时间：
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_rkDate"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_rkDate2"></el-input>
          </div>
          <div class="demo-input-suffix" style="margin-left:10px">归还时间：
              <el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_rkDate"></el-input>一<el-input placeholder="请选择日期" suffix-icon="el-icon-date" v-model="input_rkDate2"></el-input>
          </div>
          <el-button type="primary" @click="searchTableData(input_rkName)">查询</el-button>
          <div style="float:right">
            <el-button type="warning" @click="fileSaver()">导出excel<i class="el-icon-arrow-down"></i></el-button>
          </div>
        </div>
        <div style="font-size:16px;margin-top:20px">
          <el-table id="roleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
            <el-table-column type='selection' width="50" align="center"></el-table-column>
            <el-table-column prop="zc_type" label="分类" width="140" align="center"></el-table-column>
            <el-table-column prop="zc_name" label="名称" width="70" align="center"></el-table-column>
            <el-table-column prop="zc_code" label="编码" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_price" label="单价（元）" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_num" label="借出数量" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_gmType" label="规格" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_jyName" label="借用人姓名" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_bumen" label="所在部门" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_jcDate" label="借出时间" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_ghDate" label="归还时间" width="90" align="center"></el-table-column>
            <el-table-column prop="zc_ghNum" label="归还数量" width="90" align="center">
            </el-table-column>
            <el-table-column prop="zc_ghState" label="归还状态" width="90" align="center">
              <template slot-scope="scope">
                <span v-html="['未归还', '部分归还','全部归还'][scope.row.zc_ghState]"></span>
              </template>
            </el-table-column>
            <el-table-column prop="zc_dsNum" label="丢失数量" width="90" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
              <template slot-scope="scope" v-if="scope.row.zc_type!=null">
                <span size="small" style="margin:0 5px;cursor: pointer;" @click="clickUpdBtn(scope.$index,scope.row)">编辑</span>
                <span size="small" style="margin:0 5px;cursor: pointer;" @click="handleDelete(scope.$index)">删除</span>
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
    <ZcJxRkAdd v-if="this.pdAddVisible" @addR="addRow" @updR="updRow" ref="zcJxRkAdd"/>
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
import ZcJxRkAdd from '@/components/ZcJxRkAdd.vue'
import echarts from 'echarts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: 'Zc_jx_jh',
  components: {
    SamssTop,
    ZcJxRkAdd,
  },
  mounted(){
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
    addRow(from){
      let newDate = new Date();
      let createDate = newDate.getFullYear()+"-"+newDate.getMonth()+"-"+newDate.getDate();
      from.zc_date=createDate;
      from.zc_state='1';
      this.tableData.push(from);
      this.tableData2=this.tableData;
    },
    updRow(from,index){
      // console.log(index);
      // console.log(index);
      // this.tableData.splice(index,1,from);
      // this.tableData2=this.tableData;
    },
    //add
    clickAddBtn(){
      this.pdAddVisible=true
      this.$nextTick(()=>{
        this.$refs.zcJxRkAdd.stateType=true;
        this.$refs.zcJxRkAdd.visible=true;
        this.$refs.zcJxRkAdd.from={};
      })
    },
    clickUpdBtn(index,row){
      this.pdAddVisible=true
      this.$nextTick(()=>{
        this.$refs.zcJxRkAdd.visible=true;
        this.$refs.zcJxRkAdd.stateType=false;
        this.$refs.zcJxRkAdd.from=row;
        this.$refs.zcJxRkAdd.updIndex=(this.currentPage-1)*this.pagesize+index;
      })
      
    },
    //Search
    searchTableData(arr) {
      console.log(arr)
      let searchList=[];
      if(arr!=''){
        this.tableData.forEach(function (item) {
            if (item.zc_name==arr||item.zc_type==arr) {
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
        alert(this.pagesize*(this.currentPage-1)+index)
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
        zc_state_success:'<img style="width: 22px;height: 22px;" src="http://cloud.axureshop.com/gsc/36TNY9/95/65/f2/9565f23a0dd04aa1ae89973d5751da9e/images/设备入库（改）/u452.png?token=6a690b47eded18aff4d97440cff9565b2d83fd57623dd89b360e72a979ca2e25">',
        currentPage:1, //初始页
        pagesize:10,    //    每页的数据
        pdAddVisible:false,
        input_rkDate:'',
        input_jyName:'',
        input_rkName:'',
        input_rkDate2:'',
        tableData2:[],
        tableData: [{
          zc_type :'行政办公设备-桌椅类',
          zc_name: '初步',
          zc_code: '03036752',
          zc_price :'100.00',
          zc_num: '1',
          zc_gmType: '普通',
          zc_jyName :'库房1',
          zc_bumen: '语文组',
          zc_jcDate: '2017-11-6',
          zc_ghDate: '2017-11-6',
          zc_ghNum:'10',
          zc_ghState: '0',
          zc_dsNum:'0',
        },{},{},{},{},{},{},{},{},{},{},{}]
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