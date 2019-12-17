<template>
  <div class="ShareSet">
    <ul class="From-tab">
      <li class="info-col">
        <span class="lable">是否关闭分享：</span>
        <div class="row2">
          <el-radio v-model="form.isShare" label="0">开启分享</el-radio>
          <el-radio v-model="form.isShare" label="1">关闭分享</el-radio>
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
            :file-list="shareImg"
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
      <li class="info-col">
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
    </ul>
    <div class="submit">
      <button @click="submitShareSet" :class="{'disable': isJmpGift==1}">提交</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { uploadBgImg, updateShare } from '@/api/super-mkt/activity-set/nine'
export default {
  data() {
    return {
      shareImg: [],
      shareIcon:
        'http://www.jqzjop.com/ftp_images/01/null/41aab44780794388.jpg',
      form: {
        activeId: '',
        isShare: '0',
        repeatReminder: '',
        shareImg: '', // 图片路径
        shareTitle: '', // 分享标题
        shareContent: '' // 分享内容
      }
    }
  },
  computed: {
    ...mapState({
      singleActiveData: state => state.nines.singleActiveData,
      isJmpGift: state => state.nines.isJmpGift
    })
  },
  methods: {
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
        .then((res) => {
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
    submitShareSet() {
      if (this.isJmpGift == 1) {
        return false
      } else {
        if (this.form.shareTitle == '') {
          this._Alert('分享标题不能为空！', '分享标题')
          return false
        }
        if (this.form.shareImg == '') {
          this._Alert('请上传分享图标！', '分享图标')
          return false
        }
        const body = this.form
        updateShare(body)
          .then((res) => {
            this.$message.success(res.msg)
          })
          .catch(err => {
            this.$message.error(err)
          })
      }
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    if (!this.singleActiveData.id) {
      this.$router.push('/super-mkt/activity-set/activity-type/nine/home')
    } else {
      this.form = Object.assign(this.form, this.singleActiveData)
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

