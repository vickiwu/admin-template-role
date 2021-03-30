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
      <el-form-item label="种类 ：">

        <div>
          <span style="margin-right:10px"> {{ form.specy ? form.specy.lb1 +'科' : '' }}</span>
          <span style="margin-left:10px;margin-right:10px">{{ form.specy ? form.specy.lb2 + '属' : "" }}</span>
        </div>

      </el-form-item>
      <el-form-item label="危害程度 ：" prop="jydw">
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
      <el-form-item label="区域 ：">
        <el-col :span="17">
          <span v-for="(item,index) in form.discReg" :key="index" style="margin-right:15px">
            <el-tag>{{ item }}</el-tag>
          </span>
        </el-col>
        <el-col :span="6">
          <el-button style="margin-left ：20px" size="small" type="primary" @click="showMap">地图查看</el-button>
        </el-col>

      </el-form-item>
      <el-form-item label="状态 ：">
        {{ form.state ==0?'未研判' :form.state ==1?'待进一步确认':'研判完成,入库' }}
      </el-form-item>
      <el-form-item label="研判意见 ：">
        {{ form.comment }}
      </el-form-item>

    </el-form>
    <el-dialog
      title="地图查看"
      :visible.sync="mapDialogVisible"
      width="50%"
      :before-close="handleClose"
      append-to-body
    >
      <div v-if="form.lat && form.lng">
        <baidu-map
          ak="InHZQsN1mrE5mfdl9s02lRuLtCI1QiHK"
          class="bm-view"
          :zoom="7"
          :center="home"
          :scroll-wheel-zoom="true"
        >
          <bm-marker :position="{lng: form.lng / 10000000, lat: form.lat/ 10000000}">
            <bm-label content="位置" :label-style="labelStyle" :offset="{width: 25, height:5}" />
          </bm-marker>
        </baidu-map>
      </div>
      <div v-else>
        无位置信息
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { mapGetters } from 'vuex'
import { BmLabel, BmMarker } from 'vue-baidu-map'

export default {
  components: {
    BaiduMap,
    BmLabel,
    BmMarker
  },
  props: {
    data: {
      type: Object,
      default: () => {}
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
  },
  methods: {
    showMap() {
      this.mapDialogVisible = true
    },

    handleClose() {
      this.mapDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
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
