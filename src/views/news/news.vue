<template>
  <div class="app-container">
    <el-button type="primary" class="go-back-btn" @click="goBack">返回上一级</el-button>
    <el-card shadow="always" class="news-card">
      <div style="padding:0 15px;" v-html="news.content" />
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      news: {}
    }
  },
  mounted() {
    if (this.$route.params) {
      this.news = this.$route.params.news
    }
  },
  methods: {
    goBack() {
      this.$router.go('-1')
    }
  }
}
</script>

<style lang="scss" scoped>
.go-back-btn{
  margin-left: 20px ;
  margin-bottom: 15px;
}
.news-card {
  min-height: calc(100% - 35px);
  ::v-deep.el-card__body {
    padding: 20px 0;
    height: 100%;
    width: 100%;
  }
}
</style>
