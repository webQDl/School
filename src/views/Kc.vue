<template>
  <div class="kc">
    <SamssTop />
    <div class="sq_sp_content">
      <div class="jx_top_bc_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>统计分析</el-breadcrumb-item>
          <el-breadcrumb-item>库存</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="jx_top_bc_content">
        <div style="font-size:16px;margin-bottom:20px">库存记录</div>
        <div class="elButtonDiv"><el-button>教学设备库存</el-button><el-button>易耗品库存</el-button><el-button>其他资产库存</el-button></div>
        <div style="padding-top:20px">
          <div style="display:inline-block">教学设备目录：一级目录</div> 
          <div class="searchDiv">
            <el-input placeholder="请输入内容" v-model="input21" class="el-inp-m"></el-input><el-button style="background:rgb(26, 179, 148)">查询</el-button>
          </div>
          <el-button type="warning" style="float:right">导出excel<i class="el-icon-arrow-down"></i></el-button>
        </div>
        <div style="font-size:16px;margin-top:20px">
          <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#909399',color:'#333'}">>
            <el-table-column type='selection' width="50" align="center"></el-table-column>
            <el-table-column fixed prop="date" label="申请时间" width="260" align="center"></el-table-column>
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
        <div class="echart-div">
          <div>
            <div style="text-align:center;font-size:20px;padding:20px 0;">教学设备数量统计</div>
            <div id="xj_num_bar" :style="{'width':'100%','height':'276px'}"></div>
          </div>
          <div>
            <div style="text-align:center;font-size:20px;padding:20px 0;">教学设备数量统计</div>          
            <div id="xj_status_bar" :style="{'width':'100%','height':'276px'}"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SamssTop from '@/components/SamssTop.vue'
import echarts from 'echarts'

export default {
  name: 'Kc',
  components: {
    SamssTop,
  },
  mounted(){
    this.chartBar();
    this.chartPie();
  },
  methods:{
    handleClick(row) {
      console.log(row);
    },
    chartBar(){
      let myChart = echarts.init(document.getElementById('xj_num_bar'));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
            data: ['报废', '挂失', '借出',  '库存']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['行政办公设备', '教学设备', '文体设备', '后勤设备']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '报废',
                type: 'bar',
                stack: '总量',
                barWidth : 40,
                label: {
                    position: 'insideRight'
                },
                data: [320, 302, 301, 334, 390]
            },
            {
                name: '挂失',
                type: 'bar',
                stack: '总量',
                label: {
                    position: 'insideRight'
                },
                data: [120, 132, 101, 134, 90]
            },
            {
                name: '借出',
                type: 'bar',
                stack: '总量',
                label: {
                    position: 'insideRight'
                },
                data: [220, 182, 191, 234, 290]
            },
            {
                name: '库存',
                type: 'bar',
                stack: '总量',
                label: {
                    position: 'insideRight'
                },
                data: [150, 212, 201, 154, 190]
            }
        ]
      });
    },
    chartPie(){
      let myChart = echarts.init(document.getElementById('xj_status_bar'));
      // 绘制图表
      myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['资产总量', '资产总额', '房产面积', '地产面积']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                        fontWeight: '100'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 138000, name: '资产总量',itemStyle: {color: 'rgba(237, 86, 101, 1)'}},
                    {value: 10138000, name: '资产总额',itemStyle: {color: 'rgba(247, 165, 79, 1)'}},
                    {value: 7738000, name: '房产面积',itemStyle: {color: 'rgba(28, 133, 199, 1)'}},
                    {value: 638000, name: '地产面积',itemStyle: {color: 'rgba(26, 179, 148, 1)'}},
                ]
            }
        ]
      });
    },
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
  .echart-div{
    display: flex;
  }
  .echart-div>div{
    width: 40%;
    height: 276px;
    margin: 0 5%;
  }
</style>