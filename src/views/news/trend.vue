<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-row type="flex" justify="space-around" class="news-row">
        <el-col :span="17" class="col-left">
          <div class="left-title">最新新闻</div>
          <!-- 置顶新闻 -->
          <div v-for="(o, index) in toplist" :key="`toplist${index}`">
            <el-row>
              <div class="show-xinwen" @click="jumpNews(o)" v-html="o.title" />
              <!-- <el-col :span="7">
                <el-image
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </el-col>
              <el-col :span="15">
                <div class="img-title">{{ o.content }}</div>
              </el-col> -->
            </el-row>
            <el-divider />
          </div>
          <!-- 新闻 -->
          <div v-for="(o, index) in xinwenlist" :key="`xinwenlist${index}`">
            <el-row>
              <div class="show-xinwen" @click="jumpNews(o)" v-html="o.title" />
              <!-- <el-col :span="7">
                <el-image
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" />
                  </div>
                </el-image>
              </el-col>
              <el-col :span="15">
                <div class="img-title">{{ o.content }}</div>
              </el-col> -->
            </el-row>
            <el-divider v-if="index < xinwenlist.length - 1" />
          </div>
        </el-col>
        <el-col :span="5" class="col-right">
          <div class="right-title">热点排行榜：</div>
          <div v-for="o in topList" :key="o.id" class="right-list">
            <span
              class="top-span"
              style="cursor: pointer;"
              @click="jumpNews(o)"
            >{{ `${o.title}` }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getHotNews, getPage } from '@/api/xinwen'
import { clean } from '@/utils/index'
import { pageCount } from '@/globalConfig'

export default {
  data() {
    return {
      topList: [],
      xinwenlist: [],
      toplist: [],
      pagination: {
        count: pageCount,
        index: 1
      }
    }
  },
  mounted() {
    this.getHotNews()
    this.getPage()
  },
  methods: {
    async getHotNews() {
      await getHotNews().then(res => {
        const { data } = res
        this.topList = data.xinwenHotlist
      }).catch(err => err)
    },
    async getPage() {
      const params = { ...this.pagination }
      await getPage(clean(params)).then(res => {
        const { data } = res
        this.toplist = data.toplist
        console.log('%c 🍷  data.toplist: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', data.toplist)
        alert('验证接口是否加了toplist')
        this.xinwenlist = data.xinwenlist
      }).catch(err => err)
    },
    jumpNews(news) {
      this.$router.push({
        name: 'NewsDetail',
        params: {
          news
        }
      })
    }
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
  .news-row {
    height: 100%;
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
      .right-list {
        margin: 5px 15px 15px 15px;
      }
    }
  }
  .top-span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

}
</style>
<style lang="scss">
  .show-xinwen {
    cursor: pointer;
    img {
      max-width: 40%;
    }
  }
</style>
