<template>
  <div class="app-container">
    <div class="news-title">海关新闻</div>
    <el-card shadow="always" class="news-card">
      <el-row type="flex" justify="space-around" class="news-row">
        <el-col :span="15" class="col-left">
          <div class="left-title">热点精选</div>
          <div v-for="o in 3" :key="o">
            <el-row type="flex" justify="space-around">
              <el-col :span="7">
                <el-image
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </el-col>
              <el-col :span="15">
                <div class="img-title">宁海发现新入侵植物！</div>
              </el-col>
            </el-row>
            <el-divider v-if="o < 3" />
          </div>
        </el-col>
        <el-col :span="7" class="col-right">
          <div class="right-title">热点排行榜：</div>
          <div v-for="o in 10" :key="o" class="right-list">
            {{ `某入侵植物${o}...` }}
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

export default {

  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.news-title {
  height: 35px;
  // line-height: 35px;
}
.news-card {
  height: calc(100% - 35px);
  ::v-deep.el-card__body {
    padding: 20px 0;
    height: 100%;
    width: 100%;
  }
  .news-row {
    height: 100%;
    overflow-y: auto;
    .col-left {
      // margin-top: -5px;
      .left-title {
        font-weight: bold;
        font-size: 20px;
        color: blue;
        margin-bottom: 20px;
      }
      .img-title {
        font-weight: bold;
        font-size: 18px;
      }
      ::v-deep.el-divider--horizontal {
        margin: 15px 0;
      }
    }
    .col-right {
      background: #f5f5f5;
      padding: 10px 0;
      .right-title {
        border-left: 3px solid blue;
        padding-left: 10px;
        font-size: 17px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .right-list{
        margin: 5px 15px 15px 15px;
      }
    }
  }
}
</style>
