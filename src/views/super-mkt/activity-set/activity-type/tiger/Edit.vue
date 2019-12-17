<template>
  <div class="settings">
    <div class="view-mobile">
      <section class="content">
        <h6 class="title">{{baseSetPageData.activeTheme}}</h6>
        <section class="banner">
          <img v-if="baseSetPageData.imgName" :src="baseSetPageData.imgName" alt />
          <img v-else src="~@/assets/images/super-mkt/banner.jpg" alt />
        </section>
        <section class="game-time" v-if="baseSetPageData.beginTime">
          <p>活动时间：{{baseSetPageData.beginTime.split(' ')[0]}} 至 {{baseSetPageData.endTime.split(' ')[0]}}</p>
        </section> 
        <section class="game-time chance">
          <p>
            今日还有{{baseSetPageData.participateNum}}次抽奖机会
            <span
              v-if="baseSetPageData.isMember === '1'"
            >（每次消耗{{baseSetPageData.consumeIntegral}}积分）</span>
          </p>
        </section>
      </section>
    </div>
    <div class="set-warp">
      <el-tabs v-model="tabname">
        <el-tab-pane label="基本设置" name="first">
          <BaseSetPage :getDataFunc="getBaseSetDataFuncObj" @initBaseSetData="getBaseSetPageData"></BaseSetPage>
        </el-tab-pane>
        <el-tab-pane label="奖品设置" name="second">
          <GiftSetPage :getDataFunc="getGiftSetDataFuncObj"></GiftSetPage>
        </el-tab-pane>
        <el-tab-pane label="门店设置" name="third">
          <ShopSetPage :getDataFunc="getShopSetDataFuncObj"></ShopSetPage>
        </el-tab-pane>
        <el-tab-pane label="分享设置" name="fourth">
          <ShareSetPage></ShareSetPage>
        </el-tab-pane>
        <el-tab-pane label="营销推广" name="five">
          <SpreadSetPage :getDataFunc="getSpreadSetDataFuncObj"></SpreadSetPage>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  basicUpdate,
  queryActive,
  queryProducts,
  productsSave,
  queryActiveAndJmpGift,
  queryShopList,
  updateShops,
  updateScheme
} from '@/api/super-mkt/activity-set/tiger'
import BaseSetPage from '../set-template/active-set/BaseSet'
import GiftSetPage from '../set-template/active-set/GiftSet'
import ShopSetPage from '../set-template/active-set/ShopSet'
import ShareSetPage from '../set-template/active-set/ShareSet'
import SpreadSetPage from '../set-template/active-set/Spread'
export default {
  components: {
    BaseSetPage,
    GiftSetPage,
    ShopSetPage,
    ShareSetPage,
    SpreadSetPage
  },
  methods: {
    getBaseSetPageData(data) {
      this.baseSetPageData = data
      console.log('TCL: getBaseSetPageData -> data', data)
    }
  },
  data() {
    return {
      baseSetPageData: {},
      getSpreadSetDataFuncObj: {
        queryActive,
        updateScheme
      },
      getBaseSetDataFuncObj: {
        basicUpdate,
        queryActive
      },
      getGiftSetDataFuncObj: {
        queryProducts,
        productsSave,
        queryActiveAndJmpGift
      },
      getShopSetDataFuncObj: {
        queryShopList,
        updateShops
      },
      tabname: 'first'
    }
  }
}
</script>

<style lang='scss' scoped>
.settings {
  #iframe {
    width: 100%;
    height: 100%;
  }
  display: flex;
  .view-mobile {
    flex-shrink: 0;
    width: 320px;
    height: 640px;
    background: url('~@/assets/images/super-crm/mine/test-phone.png') no-repeat
      top center/100%;
    .content {
      width: 320px;
      height: 663px;
      background: url('~@/assets/images/super-mkt/lhj-bg.png') no-repeat top
        center/100%;

      .title {
        height: 38px;
        line-height: 38px;
        text-align: center;
      }
      .banner {
        width: 320px;
        height: 125px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .game-time {
        margin-top: 20px;
        font-size: 14px;
        color: #fe4c00;
        text-align: center;
      }
      .chance {
        font-size: 12px;
        color: #fff;
        padding-left: 12px;
        margin-top: 145px;
      }
    }
  }
  .set-warp {
    margin-left: 20px;
    width: 100%;
  }
}
</style>
