<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-checkbox v-model="isShowPhoto" true-label="1" false-label="0">是否在规则页显示奖品介绍</el-checkbox>
      </el-col>
    </el-row>
    <div class="margin-line">
      <el-row type="flex" align="middle">
        <el-col :span="1.5"> 
          <p>奖品设置：</p>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="setGiftLine">添加奖品</el-button>
        </el-col>
        <el-col :span="20">
          <p>（奖品图片尺寸：250px*152px，小于50KB）中奖概率合计不能大于100%</p>
        </el-col>
      </el-row>
    </div>
    <el-row
      :gutter="15"
      type="flex"
      align="middle"
      v-for="(item,index) in giftList"
      :key="index"
      class="margin-line"
    >
      <el-col :span="1.5">
        <span>序号：</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="item.sequence"></el-input>
      </el-col>
      <el-col :span="2.5">
        <el-select v-model="item.jmpGiftCode" @change="selGift(item)">
          <el-option
            v-for="gift in options"
            :key="gift.id"
            :label="gift.shelfName"
            :value="gift.giftCode"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="2.5">
        <span>中奖概率</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="item.probability"></el-input>
      </el-col>
      <el-col :span="0.5">
        <span>%</span>
      </el-col>
      <el-col :span="0.5">
        <span>数量</span>
      </el-col>
      <el-col :span="2">
        <el-input v-model="item.giftNum" disabled></el-input>
      </el-col>
      <el-col :span="1.5">
        <div class="giftPic">
          <img :src="item.imgName" alt />
        </div>
      </el-col>
      <el-col :span="2.5">
        <el-upload
          :show-file-list="false"
          :headers="uploadHeaders"
          :on-success="(response, file) => {return uploadPicSuccessHandle(response, file, index)}"
          :action="baseURL+'\/jop-marketing-web\/market\/upload'"
        >
          <el-button type="primary">重新上传图片</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-minus" circle @click="deleteGift(index)"></el-button>
      </el-col>
    </el-row>
    <section class="btns">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </section>
  </div>
</template>

<script>
import user from '@/utils/user'
export default {
  computed: {
    initDataFuncObj() {
      return { ...this.getDataFunc }
    }
  },
  props: {
    lineSize: {
      type: Number,
      default: Infinity
    },
    getDataFunc: {
      type: Object
    }
  },
  created() {
    this._getGifts()
  },
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      uploadHeaders: {
        ticket: user.serverUser.ticket,
        companyKey: user.serverUser.account.companyKey,
        accountId: user.serverUser.account.accountId
      },
      isShowPhoto: '0',
      options: [],
      value: '',
      giftList: []
    }
  },
  methods: {
    setGiftLine() {
      const giftLineObj = {
        activeId: this.$route.query.id,
        companyKey: user.serverUser.account.companyKey,
        createTime: '',
        creator: '',
        expiration: '',
        giftNum: '',
        id: '',
        imgName: '',
        jmpGiftCode: '',
        margin: '',
        modify: '',
        modifyTime: '',
        probability: 0,
        productName: '',
        productType: '',
        sequence: this.giftList.length + 1,
        sign: '',
        sumProbability: ''
      }
      if (this.giftList.length < this.lineSize) {
        this.giftList.push(giftLineObj)
      } else {
        this.$notify.warning({
          title: '警告',
          message: `超过可允许添加奖品数量，奖品最多只能添加${this.lineSize}个！`
        })
        return
      }
    },
    selGift(gift) {
      console.log('这里是关键不方面')
      this.options.forEach(item => {
        if (gift.jmpGiftCode === item.giftCode) {
          gift.giftNum = item.giftNum
          gift.productName = item.shelfName
          gift.productType = item.shelfProductType
        }
      })
    },
    async onSubmit() {
      try {
        const gifts = {
          invalidImg:
            'http://www.jqzjop.com/ftp_images/01/market/f02d18e50ff54c2f.jpg',
          isShowPhoto: this.isShowPhoto,
          activeId: this.$route.query.id
        }
        gifts.activePros = this.giftList

        let result = 0
        if (this.giftList.length) {
          try {
            this.giftList.forEach((item, index) => {
              if (Number(item.probability) >= 0) {
                result += Number(item.probability)
              } else {
                throw new Error(
                  `请检查第${index + 1}行输入的中奖概率是否为数字！`
                )
              }

              if (!item.imgName) {
                throw new Error(`请检查第${index + 1}行是否有礼品图片！`)
              }
            })
          } catch (error) {
            this.$notify.warning({
              title: '校验失败',
              message: error.message
            })
            return
          }
        }

        if (
          this.giftList.length === this.lineSize &&
          !(this.lineSize === Infinity)
        ) {
          if (result < 100) {
            this.$notify.warning({
              title: '校验失败',
              message: '所有的中奖概率需要设置为100%，请修改后再试！'
            })
            return
          }
        }

        if (result > 100) {
          this.$notify.warning({
            title: '校验失败',
            message: '所有的中奖概率不能大于100%，请修改后再试！'
          })
          return
        }

        console.log(gifts, '这里获得传递值')

        const { code, msg } = await this.initDataFuncObj.productsSave(gifts)
        if (code === 0) {
          this.$message.success(msg)
          this._getGifts()
        }
      } catch (error) {
        console.log('TCL: onSubmit -> error', error)
        this._getGifts()
      }
    },
    uploadPicSuccessHandle(response, file, index) {
      const { code, data } = response
      if (code === '0' && data.length) {
        this.giftList[index].imgName = data[0]
      }
    },
    deleteGift(index) {
      this.giftList.splice(index, 1)
    },
    async _getGifts(
      options = {
        activityName: this.$route.query.name,
        activeId: this.$route.query.id
      }
    ) {
      const { data: giftList } = await this.initDataFuncObj.queryProducts(
        options
      )
      this.giftList = giftList.activePros
      this.isShowPhoto = giftList.isShowPhoto

      const { data } = await this.initDataFuncObj.queryActiveAndJmpGift(options)
      this.giftList.forEach(item1 => {
        data.forEach(item2 => {
          if (item1.jmpGiftCode === item2.giftCode) {
            item1.giftNum = item2.giftNum
          }
        })
      })

      this.$emit('initGiftList', this.giftList)

      this.options = data
    }
  }
}
</script>

<style lang='scss' scoped>
.margin-line {
  margin: 15px 0;
}
.giftPic {
  width: 50px;
  height: 50px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
