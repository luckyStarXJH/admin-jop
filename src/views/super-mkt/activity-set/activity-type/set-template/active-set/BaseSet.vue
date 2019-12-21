<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="130px" labelPosition="left">
      <el-form-item label="活动主题图：">
        <el-col :span="8">
          <el-upload
            :headers="uploadHeaders"
            :before-upload="checkPicture"
            :on-success="uploadPicSuccess"
            :file-list="form.fileList"
            :action="baseURL+'\/jop-marketing-web\/market\/upload'"
            list-type="picture"
          >
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">750px*300px，小于100KB</div>
          </el-upload>
        </el-col>
      </el-form-item>
      <el-form-item label="活动标题：">{{form.activityName}}</el-form-item>
      <el-form-item label="活动副标题：">
        <el-col :span="6">
          <el-input v-model="form.activeTheme"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间：" prop="dateValue">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="form.dateValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="活动状态：">
        <el-radio-group v-model="form.isPaused">
          <el-radio label="0">开启活动</el-radio>
          <el-radio label="1">关闭活动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="可参与用户：">
        <el-radio-group v-model="form.isMember">
          <el-radio label="0">所有用户</el-radio>
          <el-radio label="1">仅限会员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <li class="degree" v-show="form.isMember === '1'" style="listStyle:none">
          <el-checkbox-group v-model="checkList">
            <el-checkbox v-for="item in form.memberGrade" :label="item" :key="item"></el-checkbox>
          </el-checkbox-group>
        </li>
      </el-form-item>

      <el-form-item label="消耗积分：" v-if="form.isMember === '0'">
        <el-row :gutter="20">
          <el-col :span="2.5">
            <span>每次抽奖将消耗</span>
          </el-col>
          <el-col :span="3">
            <el-input v-model="form.consumeIntegral"></el-input>
          </el-col>
          <el-col :span="12">
            <span>积分</span>
            <span>（不填则抽奖不消耗积分）</span>
            <span style="color:red;">仅限选择会员参与才生效</span>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="总参与次数：">
        <el-radio-group class="row2" v-model="form.isNum">
          <el-radio label="1">
            活动期间可参数总次数
            <input
              type="number"
              min="0"
              @input="inputFun"
              class="RateNum num-input diy-input"
              data-type="totalNum"
              v-model="form.totalNum"
            />次
          </el-radio>
          <el-radio label="0">不限制总次数</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="每天参与次数：">
        <div class="row2">
          <span class="lable">每天可抽奖</span>
          <input class="diy-input" type="number" min="1" v-model="form.participateNum" />
          <span class="lable">次</span>
          <span class="tip">（每天参与次数不能大于总参与次数）</span>
        </div>
      </el-form-item>

      <el-form-item label="中奖次数限制：">
        <div class="row1">
          <span class="lable">每人最多可中奖</span>
          <input class="diy-input" type="number" min="1" v-model="form.maxWinning" />
          <span class="lable">次</span>
          <span class="tip">（请输入≥的整数倍）</span>
        </div>
      </el-form-item>

      <!-- <el-form-item label="参与次数限制：">
        <el-row :gutter="20">
          <div class="info-col">
            <div class="row2">
              <el-radio v-model="form.isNum" label="0">每天可抽奖</el-radio>
              <input
                type="number"
                class="RateNum num-input"
                @input="inputFun"
                data-type="participateNum"
                v-model="form.participateNum"
              />次
              <el-radio v-model="form.isNum" label="2">活动期间可参与总次数</el-radio>
              <input
                type="number"
                min="0"
                @input="inputFun"
                class="RateNum num-input"
                data-type="totalNum"
                v-model="form.totalNum"
              />次
              <el-radio v-model="form.isNum" label="1" class="rg-radio" @change="Nolimit">不限制参与次数</el-radio>
            </div>
          </div>
      </el-row>-->
      <!-- <el-row :gutter="20">
          <el-col :span="4">
            <el-input
              v-model="form.participateNum"
              :disabled="form.isNum === '1' ? true : false"
              placeholder="每天可抽奖（次）"
            ></el-input>
          </el-col>
          <el-checkbox v-model="form.isNum" true-label="1" false-label="0">不限制参与次数</el-checkbox>
      </el-row>-->
      <!-- </el-form-item> -->
      <el-form-item label="售后设置：">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="form.serviceAddr" placeholder="请输入售后服务地址"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.servicePhone" placeholder="请输入售后服务电话"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="活动规则：" required>
        <WangEditor ref="editor"></WangEditor>
      </el-form-item>
      <el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryMemberGrade } from '@/api/super-mkt/spread-set/set-plan'
