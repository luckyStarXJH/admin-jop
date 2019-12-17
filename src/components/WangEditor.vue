<template>
  <article class="wang-editor">
    <div :id="`editor-menu-${eleId}`" class="editor-menu"></div>
    <div class="column"></div>
    <div :id="`editor-con-${eleId}`" class="editor-con"></div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import E from 'wangeditor'
import user from '@/utils/user'

@Component({})
export default class WangEditor extends Vue {
  @Prop({ default: 'setting' })
  type!: string

  @Prop()
  contents!: string

  @Prop({ default: `${new Date().getTime()}` })
  eleId!: string

  private editorContent: string = ''
  private editor: any = null

  @Watch('contents')
  onContents(val: any) {
    this.setContent(val)
  }

  private mounted() {
    // 创建编辑器
    this.createEditor()
    // 清除div样式层次
    this.removeStyle()
  }

  // 清除div样式层次
  private removeStyle() {
    const item1 = document.querySelectorAll('.w-e-menu')
    item1.forEach(p => {
      p.removeAttribute('style')
    })
    const item2 = document.querySelector('.w-e-text-container')
    if (item2) {
      item2.removeAttribute('style')
    }
  }

  // 获取内容
  private getContent() {
    return this.editor.txt.html()
  }

  // 获取内容文本
  private getContentText() {
    return this.editor.txt.text()
  }

  // 设置内容
  private setContent(content: any) {
    this.editor.txt.clear()
    if (content && typeof content === 'string' && content.startsWith('<')) {
      this.editor.txt.html(`${content}`)
    } else if (content) {
      this.editor.txt.html(`<p>${content}</p>`)
    }
    this.editorContent = content
  }

  // 创建富文本编辑器
  private createEditor() {
    this.editor = new E(`#editor-menu-${this.eleId}`, `#editor-con-${this.eleId}`)
    this.editor.customConfig.zIndex = 100
    if (this.type === 'word') {
      this.editor.customConfig.menus = ['link']
    }
    this.editor.customConfig.uploadImgShowBase64 = true

    this.editor.customConfig.uploadImgServer = `${process.env.VUE_APP_BASE_API}/jop-wx-web/file/upload`
    this.editor.customConfig.uploadImgParams = {
      edit: 'edit',
      alias: 'photos'
    }
    this.editor.customConfig.uploadFileName = 'file'
    this.editor.customConfig.uploadImgHeaders = {
      ticket: user.serverUser.ticket,
      companyKey: user.serverUser.account.companyKey,
      accountId: user.serverUser.account.accountId
    }

    this.editor.customConfig.onchange = (html: any) => {
      this.editorContent = html
    }
    this.editor.create()
  }

  // 清除内容
  private destroyed() {
    this.editor.txt.clear()
    this.editor = null
  }
}
</script>

<style lang="scss" scoped>
.wang-editor {
  width: 100%;
  position: relative;
  z-index: 999;
  .editor-menu {
    border: 1px solid #ccc;
    flex-wrap: wrap;
  }
  .column {
    height: 5px;
  }
  .editor-con {
    border: 1px solid #ccc;
    position: static;
    min-height: 300px;
    max-height: 600px;
    overflow-y: auto;
  }
}
/* ul ol 样式 */
ul,
ol {
  margin: 10px 0 10px 20px;
}
</style>


