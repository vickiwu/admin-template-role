<template>
  <div class="app-container">
    <el-card shadow="always" class="news-card">
      <el-form
        ref="formNews"
        :model="formNews"
        label-width="80px"
        label-position="left"
        class="news-form"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formNews.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content" class="text-form">
          <!-- <el-input v-model="formNews.content" type="textarea" :rows="4" /> -->
          <div class="edit_container">
            <quill-editor
              ref="myQuillEditor"
              v-model="formNews.content"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            />
          </div>
        </el-form-item>

        <!-- <el-form-item label="可见性" prop="state">
          <el-radio-group v-model="formNews.state">
            <el-radio :label="0">未审核</el-radio>
            <el-radio :label="1">可见</el-radio>
            <el-radio :label="-1">不可见</el-radio>
          </el-radio-group>
        </el-form-item> -->

        <el-form-item label="是否置顶" prop="top">
          <el-radio-group v-model="formNews.top">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="btn-center">
          <!-- <el-button>取消</el-button> -->
          <el-button type="primary" style="padding:7px 25px;font-size: 13px;" @click="onSubmit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { create, edit } from '@/api/xinwen'
import { clean } from '@/utils/index'

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ['blockquote'], // 引用  代码块-----['blockquote', 'code-block']
  [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [{ 'direction': 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  [{ align: [] }], // 对齐方式-----[{ align: [] }]
  ['clean'], // 清除文本格式-----['clean']
  ['image', 'link'] // 链接、图片、视频-----['link', 'image', 'video']
]

export default {

  data() {
    return {
      editorOption: {
        placeholder: '请输入新闻内容',
        theme: 'snow',
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      },
      isEdit: false,
      formNews: {
        title: '',
        top: 0,
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        top: [
          { required: true, message: '请选择是否置顶', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    this.$route.params.isEdit ? (this.isEdit = true) : this.isEdit = false
    if (this.$route.params.rowData) {
      this.formNews = this.$route.params.rowData
    }
  },
  methods: {
    async edit() {
      await edit({ json: JSON.stringify(this.formNews) }).then((data) => {
        if (data.state === 1) {
          this.$alert('修改成功!', '提示', {
            confirmButtonText: '确定',
            type: 'success',
            callback: () => {
              // 修改成功后返回新闻管理页
              this.$router.push({
                name: 'Management'
              })
            }
          })
        }
      }).catch(err => err)
    },
    create() {
      this.$refs.formNews.validate(async(valid) => {
        if (!valid) {
          return false
        } else {
          alert('验证后台置顶top字段是否加上')
          await create({ json: JSON.stringify(clean(this.formNews)) }).then((data) => {
            if (data.state === 1) {
              this.$alert('新增成功!', '提示', {
                confirmButtonText: '确定',
                type: 'success',
                callback: () => {
                  this.formNews.title = ''
                  this.formNews.content = ''
                  this.formNews.top = ''
                }
              })
            }
          }).catch(err => err)
        }
      })
    },
    onSubmit() {
      if (this.isEdit) {
        this.edit()
      } else {
        this.create()
      }
    },
    onEditorReady(editor) { // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {} // 内容改变事件

  }
}
</script>

<style lang="scss" scoped>

.news-card {
.news-form{
  width: 80%;
  margin: 15px auto;
  .text-form{
    ::v-deep.el-form-item__content{
      line-height: normal;
    }
    .edit_container{

      ::v-deep.ql-container.ql-snow{
        min-height: 350px;
      }
    }
  }
  .btn-center{
    text-align: center;
    ::v-deep.el-button{
      margin: 0 15px;
    }
  }
}
}
</style>
<style>
/*  修改富文本中文 */
.editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>
