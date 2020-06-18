<template>
  <el-container>
    <el-header>
      <img src="../assets/lsf_logo.jpg" alt style="width: 40px; height: 40px; padding-top: 10px" />
      <h3 style="font-size: 20px; letter-spacing: 0.5px; color: #080808">螺蛳网后台</h3>
      <!-- <div style="background-color: #dfdfdf; font-size: 25px; right: 0; position: absolute;">
        <i class="el-icon-setting"></i>
      </div>-->
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #fff;">
        <el-menu
          :default-active="active"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#fff"
          text-color="#080808"
          active-text-color="#1989fa"
          router
        >
          <el-menu-item-group>
            <template slot="title">上传区</template>
            <el-menu-item index="/carousel">首页轮播上传</el-menu-item>
            <el-menu-item index="/goods">商品整体上传</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="查看区">
            <el-menu-item index="/managegoods">查看编辑商品</el-menu-item>
            <el-menu-item index="/order">查看定单，发货</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="客户区">
            <el-menu-item index="/user">查看所有客户</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: ""
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    this.active = this.$route.path;
  }
};
</script>
<style lang="scss">
.el-container {
  height: 100%;
  width: 100%;
}
.el-header {
  background-color: #fff;
  border-bottom: 1px double #dfdfdf;
  display: flex;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100vh;
}
</style>