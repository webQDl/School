<template>
  <div class="home">
    <SamssTop />
    <div class="home-content">
      <div class="dbsx">
        <div class="h-c-title">待办事项</div>
        <div class="h-c-content">
          <img src="../assets/img/home1.png" width="100%" alt="">
        </div>
      </div>
      <div class="zcjk">
        <div class="h-c-title">资产监控</div>
        <div class="h-c-content">
          <div><img src="../assets/img/home2.png" width="100%" alt=""></div>
          <div id="zcPie" :style="{'width':'300px','height':'150px'}"></div>
        </div>
      </div>
      <div class="zctj">
        <div class="h-c-title">资产统计</div>
        <div class="h-c-content">
          <div id="zcBar" :style="{'width':'800px','height':'400px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SamssTop from '@/components/SamssTop.vue'
import echarts from 'echarts'

export default {
  name: 'Home',
  components: {
    SamssTop,
  },
  mounted(){
    this.chartPie();
    this.chartBar();
  },
  methods:{
    chartPie(){
      let myChart = echarts.init(document.getElementById('zcPie'));
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
    chartBar(){
      let myChart = echarts.init(document.getElementById('zcBar'));
       myChart.setOption({
          dataset: {
            source: [
                ['score', 'amount', 'product'],
                [89.3, 987, '后勤设备'],
                [57.1, 381, '文体设备'],
                [74.4, 533, '教学设备'],
                [50.1, 1268, '行政办公设备']
            ]
        },
        grid: {containLabel: true},
        xAxis: {name: '数量'},
        yAxis: {type: 'category'},
        series: [
            {
                type: 'bar',
                encode: {
                    // Map the "amount" column to X axis.
                    x: 'amount',
                    // Map the "product" column to Y axis
                    y: 'product'
                },
                barWidth : 34,
                itemStyle: {   
                  //通常情况下：
                  normal:{  
      　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params){
                          var colorList = ['rgba(63, 131, 194, 1)','rgba(63, 131, 194, 1)','rgba(63, 131, 194, 1)','rgba(63, 131, 194, 1)'];
                          return colorList[params.dataIndex];
                      }
                      ,label: {
                        show: true, //开启显示
                        position: 'right', 
                        textStyle: { //数值样式
                            color: '#3F83C2',
                            fontSize: 16
                        }
                    }
                  },
                  //鼠标悬停时：
                  emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
            }
        ]
       })
    }
  }
}
</script>

<style scoped>
  .home{
    background: rgba(244, 244, 246, 1);
  }
  .home-content>div{
    background: #FFF;
    width: 80%;
    margin: 50px auto;
    padding: 20px;
  }
  .h-c-title{
    text-align: left;
    margin-bottom: 10px;
  }
  #zcPie{
    margin: 50px auto 0 auto;
  }
  #zcBar{
    margin-left: 150px;
  }
</style>