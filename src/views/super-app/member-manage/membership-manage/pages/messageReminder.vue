<template>
  <div class="message-reminder">
    <!-- 消息弹窗位置示意图 -->
    <div class="message-left">
      <p class="title">消息弹窗位置示意图</p>
      <img :src="img">
    </div>
    <!-- 消息提醒选择 -->
    <div class="message-right">
      <p class="title">消息提醒选择</p>
      <div class="message-checkbox">
        <el-checkbox-group v-model="checkList">
          <div class="message-div m-birthday-box">
            <el-checkbox label="会员生日提醒" class="m-birthday"></el-checkbox>
            <div class="message-date">
              <span class="message-span">设置提醒范围：</span>
              <el-input class="el-input-class" v-model="dateInput" @blur="chechNum"></el-input>
              <span class="message-span-s">（支持1-30天）</span>
            </div>
          </div>
          <div class="message-div">
            <el-checkbox label="今日定时消息任务提醒"></el-checkbox>
          </div>
          <div class="message-div">
            <el-checkbox label="今日新增潜客数量提醒"></el-checkbox>
          </div>
          <div class="message-div">
            <el-checkbox label="未处理消息数量提醒"></el-checkbox>
          </div>
          <div class="message-div">
            <el-checkbox label="会员跟进提醒"></el-checkbox>
          </div>
        </el-checkbox-group>
        <el-button type="primary" class="message-btn" @click="saveData">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {getCustomerResourceStatistics} from '@/api/common';

@Component({
})
export default class PoolCount extends Vue {
  private checkList: any = [];
  private dateInput: string = '';
  private img: any = require('@/assets/images/android/xxtx.png');
  @Watch('checkList')
  private checkChange() {
    console.log(this.checkList);
  }
   // 保存
  private saveData() {}
  // 检验生日设置的天数
  private chechNum() {
    const reg = /^([1-9]|[1-2][0-9]|[3][0]\d?)$/;
    if (this.dateInput === '') {
      return;
    }
    if (!reg.test(this.dateInput)) {
      this.$message.error('仅支持1-30天');
      this.dateInput = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.message-reminder {
  display: flex;
  font-family: MicrosoftYaHei;
  .message-left{
    width: 320px;
    .title{
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      color: #333;
      font-weight: bold;
      font-size: 16px;
    }
  }
  .message-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 30px;
    .title{
      color: #333;
      font-weight: bold;
    }
    .message-div{
      margin: 12px 0;
      height: 40px;
      .m-birthday{
        float: left;
      }
      .message-date{
        float: left;
        margin-left: 90px;
        .message-span{
          color: #606266;
        }
        .el-input-class{
          display: inline-block;
          width: 70px;
        }
        .message-span-s{
          font-size: 14px;
          color: #999;
        }
        .message-span{
          font-size: 14px;
        }
      }
    }
    .m-birthday-box{
      display: flex;
      align-items: center;
    }
    .m-birthday-box:after{
      display: block;
      content: '';
      clear: both;
    }
    .message-btn{
      padding: 12px 45px;
    }
  }
}
</style>


