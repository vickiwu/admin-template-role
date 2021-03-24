<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <div v-html="news.content" />
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

  }
}
</script>

<style lang="scss" scoped>

.news-card {
  min-height: calc(100% - 35px);
  ::v-deep.el-card__body {
    padding: 20px 0;
    height: 100%;
    width: 100%;
  }
}
</style>
