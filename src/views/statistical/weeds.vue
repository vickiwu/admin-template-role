<template>
  <div>
    <baidu-map
      ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
      class="map"
      :style="{ height: appMainHeight }"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
    >
      <bm-marker v-for="(item, i) in centerList" :key="i" :position="item" :dragging="true" @click="infoWindowOpen(i)">
        <bm-info-window
          :show="i===currentI"
          @close="infoWindowClose(i)"
        >
          <div>
            <div class="info-title">杂草信息</div>
            <ul class="weed-info">
              <li>
                <span class="info-key">名称:</span>
                <span class="info-value">{{ weedInfo.name }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">位置:</span>
                <span class="info-value">{{ weedInfo.address }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">来源:</span>
                <span class="info-value">{{ weedInfo.from }}{{ i }}</span>
              </li>
              <li>
                <span class="info-key">图片:</span>
                <span class="info-value"> <img :src="weedInfo.img" alt=""></span>
              </li>
            </ul>
            <div class="weed-detail">查看详细内容 ></div>
          </div>
        </bm-info-window>
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { BmMarker, BmInfoWindow } from 'vue-baidu-map'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  },
  props: ['apprefs'],
  data() {
    return {
      appMainHeight: '', // 容器高度
      center: { // 地图中心点
        lng: 118.846,
        lat: 32.063
      },
      zoom: 12, // 地图放大的级别
      labelStyle: { color: 'red', fontSize: '14px' },
      currentI: -1,
      centerList: [{
        lng: 118.846,
        lat: 32.063
      },
      {
        lng: 118.946,
        lat: 32.043
      },
      {
        lng: 118.746,
        lat: 31.963
      },
      {
        lng: 118.886,
        lat: 32.163
      },
      {
        lng: 118.746,
        lat: 32.163
      }],
      weedInfo: {
        name: '杂草B',
        address: '检疫口岸一',
        from: '东南亚',
        img: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
      }
    }
  },
  computed: {

  },
  mounted() {
    this.appMainHeight = parseInt(window.getComputedStyle(this.apprefs.appMain).getPropertyValue('height')) - 50 + 'px'
  },
  created() {

  },
  methods: {
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
