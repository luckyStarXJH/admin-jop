<template>
  <div class="operation">
    <!-- 聊天功能位置示意图 -->
    <div class="message-left">
      <p class="title">聊天功能位置示意图</p>
      <img :src="img">
    </div>
    <!-- 聊天功能开关 -->
    <div class="message-right">
      <div class="title">聊天功能开关<span>功能开关统一管理。关闭后，所有APP账号均不可使用。单独控制请使用<a href class="operation-go">系统设置-账号管理</a></span></div>
      <div class="opertion-content">
        <div class="content-item">
          <p class="content-title">敏感信息设置</p>
          <el-checkbox label="拨打电话功能" v-model="checkList.phone"></el-checkbox>
          <el-checkbox label="查看消费记录" v-model="checkList.selectConsumeRecord"></el-checkbox>
        </div>

        <div class="content-item">
          <p class="content-title">赠送操作设置</p>
          <div class="check-div">
            <el-checkbox label="赠送积分" v-model="checkList.giveIntegral"></el-checkbox>
            <div class="check-setting">
              <span class="check-tip">设置每个账号每月可赠送积分限额：</span>
              <el-input class="el-input-class"  v-model="checkList.giveIntegralLimit" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
            </div>
          </div>
          <div class="check-div">
            <el-checkbox label="赠送优惠券" v-model="checkList.giveCoupon"></el-checkbox>
            <div class="check-setting">
              <span class="check-tip">设置每个账号每月可赠送优惠券张数：</span>
              <el-input class="el-input-class" v-model="checkList.giveCouponNum" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"></el-input>
            </div>
          </div>   
        </div>

        <div class="content-item">
          <p class="content-title">其他操作</p>
            <el-checkbox label="发送短信" v-model="checkList.sendSms"></el-checkbox>
            <el-checkbox label="邀请评价" v-model="checkList.inviteReviews"></el-checkbox>
            <el-checkbox label="添加标签" v-model="checkList.addFlag"></el-checkbox>
            <el-checkbox label="跟进记录" v-model="checkList.followRecord"></el-checkbox>
        </div>

        <div class="title">批量功能开关</div>
        <div class="content-item">
          <p class="content-title">发送消息</p>
          <el-checkbox label="批量发送微信模板消息" v-model="checkList.sendWxTemplateByBatch"></el-checkbox>
          <el-checkbox label="批量发送短信消息" v-model="checkList.sendSmsByBatch"></el-checkbox>
        </div> 
        <el-button type="primary" class="message-btn" @click="setSave">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { getMemberOperatSetInfo, patchMemberOperatSetInfo } from '@/api/system-set';

@Component({
})
export default class PoolCount extends Vue {
  private checkList = {
    phone: false,
    selectConsumeRecord: false,
    giveIntegral: false,
    giveIntegralLimit: '',
    giveCouponNum: '',
    giveCoupon: false,
    sendSms: false,
    inviteReviews: false,
    addFlag: false,
    followRecord: false,
    sendWxTemplateByBatch: false,
    sendSmsByBatch: false
  };
  private dateInput: string = '';
  private img: any = require('@/assets/images/android/czgn.png');
  private mounted() {
    // 查询
    this.getSetInfo();
  }
  // 查询
  private getSetInfo() {
    getMemberOperatSetInfo().then((res: any) => {
      if (res.code === 0) {
        if (res.data) {
          this.checkList = res.data;
        }
      } else {
        this.$message.error(res.msg);
      }
    })
  }
  // 保存
  private setSave() {
    const params = this.checkList;
    patchMemberOperatSetInfo(params).then((res: any) => {
      if (res.code === 0) {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      } else {
        this.$message.error(res.msg);
      }
    })
  }
}
</script>

<style lang="scss">
.operation {
  display: flex;
  font-size: 14px;
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
    .message-btn{
      padding: 12px 45px;
    }
    .title{
      color: #333;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      span{
        font-size: 12px;
        color: #999;
        font-weight: 400;
        padding-left: 4px;
      }
      .operation-go{
        color: #409eff;
        font-size: 12px;
        text-decoration: underline;
      }
    }
    .opertion-content{
      .content-item{
        margin-bottom: 22px;
        .content-title{
          padding: 8px;
          background: #f9f9f9;
          color: #606266;
          margin-bottom: 14px;
          font-size: 14px;
        }
        .check-div{
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          .el-checkbox{
            min-width: 93px;
          }
          .check-setting{
            display: flex;
            align-items: center;
            width: 420px;
            justify-content: flex-end;
            .check-tip{
              font-size: 14px;
            }
            .el-input-class{
              width: 80px;
              input{
                text-align: center;
              }
            }
          }
        }
      }
      
    }
  }
}
</style>


