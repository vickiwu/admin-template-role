<template>
  <div class="app-container">
    <baidu-map
      ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
      class="map"
      auto-resize
      :map-click="false"
      :style="{ height: appMainHeight }"
      :center="center"
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      @ready="handleReady"
    >
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />
      <!-- <bm-navigation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :enable-geolocation="false"
        :offset="{ width: 5, height: 105 }"
        :show-zoom-info="false"
      />
      <bm-geolocation
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        :show-address-bar="false"
        :offset="{ width: 28, height: 70 }"
        :auto-location="true"
      />
      <bm-map-type
        :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']"
        anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
        type="BMAP_MAPTYPE_CONTROL_MAP"
        :offset="{ width: 15, height: 5 }"
      /> -->
      <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT">
        <div>
          <!-- <button @click="showSatelliteTool">卫星</button> -->
          <button class="make-distance" @click="openDistanceTool">
            开启测距
          </button>
        </div>
      </bm-control>
      <bm-marker
        v-for="item in centerList"
        :key="item.id"
        :position="item"
        :dragging="false"
        @click="infoWindowOpen(item.id)"
      >
        <bm-info-window
          :show="item.id === currentI"
          @close="infoWindowClose(item.id)"
        >
          <div>
            <div class="info-title">杂草信息</div>
            <ul class="weed-info">
              <li>
                <span class="info-key">名称:</span>
                <span class="info-value">{{ zacao.nameCn }}</span>
              </li>
              <li>
                <span class="info-key">位置:</span>
                <span
                  v-for="(wz, index) in zacao.discReg"
                  :key="index"
                  class="info-value"
                >{{ wz }}</span>
              </li>
              <li>
                <span class="info-key">来源:</span>
                <span class="info-value">{{ zacao.source }}</span>
              </li>
              <li>
                <span class="info-key">图片:</span>
                <span class="info-value">
                  <img
                    v-for="img in zacao.piclist"
                    :key="img.httpUrl"
                    :src="img.httpUrl"
                    alt=""
                  ></span>
              </li>
            </ul>
            <div class="weed-detail" @click="showDetail(zacao)">
              查看详细内容 >
            </div>
          </div>
        </bm-info-window>
        <bm-label
          :content="`${item.name} 位置${item.from}`"
          :label-style="labelStyle"
          :offset="{ width: 25, height: 5 }"
        />
      </bm-marker>
      <bml-heatmap :data="data" :max="10" :radius="20" />
    </baidu-map>
    <el-dialog
      title="杂草详情"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <showWeeds :data="zacaoData" :show-btn="false" />
    </el-dialog>
    <el-dialog
      title="添加杂草"
      :visible.sync="showAddPoint"
      width="60%"
      top="5vh"
      :before-close="handleAddClose"
      class="edit-weed-dialog"
    >
      <editWeed
        v-if="showAddPoint"
        :position="addPoint"
        is-create
        @close="handleAddClose"
        @saved="handleAddSaved"
      />
    </el-dialog>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {
  BmMarker,
  BmInfoWindow,
  BmlHeatmap,
  BmLabel,
  BmMapType,
  BmGeolocation,
  BmControl
  // BmNavigation
} from 'vue-baidu-map'
import {
  totalCount,
  getDistPage,
  heatmap,
  heatmapTotal,
  getZacao
} from '@/api/zacao'
import { getSysConfig } from '@/utils/auth'
import debounce from 'lodash.debounce'
import { pageCount } from '@/globalConfig'
import showWeeds from '@/views/weeds/showWeeds'
import editWeed from '@/views/weeds/editWeed'
import DistanceTool from 'bmaplib.distancetool'

// import { clean, parseTime } from '@/utils/index'

