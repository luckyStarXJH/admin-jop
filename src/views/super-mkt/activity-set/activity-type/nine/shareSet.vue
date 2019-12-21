<template>
  <div class="ShareSet">
    <ul class="From-tab">
      <li class="info-col">
        <span class="lable">是否关闭分享：</span>
        <div class="row2">
          <el-radio v-model="form.isShare" label="1">开启分享</el-radio>
          <el-radio v-model="form.isShare" label="0">关闭分享</el-radio>
        </div>
      </li>
      <li class="info-col">
        <span class="lable" style="position:absolute;top:0;">微信分享图标：</span>
        <span class="lable" style="min-width: 98px;"></span>
        <div class="row2">
          <el-upload
            class="upload-demo"
            action
            list-type="picture"
            :file-list="[fileList[0]]"
            :multiple="false"
            :http-request="uploadImg"
            :limit="1"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <span slot="tip" class="el-upload__tip">
              <span style="color:red">(上传前，请先点击 删除 旧图)</span> 图片格式：*jpg、png,尺寸：300px*300px
            </span>
          </el-upload>
        </div>
      </li>
      <li class="info-col">
        <span class="lable">微信分享标题：</span>
        <div class="row2">
          <input
            type="text"
            placeholder="幸运九宫格，精美礼品摇到停不下来"
            class="share-title"
            v-model="form.shareTitle"
          />
        </div>
      </li>
      <li class="info-col publicNumber">
        <div>
          <span class="lable">微信分享内容：</span>
        </div>
        <div class="row2" style="width:500px;">
          <el-input
            v-model="form.shareContent"
            type="textarea"
            :rows="5"
            :style="{
              width: '357px;',
            }"
            :autosize="{ minRows: 6}"
            placeholder="拿起手机立即参加活动，各种精美礼品免费送，快来领取吧！"
          ></el-input>
        </div>
      </li>
      <li class="info-col">
        <div>
          <span class="lable">分享增加次数：</span>
        </div>
        <div class="row1">
          <el-checkbox v-model="form.isShareAdd">开启</el-checkbox>
        </div>
      </li>
      <li class="info-col">
        <div class="share-tip">
          <el-row :gutter="5">
            <el-col :span="8.5" class="share-text">
              <span>活动期间每天首次分享给好友或朋友圈，当天额外获得</span>
            </el-col>
            <el-col :span="3">
              <el-input type="number" min="1" v-model="form.shareCount"></el-input>
            </el-col>
            <el-col :span="4.5">
              <span class="share-text">次机会</span>
            </el-col>
          </el-row>
        </div>
      </li>
      <li class="info-col">
        <div>
          <span class="lable">引导关注：</span>
        </div>
        <div class="row3">
          <el-checkbox v-model="form.isLeadConcern">开启</el-checkbox>
          <span class="share-example" @click="showExample" v-show="form.isLeadConcern">查看示例</span>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content" class="risk-text">
              开启后有被微信拉黑朋友圈的风险（即
              <br />玩家分享朋友圈时仅自己可见），甚至
              <br />有被微信封停公众号一段时间的风险，
              <br />请谨慎使用！"
            </div>
            <el-button class="share-example risk">风险提示</el-button>
          </el-tooltip>
        </div>
      </li>
      <li class="info-col publicNumber">
        <div>
          <span class="lable">微信公众号：</span>
        </div>
        <!-- <div class="row1">
          <el-button size="small" type="primary">上传二维码</el-button>
        </div>-->
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
      </li>
    </ul>
    <div class="submit">
      <button @click="submitShareSet" :class="{'disable': isJmpGift==1}">提交</button>
    </div>
    <el-dialog title="效果展示" :visible.sync="centerDialogVisible" width="800px" center>
      <img src="~@/assets/images/super-mkt/guanzhu-zs.png" alt />
    </el-dialog>
  </div>
