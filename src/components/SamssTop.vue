<template>
    <div class="samss_top">
      <div class="samss_top_name" @click="clickHome">
        <img id="u3_img" class="img" height="20px"  src="http://cloud.axureshop.com/gsc/36TNY9/95/65/f2/9565f23a0dd04aa1ae89973d5751da9e/images/首页-校级管理员/u3.png?token=d6bfb87aa3321077d0cddf4339789a0724d16122f12cb9e1235ac1bfcaf832cd">
        <div>XX学校资产管理系统</div>
      </div>
      <div class="samss_top_nav">
        <div @click="show(1)" @mouseleave="hide()">资产管理
           <el-collapse-transition >
          <div class="nav_two_zc" v-show="show_zc">
            <div class="nav_row"><div>教学设备</div><div><router-link to="/Zc_jx_rk">入库</router-link></div> <div><router-link to="/Zc_jx_jh">借出和归还</router-link></div> <div>挂失</div> <div>报修</div> <div>报废</div></div>
            <div class="nav_row"><div>易耗品</div> <div>入库</div> <div>分发</div> <div>核销</div></div>
            <div class="nav_row"><div>地产</div>   <div>登记</div> <div>改造</div> <div>核销</div></div>
            <div class="nav_row"><div>房产</div>   <div>登记</div> <div>维修</div> <div>改造</div> <div>核销</div></div>
            <div class="nav_row"><div>其他资产</div><div>入库</div> <div>挂失</div> <div>报修</div> <div>报废</div></div>
            <div class="nav_row"><div>项目</div>   <div>录入</div></div>
          </div>
          </el-collapse-transition>
        </div>
        <div @click="show(2)" @mouseleave="hide()">申请&审批
           <el-collapse-transition >
          <div class="nav_two_sq" v-show="show_sq">
            <div class="nav_row"><div>申请</div><div><router-link to="/Sq">教学设备借入申请</router-link></div> <div>易耗品领用审批</div> <div>采购审批</div> </div>
            <div class="nav_row"><div>审批</div><div><router-link to="/Sp">教学设备借入审批</router-link></div> <div>易耗品领用申请</div> <div>采购申请</div></div>
          </div>
          </el-collapse-transition>
        </div>
        <div @click="show(3)" @mouseleave="hide()">统计
           <el-collapse-transition >
          <div class="nav_two_tj" v-show="show_tj">
            <div class="nav_row"><div>统计</div><div><router-link to="/Kc">库存</router-link></div><div>台账</div><div><router-link to="/Pd">盘点</router-link></div> </div>
          </div>
          </el-collapse-transition>
        </div>
        <div @click="show(4)" @mouseleave="hide()">设置
           <el-collapse-transition >
              <div v-show="show_sz" class="nav_two_sz">
                <div class="nav_row"><div>基础设置</div><div>审批流程设置</div> <div><router-link to="/SpSd">资产存放地点设置</router-link></div> <div>资产分类设置</div> </div>
                <div class="nav_row"><div>系统设置</div><div>组织结构管理</div> <div>用户管理</div> <div><router-link to="/Role">角色管理</router-link></div></div>
              </div>
          </el-collapse-transition>
        </div>
        <div>操作日志</div>
        <div>帮助</div>
      </div>
      <div class="samss_top_login">
        <div class="smass_top_login_status">学校管理员</div>
        <div class="smass_top_login_name">张小丰</div>
        <div class="smass_top_login_photo"><img src="../assets/img/1.jpg" width="45px" height="45px"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SamssTop',
  data: () => ({
      show_zc: false,
      show_sq: false,
      show_tj: false,
      show_sz: false,
  }),
  methods:{
    clickHome(){
      this.$router.push({path:'/'})
    },
    show(num){
      if(num==1){
        this.show_zc=!this.show_zc;
      }else if(num==2){
        this.show_sq=!this.show_sq
      }else if(num==3){
        this.show_tj=!this.show_tj
      }else if(num==4){
        this.show_sz=!this.show_sz
        this.show_zc = false;
        this.show_sq = false;
        this.show_tj = false;
      }
    },
    hide(){
      this.show_sz = false;
      this.show_zc = false;
      this.show_sq = false;
      this.show_tj = false;
    }
  }
}
</script>

<style scoped lang="scss">

 
.samss_top{
  background: #252b3a;
  color: #FFF;
  height: 50px;
  line-height: 50px;
  display: flex;
  font-size: 15px;
}
.samss_top_name{
  width: 15%;
  display: flex;
  font-size: 18px;
  font-weight: 400;
}
.samss_top_name>img{
  margin-top: 7%;
}
.samss_top_nav{
  display: flex;
  width: 60%;
  text-align: center;
  margin: 0 5%;
  cursor: pointer;
}
.samss_top_nav>div{
  flex: 1;
}
.samss_top_nav>div>div{
  position: absolute;
}
.samss_top_login{
  display: flex;
  flex-direction: row-reverse;
  padding: 0 1%;
  width: 20%;
}
.smass_top_login_name{
  margin: 0 15px;
}
.smass_top_login>div{
  display: inline-block;
}
.smass_top_login_photo>img{
  margin-top: 10%;
  border-radius: 50%;
}
.smass_top_login_status{
  display: inline-block;
  background: rgb(7, 150, 107);
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}

.nav_two_zc{
  width: 47%;
  background-color: #314150;
  z-index: 10;
}
.nav_two_sq{
  width: 35%;
  background-color: #314150;
  z-index: 10;
}
.nav_two_tj{
  width: 20%;
  background-color: #314150;
  z-index: 10;
}
.nav_two_sz{
  width: 35%;
  background-color: #314150;
  z-index: 10;
}
.nav_row{
  display: flex;
  text-align: left;
  padding: 0 10px;
}
.nav_row>div:first-of-type{
  font-weight: 700;
}
.nav_two_sq .nav_row>div:first-of-type{
  width: 13%;
}
.nav_two_sz .nav_row>div:first-of-type{
  width: 16%;
}
.nav_two_zc .nav_row>div{
  width: 16.6%;
}
.nav_two_sq .nav_row>div{
  width: 29%;
}
.nav_two_tj .nav_row>div{
  width: 25%;
}
.nav_two_sz .nav_row>div{
  width: 28%;
}
.samss_top_name:hover{
  cursor: pointer;
}
a:-webkit-any-link {
    color: #FFF;
    cursor: pointer;
    text-decoration: none;;
}
</style>
