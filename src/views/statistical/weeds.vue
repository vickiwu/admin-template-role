<template>
  <div class="app-container">
    <baidu-map
      ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
      class="map"
      :style="{ height: appMainHeight }"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
    >
      <bm-marker v-for="(item , i) in centerList" :key="i" :position="item" :dragging="true" @click="infoWindowOpen(i)">
        <bm-info-window
          :show="i===currentI"
          @close="infoWindowClose(i)"
        >
          <div>
            <div class="info-title">杂草信息</div>
            <ul class="weed-info">
              <li>
                <span class="info-key">名称:</span>
                <span class="info-value">{{ item.name }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">位置:</span>
                <span class="info-value">{{ item.address }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">来源:</span>
                <span class="info-value">{{ item.from }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">图片:</span>
                <span class="info-value"> <img :src="item.img" alt=""></span>
              </li>
            </ul>
            <div class="weed-detail" @click="showDetail()">查看详细内容 ></div>
          </div>
        </bm-info-window>
        <bm-label :content="`${item.name} 位置${item.from }`" :label-style="labelStyle" :offset="{width: 25, height:5}" />
      </bm-marker>
      <bml-heatmap :data="data" :max="10" :radius="20" />
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker, BmInfoWindow, BmlHeatmap, BmLabel } from 'vue-baidu-map'
import { totalCount, getDistPage, heatmap, heatmapTotal } from '@/api/zacao'
import { getSysConfig } from '@/utils/auth'
import { clean, parseTime } from '@/utils/index'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmlHeatmap,
    BmLabel
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['apprefs'],
  data() {
    return {
      appMainHeight: '', // 容器高度
      center: { // 地图中心点- 用户登录可以获取到
        lng: 118.846,
        lat: 32.063
      },
      zoom: 12, // 地图放大的级别
      labelStyle: { color: '#000000', fontSize: '13px', border: 'none' },
      currentI: -1,
      // mark点位数据
      centerList: [{
        lng: 118.816,
        lat: 32.023,
        count: 50,
        name: '杂草A',
        address: '检疫口岸一',
        from: '东南亚一',
        img: require('@/assets/logo.png')
      },
      {
        lng: 118.846,
        lat: 32.043,
        count: 15,
        name: '杂草B',
        address: '检疫口岸二',
        from: '东南亚二',
        img: require('@/assets/logo.png')
      },
      {
        lng: 118.836,
        lat: 31.989,
        count: 51,
        name: '杂草C',
        address: '检疫口岸三',
        from: '东南亚三',
        img: require('@/assets/logo.png')
      },
      {
        lng: 118.817,
        lat: 32.063,
        count: 53,
        name: '杂草D',
        address: '检疫口岸四',
        from: '东南亚四',
        img: require('@/assets/logo.png')
      },
      {
        lng: 118.846,
        lat: 32.103,
        count: 15,
        name: '杂草E',
        address: '检疫口岸五',
        from: '东南亚五',
        img: require('@/assets/logo.png')

      }],
      // 热力图数据
      data: [
        { lng: 118.818261, lat: 32.021984, count: 50 },
        { lng: 118.823332, lat: 32.016532, count: 51 },
        { lng: 118.819787, lat: 32.030658, count: 15 },
        // ...此处添加更多的数据集
        { lng: 118.848261, lat: 32.041984, count: 50 },
        { lng: 118.848332, lat: 32.050532, count: 51 },
        { lng: 118.879787, lat: 32.042658, count: 15 }
      ],
      item: {
        name: '杂草B',
        address: '检疫口岸一',
        from: '东南亚',
        img: require('@/assets/logo.png')
      },
      start: 0,
      count: 10
    }
  },
  computed: {

  },
  mounted() {
    this.appMainHeight = parseInt(window.getComputedStyle(this.apprefs.appMain).getPropertyValue('height')) - 50 + 'px'
  },
  created() {
    // 获取中心位置 cookie中获取
    const sysConfig = JSON.parse(getSysConfig())
    this.center = sysConfig.home // 设置地图中心点

    this.totalCount() // 获取杂草总数 便于分页查询
    this.heatmapTotal() // 获取热力图总数量
    this.getDistPage() // 获取杂草数据
    this.heatmap() // 获取热力图数据
  },
  methods: {
    async totalCount() {
      await totalCount().then((res) => {
        const { data } = res
        console.log('%c 🥦 data: ', 'font-size:20px;background-color: #42b983;color:#fff;', data)
      })
    },
    async heatmapTotal() {
      await heatmapTotal().then((res) => {
        const { data } = res
        console.log('%c 🥦 data: ', 'font-size:20px;background-color: #42b983;color:#fff;', data)
      })
    },
    async getDistPage() {
      await getDistPage({ count: this.count, start: this.start }).then((res) => {
        const { data } = res
        console.log('%c 🥦 getDistPage: ', 'font-size:20px;background-color: #42b983;color:#fff;', data)
      })
    },
    async heatmap() {
      await heatmap({ count: this.count, start: this.start }).then((res) => {
        const { data } = res
        console.log('%c 🥦 heatmap: ', 'font-size:20px;background-color: #42b983;color:#fff;', data)
      })
    },
    showDetail() {
      this.$router.push({
        name: 'ShowWeeds'
      })
    },
    infoWindowClose(i) {
      // this.currentI = -1
    },
    infoWindowOpen(i) {
      this.currentI = i
    }

  }
}
</script>

<style lang="scss" scoped>
::v-deep.app-container{
  padding: 0;
}
.map {
  width: 100%;
  height: 500px;
  position: relative;
  .info-title {
    text-align: center;
  }
  .weed-info {
    list-style: none;
    padding: 0 5px;
    margin:10px 0 5px 0 ;
    li {
      margin-bottom: 8px;
      font-size: 13px;
      .info-key {
        display: inline-block;
        margin-right: 10px;
      }
      .info-value {
        display: inline-block;
        img{
          width:35px;
          height: 35px;
          vertical-align: text-top;
        }
      }
    }
  }
  .weed-detail{
    text-align: right;
    font-size: 12px;
    color: #0369c3;
    cursor: pointer;
  }
}
</style>
