<template>
  <div
    class="ValidCode disabled-select"
    :style="`width:${width}; height:${height}`"
    @click="refresh"
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
    data: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      codeList: []
    }
  },
  watch: {
    data() {
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
      const codeList = []
      // 生成
      if (this.data) {
        const chars = this.data.split('')
        chars.forEach(element => {
          const rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() * 200)]
          codeList.push({
            code: element,
            color: `rgb(${rgb})`,
            fontSize: `${16 + (+[Math.floor(Math.random() * 10)] + 5)}px`,
            padding: `${[Math.floor(Math.random() * 10)]}px`,
            transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
          })
        })
      }

      // 指向
      this.codeList = codeList
      // 将当前数据派发出去
      this.$emit('input', codeList.map(item => item.code).join(''))
    },
    getStyle(data) {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    },
    refresh() {
      this.$emit('refresh')
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
