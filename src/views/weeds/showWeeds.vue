<template>
  <div class="app-container-dialog">
    <el-form
      ref="form"
      :model="form"
      label-width="120px"
      label-position="left"
      class="news-form"
    >
      <el-form-item label="名称 ：">
        {{ form.nameCn }}
      </el-form-item>
      <el-form-item label="拉丁名称 ：" placeholder="请输入杂草拉丁名称">

        {{ form.nameLt }}
      </el-form-item>
      <el-form-item label="来源 ：" placeholder="请输入杂草来源">
        {{ form.source }}
      </el-form-item>
      <el-form-item label="区域 ：">
        <span v-for="(item,index) in form.discReg" :key="index" style="margin-right:15px">

          <el-tag>{{ item }}</el-tag>
        </span>

      </el-form-item>
      <el-form-item label="发现时间 ：">
        <span>{{ parseTime(form.discTime) }}</span>
      </el-form-item>
      <el-form-item label="种类 ：">

        <div>
          <span style="margin-right:5px"> {{ form.specy ? form.specy.lb1 : '' }}</span>
          <span style="">{{ form.specy ? form.specy.lb2 : "" }}</span>
        </div>

      </el-form-item>
      <el-form-item label="检疫地位 ：" prop="jydw">
        {{ form.jydw ==0?'未发现有害生物' :form.jydw ==1?'非检疫性有害生物':form.jydw ==2? '检疫性有害生物' :'非鉴定性有害生物' }}
      </el-form-item>
      <el-form-item label="特征描述 ：" placeholder="请输入杂草危害特征描述">
        {{ form.desc }}
      </el-form-item>

      <el-form-item label="图片 ：" prop="resource">
        <el-image
          v-for="(item) in form.piclist"
          :key="item.httpUrl"
          style="width: 300px; height: 200px"
          :src="item.httpUrl"
          :preview-src-list="[item.httpUrl]"
        />

      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="经度 ：">
            {{ (form.lng / 10000000).toFixed(7) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纬度 ：">
            {{ (form.lat/ 10000000).toFixed(7) }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button v-if="showBtn" style="margin-left ：20px" type="primary" @click="showMap">地图查看</el-button>
        </el-col>
      </el-row>

      <el-form-item label="状态 ：">
        {{ form.state ==0?'待研判' :form.state ==1?'待进一步确认':'研判完成,入库' }}
      </el-form-item>
      <el-form-item v-if="showYj" label="研判意见 ：">
        {{ form.comment }}
      </el-form-item>

    </el-form>
    <el-dialog
      title="地图查看"
      :visible.sync="mapDialogVisible"
      width="50%"
      :before-close="handleClose"
      append-to-body
      class="show-map"
    >
      <div>
        <baidu-map
          ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
          class="bm-view"
          :zoom="15"
          :center="home"
          :scroll-wheel-zoom="true"
        >
          <bm-marker :position="{lng: form.lng / 10000000, lat: form.lat/ 10000000}">
            <bm-label content="位置ccc" :label-style="labelStyle" :offset="{width: 25, height:5}" />
          </bm-marker>
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
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT" />
        </baidu-map>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { mapGetters } from 'vuex'
import { BmLabel, BmMarker,
//  BmNavigation,
  BmGeolocation, BmMapType } from 'vue-baidu-map'
import { parseTime } from '@/utils/index'

export default {
  components: {
    BaiduMap,
    BmLabel,
    BmMarker,
    // BmNavigation,
    BmGeolocation, BmMapType
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    showBtn: {
      type: Boolean,
      default: () => true
    },
    showYj: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {},
      mapDialogVisible: false,
      labelStyle: { color: '#000000', fontSize: '13px', border: 'none' }

    }
  },
  computed: {
    ...mapGetters([
      'home'
    ])
  },
  watch: {
    data: {
      immediate: true,
      deep: true, // 深度监听
      handler(newVal, oldVal) {
        this.form = newVal
      }
    }
    // showBtn: {
    //   immediate: true,
    //   deep: true, // 深度监听
    //   handler(news, old) {
    //   }
    // }
  },
  methods: {
    parseTime(time) {
      return parseTime(time)
    },
    showMap() {
      if (this.form.lat && this.form.lng) {
        this.mapDialogVisible = true
      } else {
        this.$alert('当前杂草无位置信息', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).catch(err => err)
      }
    },

    handleClose() {
      this.mapDialogVisible = false
    }
  }
}
</script>

<style lang="scss">
  .show-map{
    .el-dialog__body{
  padding:0 20px;
}
  }
</style>

<style lang="scss" scoped>
::v-deep.el-dialog__body{
  padding:0 20px;
}
.app-container-dialog{
  .el-form-item{
    margin-bottom: 0 !important;
  }
}
.bm-view {
  width: 100%;
  height: 500px;
}
.news-form{
  width: 80%;
  margin: 15px auto;

  ::v-deep.el-select{
    width: 100%;
  }
  .btn-center{
    text-align: center;
    ::v-deep.el-button{
      margin: 0 15px;
    }
  }
}
</style>
<style>
.BMap_cpyCtrl {
    display:none;
}

.anchorBL{
    display:none;
}
</style>