export default {
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow,
    BmlHeatmap,
    BmLabel,
    BmMapType,
    BmGeolocation,
    BmControl,
    showWeeds,
    editWeed
    // BmNavigation
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['apprefs'],
  data() {
    return {
      appMainHeight: '', // 容器高度
      center: {
        // 地图中心点- 用户登录可以获取到
        lng: 118.846,
        lat: 32.063
      },
      zoom: 15, // 地图放大的级别
      labelStyle: { color: '#000000', fontSize: '13px', border: 'none' },
      currentI: -1,
      // mark点位数据
      centerList: [], // {lng: 118.816,lat: 32.023,count: 50, name: '杂草A',address: '检疫口岸一',from: '东南亚一',img: require('@/assets/logo.png')},
      // 热力图数据
      data: [], // { lng: 118.818261, lat: 32.021984, count: 50 }
      zacao: {},
      start: 0,
      count: pageCount,
      zacaoData: null,
      dialogVisible: false,
      addPoint: {},
      showAddPoint: false,
      distanceTool: null
    }
  },
  computed: {},
  mounted() {
    this.listenWindow()
    this.appMainHeight =
      parseInt(
        window.getComputedStyle(this.apprefs.appMain).getPropertyValue('height')
      ) -
      50 +
      'px'
  },
  unmount() {
    this.distanceTool && this.distanceTool.close()
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
    handleReady({ BMap, map }) {
      var addZacao = ({ lat, lng }) => {
        this.addPoint = {
          lng,
          lat
        }
        this.showAddPoint = true
      }
      var menu = new BMap.ContextMenu()
      menu.addItem(new BMap.MenuItem('添加杂草', addZacao))
      map.addContextMenu(menu)
      this.setDistanceToolInstance({ map })
    },
    listenWindow() {
      window.onresize = debounce(() => {
        this.appMainHeight =
          parseInt(
            window
              .getComputedStyle(this.apprefs.appMain)
              .getPropertyValue('height')
          ) -
          50 +
          'px'
      }, 100)
    },
    async totalCount() {
      await totalCount()
        .then(res => {
          // const { data } = res
        })
        .catch(err => err)
    },

    async heatmapTotal() {
      await heatmapTotal()
        .then(res => {
          // const { data } = res
        })
        .catch(err => err)
    },
    async getDistPage() {
      await getDistPage({ count: this.count, start: this.start })
        .then(res => {
          const { data } = res
          this.centerList = data.distlist.map(item => {
            const centerItem = {}
            centerItem.lat = item.lat / 10000000
            centerItem.lng = item.lng / 10000000
            centerItem.name = item.name
            centerItem.from = item.discReg.join(',')
            centerItem.id = item.id
            return centerItem
          })
        })
        .catch(err => err)
    },
    async heatmap() {
      await heatmap({ count: this.count, start: this.start })
        .then(res => {
          const { data } = res
          this.data = data.heatmaplist.map(item => {
            item.lat = item.lat / 1000000
            item.lng = item.lng / 1000000
            item.count = item.count * 2
            return item
          })
        })
        .catch(err => err)
    },
    showDetail(zacao) {
      this.zacaoData = zacao
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    infoWindowClose(id) {
      this.currentI = -1
    },
    infoWindowOpen(id) {
      // 根据杂草id获取杂草信息
      getZacao({ id })
        .then(res => {
          const { data } = res
          this.zacao = data.zacao
        })
        .catch(err => err)
      this.currentI = id
    },
    handleAddClose() {
      this.showAddPoint = false
    },
    handleAddSaved() {
      this.totalCount() // 获取杂草总数 便于分页查询
      this.heatmapTotal() // 获取热力图总数量
      this.getDistPage() // 获取杂草数据
      this.heatmap() // 获取热力图数据
      this.showAddPoint = false
    },
    setDistanceToolInstance({ map }) {
      this.distanceTool = new DistanceTool(map, { lineStroke: 2 })
    },
    openDistanceTool(e) {
      this.distanceTool && this.distanceTool.open()
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-weed-dialog {
  ::v-deep.el-dialog__body {
    padding: 0 20px;
    padding-bottom: 10px;
  }
}
::v-deep.app-container {
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
    margin: 10px 0 5px 0;
    li {
      margin-bottom: 8px;
      font-size: 12px;
      white-space: nowrap;
      .info-key {
        display: inline-block;
        margin-right: 10px;
      }
      .info-value {
        display: inline-block;
        img {
          width: 70px;
          height: 70px;
          vertical-align: text-top;
        }
      }
    }
  }
  .weed-detail {
    text-align: right;
    font-size: 12px;
    color: #0369c3;
    cursor: pointer;
  }
  .make-distance {
    box-shadow: rgba(0, 0, 0, 0.35) 2px 2px 3px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(139, 164, 220);
    background: rgb(255, 255, 255);
    margin: 10px 10px 0 0;
    font-size: 12px;
    line-height: 1.3em;
    text-align: center;
    border-radius: 3px;
    color: rgb(0, 0, 0);
  }
}
</style>

<style>
.BMap_cpyCtrl {
  display: none;
}

.anchorBL {
  display: none;
}
</style>
