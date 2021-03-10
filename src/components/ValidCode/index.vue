<template>
  <div
    class="ValidCode disabled-select"
    :style="`width:${width}; height:${height}`"
    @click="refreshCode"
  >
    <span
      v-for="(item, index) in codeList"
      :key="index"
      :style="getStyle(item)"
    >{{ item.code }}</span>
  </div>
</template>

<script>
export default {
  name: 'ValidCode',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '40px'
    },
    length: {
      type: Number,
      default: 4
    },
    refresh: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      codeList: []
    }
  },
  watch: {
    refresh() {
      console.log('%c 🍓 refresh: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', 'refresh')
      this.createdCode()
    }
  },
  mounted() {
    this.createdCode()
  },
  methods: {
    refreshCode() {
      this.createdCode()
    },
    createdCode() {
      const len = this.length
      const codeList = []
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        const rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
        codeList.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `${16 + (+[Math.floor(Math.random() * 10)] + 6)}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
        })
      }
      // 指向
      this.codeList = codeList
      // 将当前数据派发出去
      console.log(codeList.map(item => item.code).join(''))
      this.$emit('input', codeList.map(item => item.code).join(''))
    },
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    }
  }
}
</script>

<style scoped lang="scss">
  .ValidCode{
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
      display: inline-block;
      -webkit-touch-callout: none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
    }
  }
</style>
