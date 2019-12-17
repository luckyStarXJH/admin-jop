<template>
  <article class="template-show">
    <el-tabs v-model="activeName">
      <el-tab-pane label="固定模板" name="1">
        <div class="template-select-img">
          <img src="~@/assets/images/super-crm/wx-quality-policy/small/small-1.png" alt="v-1">
          <div class="btn-border"></div>
          <span class="name">固定模板</span>
          <el-button class="select-btn" size="mini" @click="showImg(1)">预览</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自定义模板" name="2">
        <div class="template-info">
          <p>自定义模板说明：</p>
          <p>1. 实际效果图以客户最终确认的版式为准，以下模板仅供参考！</p>
        </div>
        <div class="template-select-img" v-for="item in 4" :key="item">
          <img :src="smallImgUrl(item + 1)" alt="v-1">
          <div class="btn-border"></div>
          <span class="name">固定模板</span>
          <el-button class="select-btn" size="mini" @click="showImg(item + 1)">预览</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>

    <section class="toast-box" v-if="imgShow">
      <div class="box-content">
        <div class="mask" @click="imgShow = false"></div>
        <div class="content">
          <div class="btn-icon" v-if="activeName === '2'">
            <div @click="frontOrBack(true)" :class="[isFront ? 'selected' : '']">正面</div>
            <div @click="frontOrBack(false)" :class="[!isFront ? 'selected' : '']">反面</div>
          </div>
          <img :src="showImgUrl" alt="big-img">
        </div>
        <div class="close-icon" @click="imgShow = false"><i class="el-icon-close"></i></div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

@Component({
})
export default class TemplateShow extends Vue {
  private activeName: string = '1';
  private imgShow: boolean = false;
  private showImgUrl: string = '';
  private isFront: boolean = true;
  private imgList = [
    require('@/assets/images/super-crm/wx-quality-policy/big/big-1.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-2-front.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-2-back.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-3-front.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-3-back.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-4-front.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-4-back.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-5-front.png'),
    require('@/assets/images/super-crm/wx-quality-policy/big/big-5-back.png')
  ];
  private imgIndex: number = -1;

  private smallImgUrl(index: number): string {
    return require(`@/assets/images/super-crm/wx-quality-policy/small/small-${index}.png`);
  }

  private frontOrBack(isFront: boolean) {
    this.isFront = isFront;
    this.showImg(this.imgIndex);
  }

  private showImg(index: number) {
    this.imgIndex = index;
    if (index < 2) {
      this.showImgUrl = this.imgList[0];
    } else {
      const n = this.isFront ? 2 * (index - 1) - 1 : 2 * (index - 1);
      this.showImgUrl = this.imgList[n];
    }
    this.imgShow = true;
  }
}
</script>

<style lang="scss" scoped>
.template-show {
  .template-info {
    // height: 100px;
    border-radius: 5px;
    border: solid 1px #409eff;
    background-color: #f5faff;
    padding: 12px;
    margin-bottom: 24px;
    p {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
    }
  }
  .template-select-img {
    display: inline-block;
    width: 250px;
    height: 186px;
    border-radius: 5px;
    border: solid 2px #dddddd;
    text-align: center;
    padding-top: 8px;
    margin-right: 20px;
    position: relative;
    cursor: pointer;
    font-size: 0;
    img {
      width: 230px;
      height: 134px;
    }
    .btn-border {
      border-top: 1px solid #dddddd;
      margin-top: 2px;
    }
    .name {
      position: absolute;
      bottom: 10px;
      left: 10px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #606266;
    }
    .select-btn {
      position: absolute;
      bottom: 5px;
      right: 5px;
    }
  }
  .toast-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 5000;
    .box-content {
      width: 100%;
      height: 100%;
      position: relative;
      .mask {
        position: absolute;
        z-index: 5005;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;
        opacity: .8;
      }
      .content {
        position: absolute;
        z-index: 5010;
        left: calc(50% - 500px);
        top: calc(50% - 310px);
        width: 1000px;
        height: 820px;
        // background-color: #ffffff;
        .btn-icon {
          position: absolute;
          z-index: 5011;
          top: -60px;
          left: 390px;
          display: flex;
          width: 220px;
          height: 44px;
          background-color: #ffffff;
          color: #409eff;
          border-radius: 5px;
          div {
            flex-basis: 50%;
            text-align: center;
            line-height: 44px;
            cursor: pointer;
          }
          div:hover {
            opacity: .85;
          }
          div:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          div:last-child {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .selected {
            background-color: #409eff;
            color: #ffffff;
          }
        }
        img {
          width: 100%;
          // height: 100%;
        }
      }
      .close-icon {
        position: absolute;
        z-index: 5011;
        right: 42px;
        top: 42px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: #000000;
        color: #ffffff;
        cursor: pointer;
        i {
          font-size: 48px;
        }
      }
    }
  }
}
</style>