import user from '@/utils/user'
import WangEditor from '@/components/WangEditor'
export default {
  computed: {
    initDataFuncObj() {
      return { ...this.getDataFunc }
    }
  },
  props: {
    getDataFunc: {
      type: Object
    }
  },
  components: {
    WangEditor
  },
  watch: {
    'form.isNum'(flag) {
      if (flag === '1') {
        // this.form.participateNum = 0
      }
    }
  },
  data() {
    return {
      rules: {
        participateNum: [
          { required: true, message: '参与次数不能为空！', trigger: 'blur' }
        ],
        dateValue: [
          {
            required: true,
            message: '日期不能为空',
            trigger: 'change'
          }
        ]
      },
      baseURL: VUE_APP_BASE_API,
      uploadHeaders: {
        ticket: user.serverUser.ticket,
        companyKey: user.serverUser.account.companyKey,
        accountId: user.serverUser.account.accountId
      },
      checkList: [], // 选中会员
      form: {
        id: '',
        jmpId: 130,
        dateValue: [],
        activeTheme: '', // 副标题
        imgName: '', // 广告图
        activityName: '红包大抽奖，大奖等着您',
        subName: '新人专享好礼，最大888元红包',
        beginTime: '', // 开始日期
        endTime: '', // 结束日期
        isPaused: '1', // 活动状态
        isMember: '1', // 可参与用户值
        consumeIntegral: 0, // 消耗积分值
        participateNum: '', // 每天可抽奖次数
        isNum: 1, // 是否限制游戏次数
        serviceAddr: '', // 地址
        servicePhone: '', // 号码
        rule: '', // 活动规则
        memberGrade: [], // 会员等级
        dayCount: 1, // 每天可抽奖次数
        totalNum: 1, // 总参与次数
        maxWinning: 1, // 每人最多可中奖次数
        fileList: [
          {
            name: '默认主题图',
            url: 'http://www.jqzjop.com/ftp_images/01/null/9b8b5af480ce4d22.jpg'
          }
        ]
      }
    }
  },
  created() {
    const { id } = this.$route.query
    const options = {
      activeId: id
    }
    this.getQueryMemberGrade(options)
  },
  mounted() {
    this._getActiveSet()
  },
  methods: {
    _Alert(msg, title) {
      // 提示框
      this.$alert(msg, title, {
        confirmButtonText: '确定',
        callback: action => {
          return
        }
      })
    },
    getQueryMemberGrade(data) {
      queryMemberGrade(data).then(res => {
        const data = res.data
        this.form.memberGrade = data
      })
    },
    async onSubmit() {
      const flag = Number(this.form.isNum)
      const totalNum = Number(this.form.totalNum)
      const participateNum = Number(this.form.participateNum)
      const maxWinning = Number(this.form.maxWinning)
      const isMember = Number(this.form.isMember)
      const checkList = this.checkList

      const titleDay = '每天参与次数'
      const titleTotal = '每天参与次数不能超过总参与次数'
      const titleCount = '最大中奖次数'
      const titleMaxWin = '最大中奖次数不能超过总参与次数'
      const selectMem = '请选中参与活动的会员等级'
      const titleMem = '可参与用户'

      if (isMember === 1 && checkList.length === 0) {
        this._Alert(selectMem, titleMem)
        return
      }

      if (flag === 1 && participateNum > totalNum) {
        this._Alert(titleTotal, titleDay)
        return
      }

      if (flag === 1 && maxWinning > totalNum) {
        this._Alert(titleMaxWin, titleCount)
        return
      }

      if (flag === 0 && maxWinning > participateNum) {
        this._Alert(titleMaxWin, titleCount)
        return
      }

      if (await this._checkForm()) {
        this.form.beginTime = this.form.dateValue[0]
        this.form.endTime = this.form.dateValue[1]
        this.form.imgName = this.form.fileList[0].url

        const body = Object.assign({}, this.form)
        body.grade = this.checkList.join(',')

        try {
          const { code, msg } = await this.initDataFuncObj.basicUpdate(body)
          this.$message.success(msg)
          this._getActiveSet()

          return
        } catch (error) {
          // this._getActiveSet()
          return
        }
      }

      this.$message.error('校验失败，请检查是否未填写必填项！')
    },
    Nolimit() {
      // 参与次数限制
      this.form.participateNum = ''
    },
    inputFun(e) {
      // 此方法校验输入框
      const input = e.target
      const Val = input.value
      const reg = /(^[0-9]+$)|(^\s*$)/
      const That = input.getAttribute('data-type')
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = ''
      }
      this.timer = setTimeout(() => {
        if (!reg.test(Val)) {
          input.value = ''
        }
      }, 500)
    },
    _checkForm() {
      return new Promise((resolve, reject) => {
        const isEditorEmpty = this.$refs.editor.getContentText()
        this.$refs.form
          .validate(valid => {
            if (valid && isEditorEmpty) {
              this.form.rule = this.$refs.editor.getContent()
              resolve(true)
            } else {
              resolve(false)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    uploadPicSuccess(response, file, fileList) {
      const { data } = response
      this.form.fileList = [fileList[fileList.length - 1]]
      this.form.fileList[0].url = data[0]
    },
    checkPicture(res) {
      const isJPG = res.type.startsWith('image')
      const isLt2KB = res.size / 1024 < 120
      if (!isLt2KB || !isJPG) {
        this.$message.error('上传的活动主题图不符合规范！')
        return false
      }
      return true
    },
    async _getActiveSet(options = { activeId: this.$route.query.id }) {
      try {
        const { data } = await this.initDataFuncObj.queryActive(options)

        this.form = Object.assign(this.form, data)
        this.checkList = data.grade ? data.grade.split(',') : []
        this.form.isNum = data.isNum ? String(data.isNum) : '1'
        this.form.totalNum = data.totalNum ? Number(data.totalNum) : 1
        this.form.participateNum = data.participateNum
          ? Number(data.participateNum)
          : 1
        this.form.maxWinning = data.maxWinning ? Number(data.maxWinning) : 1

        if (data.beginTime && data.endTime) {
          data.dateValue = [data.beginTime, data.endTime]
        } else {
          data.dateValue = []
        }
        if (data.imgName) {
          this.form.fileList = [
            {
              name: '',
              url: data.imgName
            }
          ]
        }
        Object.assign(this.form, data)
        this.$emit('initBaseSetData', this.form)
        // 填充富文本内容
        this.$refs.editor.setContent(this.form.rule)
      } catch (error) {
        this.$message({
          type: 'error',
          message: error
        })
        console.log('TCL: _getActiveSet -> error', error)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.degree {
  width: 721px;
  height: 45px;
  line-height: 45px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding-left: 20px;
}

.tip {
  font-size: 12px;
  color: #999;
}

.diy-input {
  width: 74px;
  height: 38px;
  border-radius: 5px;
  border: solid 1px #dcdfe6;
  margin: 0 5px;
  outline: none;
  text-align: center;
}

.lable {
  width: 110px;
  text-align: right;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  line-height: 40px;
  letter-spacing: 1px;
  color: #606266;
  min-width: 90px;
}

.info-col {
  flex: 1;
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 25px 0;
  position: relative;

  .row2 {
    padding: 0;

    .el-upload__tip {
      margin-left: 20px;
    }

    .el-radio {
      margin-right: 5px;

      &:not(:first-of-type) {
        margin-left: 20px;
      }
    }

    .num-input {
      width: 74px;
      height: 38px;
      border-radius: 5px;
      border: solid 1px #dcdfe6;
      margin: 0 5px;
      outline: none;
      text-align: center;
    }

    .concatInput {
      width: 255px;
      height: 40px;
      border-radius: 5px;
      border: solid 1px #dcdfe6;
      margin-right: 20px;
      padding-left: 15px;
    }

    .subNamebox {
      width: 255px;
      height: 40px;
      outline: none;
      border: none;
      border-bottom: solid 1px #ddd;
      margin-right: 20px;
      padding-left: 15px;
    }
  }
  .bannerImg {
    width: 200px;
    height: 94px;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
