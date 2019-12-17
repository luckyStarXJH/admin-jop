<template>
  <div>
    <el-form ref="form" :model="form" label-width="130px" labelPosition="left">
      <el-form-item label="是否关闭分享：">
        <el-checkbox true-label="1" false-label="0" v-model="form.isShare">开启分享</el-checkbox>
      </el-form-item>
      <el-form-item label="微信分享图标：" required>
        <el-col :span="8">
          <el-upload
            :headers="uploadHeaders" 
            :on-success="(response, file) => uploadPicSuccessHandle(response, file, [...fileList[0]])"
            :action="baseURL+'\/jop-marketing-web\/market\/upload'"
            list-type="picture"
            :file-list="[fileList[0]]"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">图片格式：*jpg、png,尺寸：300px*300px</div>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="微信分享标题：" required>
        <el-col :span="8">
          <el-input v-model="form.shareTitle"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="微信分享内容：" required>
        <el-col :span="12">
          <el-input type="textarea" v-model="form.shareContent" :rows="4"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="分享增加次数：">
        <el-checkbox true-label="1" false-label="0" v-model="form.isShareAdd">开启</el-checkbox>
        <el-row :gutter="5">
          <el-col :span="8.5">
            <span>活动期间每天首次分享给好友或朋友圈，当天额外获得</span>
          </el-col>
          <el-col :span="2">
            <el-input v-model="form.shareCount"></el-input>
          </el-col>
          <el-col :span="4">
            <span>次机会</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="引导关注：">
        <el-col :span="2">
          <el-checkbox true-label="1" false-label="0" v-model="form.isLeadConcern">开启</el-checkbox>
        </el-col>
        <el-col :span="2">
          <el-button
            v-if="form.isLeadConcern === '1'"
            type="text"
            style="text-decoration: underline;"
            @click="centerDialogVisible = true"
          >查看示例</el-button>
        </el-col>
        <el-col :span="2">
          <el-tooltip class="item" effect="light" placement="bottom">
            <div slot="content">
              开启后有被微信拉黑朋友圈的风险（即玩家分享朋友圈时仅自己可见），
              <br />甚至有被微信封停公众号一段时间的风险，请谨慎使用！
            </div>
            <el-button type="text" style="text-decoration: underline;">风险提示</el-button>
          </el-tooltip>
        </el-col>
      </el-form-item>
      <el-form-item label="微信公众号：" required>
        <el-col :span="8">
          <el-upload
            :headers="uploadHeaders"
            :on-success="(response, file) => uploadPicSuccessHandle(response, file, [...fileList[1]])"
            :action="baseURL+'\/jop-marketing-web\/market\/upload'"
            list-type="picture"
            :file-list="[fileList[1]]"
          >
            <el-button size="small" type="primary">上传二维码</el-button>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="效果展示" :visible.sync="centerDialogVisible" width="800px" center>
      <img src="~@/assets/images/super-mkt/guanzhu-zs.png" alt />
    </el-dialog>
  </div>
</template>

<script>
import user from '@/utils/user'
import { newUpdateShare, queryShare } from '@/api/super-mkt/activity-set/tiger'
export default {
  data() {
    return {
      centerDialogVisible: false,
      baseURL: process.env.VUE_APP_BASE_API,
      uploadHeaders: {
        ticket: user.serverUser.ticket,
        companyKey: user.serverUser.account.companyKey,
        accountId: user.serverUser.account.accountId
      },
      checked: false,
      fileList: [
        {
          name: '微信分享图标',
          url: 'http://www.jqzjop.com/ftp_images/01/null/5d4bf5bdd78c4fce.jpg'
        },
        {
          name: '暂未上传微信公众号',
          url: ''
        }
      ],
      form: {
        creator: '',
        createTime: '',
        modify: '',
        modifyTime: '',
        id: '',
        companyKey: '',
        activeId: this.$route.query.id,
        isShare: '1',
        shareImg:
          'http://www.jqzjop.com/ftp_images/01/null/5d4bf5bdd78c4fce.jpg',
        shareTitle: '',
        shareContent: '',
        isShareAdd: '1',
        shareCount: 0,
        isLeadConcern: '1',
        publicAccount: ''
      }
    }
  },
  created() {
    this._queryShare()
  },
  methods: {
    uploadPicSuccessHandle(response, file, picture) {
      const { code, data } = response
      if (code === '0' && data.length) {
        picture[0].url = data[0]

        if (picture[0].name === '微信分享图标') {
          this.fileList.splice(0, 1, picture[0])
          this.form.shareImg = data[0]
        } else {
          this.fileList.splice(1, 1, picture[0])
          this.form.publicAccount = data[0]
        }
      }
    },
    async _queryShare(options = { activeId: this.$route.query.id }) {
      const { data } = await queryShare(options)
      if (data.activeId) {
        this.form = data

        this.fileList[0].url = this.form.shareImg
        this.fileList[1].url = this.form.publicAccount
        this.fileList[1].name = '微信公众号展示图'
      }
    },
    async onSubmit() {
      try {
        const { msg } = await newUpdateShare(this.form)
        this._queryShare()
        this.$message.success(msg)
      } catch (error) {
        console.log('TCL: onSubmit -> error', error)
      }
    }
  }
}
</script>

<style>
</style>
