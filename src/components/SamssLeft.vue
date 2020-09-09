<template>
    <div class="samss_left" :style="show3?'bottom:0;background-color: #62666b;':'background-color: #B9B9B9;height: 10px;'">
      <div class="samss_nav_button">
        <i :class="show3 ? 'el-icon-arrow-down':'el-icon-arrow-up'"  @click="show3 = !show3" style="padding: 3px;height: 4px;"></i>
        <div>
          <el-collapse-transition>
            <div v-show="show3">
              <div class="transition-box" @click="show2 = !show2"><i class="el-icon-menu"><div>PAGES</div></i></div>
              <div class="transition-box" @click="show2 = !show2"><i class="el-icon-tickets"><div>NOTES</div></i></div>
              <div class="transition-box" @click="show2 = !show2"><i class="el-icon-message"><div>DISCUSS</div></i></div>
              <div class="transition-box" @click="show2 = !show2"><i class="el-icon-view"><div>CONSOLE</div></i></div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
      <div class="samss_nav_two">
        1
      </div>
    </div>
</template>

<script>
export default {
  name: 'SamssLeft',
  data: () => ({
      show3: true,
      show2: true
  }),
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//按钮动画

 .transition-box i{
   font-size: 5px;
 }
 .transition-box i>div{
   font-size: 2px;
   margin-top: 2px;
 }
 .samss_left{
  position: fixed;
  top: 0;
  left: 0;
  width: 4%;
  color: #FFF;
  font-size: 3px;
 }
 .transition-box {
  background-color: #8f949a;
  padding: 3px 0;
  z-index: 10;
  }
.samss_nav_two{
  width: 30%;
  background-color: #f5f5f5;
}

</style>
