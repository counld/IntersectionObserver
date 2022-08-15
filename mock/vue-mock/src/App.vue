<template>
<div class="common-layout">
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>
          <h1>在vue3里面使用Router</h1>
          <router-link to="/">首页</router-link>|
          <router-link to="/about">用户</router-link>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-header {
  background: #2c3e50;
  font-size: 24px;
  color: #000;
}
.common-layout {
  height: 100vh;
}
.el-container {
  height: 100%;
}
</style>