</template>
<script>
import user from '@/utils/user'
import { mapState } from 'vuex'
import {
  uploadBgImg,
  updateShare,
  queryShare,
  newUpdateShare
} from '@/api/super-mkt/activity-set/nine'
export default {
  data() {
    return {
      shareImg: [],
      centerDialogVisible: false,
      baseURL: process.env.VUE_APP_BASE_API,
      uploadHeaders: {
        ticket: user.serverUser.ticket,
        companyKey: user.serverUser.account.companyKey,
        accountId: user.serverUser.account.accountId
      },
      shareIcon:
        'http://www.jqzjop.com/ftp_images/01/null/41aab44780794388.jpg',
      form: {
        isShareAdd: false, // 分享增加次数是否开启
        shareCount: 1,
        channel: false,
        activeId: '',
        isShare: '0',
        repeatReminder: '',
        shareImg: '', // 图片路径
        shareTitle: '', // 分享标题
        shareContent: '' // 分享内容
      },
      fileList: [
        {
          name: '微信分享图标',
          url: 'http://www.jqzjop.com/ftp_images/01/null/5d4bf5bdd78c4fce.jpg'
        },
        {
          name: '暂未上传微信公众号',
          url: ''
        }
      ]
    }
  },
  created() {
    this._queryShare()
  },
  computed: {
    ...mapState({
      singleActiveData: state => state.nines.singleActiveData,
      isJmpGift: state => state.nines.isJmpGift
    })
  },
  methods: {
    showExample() {
      this.centerDialogVisible = true
    },
    async _queryShare(options = { activeId: this.$route.query.id }) {
      const { data } = await queryShare(options)
      console.log('分享数据', data)
      if (data) {
        // 原来的上个版本条件为 data.activeId
        const obj = this.form
        this.form = Object.assign(obj, data)
        this.form.isShareAdd = Number(data.isShareAdd) === 1 ? true : false
        this.form.isLeadConcern =
          Number(data.isLeadConcern) === 1 ? true : false

        if (String(data.isShareAdd) === '1') {
          this.isShareAdd = true
        } else {
          this.isShareAdd = false
        }

        this.fileList[0].url = this.form.shareImg
        this.fileList[1].url = this.form.publicAccount
        this.fileList[1].name = '微信公众号展示图'
      }
    },
    beforeAvatarUpload(file) {
      const reg = /\.(jpg|jpeg|png|JPG|PNG)$/
      const isJPG = !reg.test(file.type)
      const isLt2KB = file.size / 1024 < 30
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2KB) {
        this.$message.error('上传 活动主题图 大小不能超过 30kB!')
      }
      // return isJPG && isLt2M;
      return isLt2KB
    },
    // 图片上传
    uploadImg(res) {
      const { file } = res
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alias', 'market')
      uploadBgImg(formData)
        .then(res => {
          const { data, code, msg } = res
          if (code == 0) {
            const { data } = res
            this.shareImg[0].utl = res.data[0]
            this.form.shareImg = data[0]
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'warning'
          })
        })
    },
    UploadImgSuccess(res, file) {
      const { data, code, msg } = res
      if (code == 0) {
        this.shareImg[0].utl = res.data[0]
        this.form.shareImg = data[0]
      } else {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    },
    _Alert(msg, title) {
      // 提示框
      this.$alert(msg, title, {
        confirmButtonText: '确定',
        callback: action => {
          return
        }
      })
    },
    // 上传二维码
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
    submitShareSet() {
      console.log(this.form.isShare)
      if (this.isJmpGift == 1) {
        return false
      } else {
        const isShare = Number(this.form.isShare)

        if (isShare === 0 && this.form.shareTitle == '') {
          this._Alert('分享标题不能为空！', '分享标题')
          return false
        }
        if (isShare === 0 && this.form.shareImg == '') {
          this._Alert('请上传分享图标！', '分享图标')
          return false
        }

        const { id } = this.$route.query
        console.log(this.form, '怎么比返回的数据多很多呢？？？')
        const body = Object.assign({}, this.form)
        const isShareAdd = body.isShareAdd
        const isLeadConcern = body.isLeadConcern

        body.activeId = id // 因为返回没有 id 无法提交
        body.isShareAdd = isShareAdd === true ? '1' : '0' // 开启分享增加次数
        body.isLeadConcern = isLeadConcern === true ? '1' : '0' // 引导关注

        console.log(body)
        newUpdateShare(body)
          .then(res => {
            this.$message.success(res.msg)
          })
          .catch(err => {
            this.$message.error(err)
          })
        // updateShare(body)
        //   .then(res => {
        //     this.$message.success(res.msg)
        //   })
        //   .catch(err => {
        //     this.$message.error(err)
        //   })
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (!this.singleActiveData.id) {
      this.$router.push('/super-mkt/activity-set/activity-type/nine/home')
    } else {
      // this.form = Object.assign(this.form, this.singleActiveData) // 这个地方会更新一些
      this.form.activeId = this.singleActiveData.id
      this.shareImg.push({
        name: '分享图标',
        url:
          this.form && this.form.shareImg ? this.form.shareImg : this.shareIcon
      })
      if (this.singleActiveData && !this.singleActiveData.shareImg) {
        this.form.shareImg = this.shareIcon
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.ShareSet {
  .From-tab {
    padding: 0;

    .info-col {
      flex: 1;
      display: flex;
      justify-content: left;
      align-items: center;
      margin: 25px 0;
      position: relative;

      .share-example {
        color: #409eff;
        font-size: 14px;
        margin: 0 15px;
        text-decoration: underline;
        cursor: pointer;
      }

      .risk {
        border: none;
      }

      .risk-text {
        font-size: 14px;
        color: #999999;
      }

      .risk:hover {
        background-color: #ffffff;
      }

      .row2 {
        padding: 0;
        font-size: 14px;

        .el-upload__tip {
          margin-left: 20px;
        }

        .share-title {
          width: 356px;
          height: 38px;
          border: solid 1px #dcdfe6;
          padding-left: 15px;
          border-radius: 5px;
        }
      }
    }

    .publicNumber {
      display: flex;
      align-items: flex-start;
    }

    .share-tip {
      margin-left: 110px;
      vertical-align: middle;
    }
    .share-text {
      height: 44px;
      line-height: 44px;
    }
  }
  .submit {
    background: #f5f7fa;
    text-align: center;
    width: 100%;
    padding: 8px 0;
    margin-top: 45px;

    & > button {
      width: 98px;
      height: 40px;
      background: #409eff;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
      border: none;
    }
    .disable {
      background: #ddd;
    }
  }
}

.ShareSet input::-webkit-input-placeholder {
  color: #c0c4cc;
}
</style>

