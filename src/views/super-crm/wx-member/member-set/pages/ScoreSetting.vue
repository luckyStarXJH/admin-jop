<template>
  <article class="score-setting">
    <el-form ref="form" class="form-content" :model="scoreSetting">
      <el-checkbox v-model="isAbleScore" :true-label="'1'" :false-label="'0'" class="score-item">显示可用积分</el-checkbox>
      <el-checkbox v-model="isTotalScore" :true-label="'1'" :false-label="'0'" class="score-item">显示累计积分</el-checkbox>
      <header class="form-header">赠送积分设置<span>(0为不赠送)</span></header>
      <el-form-item label="首次登录送积分" style="width:554px">
        <el-input v-model="scoreSetting.loginScore"></el-input>
      </el-form-item>
      <el-form-item label="首次微商城消费送积分" style="width:554px">
        <el-input v-model="scoreSetting.firstPayScore"></el-input>
      </el-form-item>
      <el-form-item label="注册会员送积分" style="width:554px">
        <el-input v-model="scoreSetting.registScore"></el-input>
      </el-form-item>
      <el-form-item label="完善会员资料送积分" style="width:554px">
        <el-input v-model="scoreSetting.modifyScore"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span=".5"><el-checkbox v-model="scoreSetting.isRemind" true-label="1" false-label="0"></el-checkbox></el-col>
          <el-col :span="5.5">在微会员首页弹出完善资料提醒，每隔</el-col>
          <el-col :span="3">
            <!-- <el-input v-model="scoreSetting.intervalDay"></el-input> -->
            <el-input-number v-model="scoreSetting.intervalDay" :precision="0" size="small" controls-position="right" :min="1" :max="100"></el-input-number>
          </el-col>
          <el-col :span="15">天弹出1次。<span style="color:#999999">( 1.提醒未填写姓名、性别及生日资料的会员完善信息，2.请输入不小于1的整数 )</span></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="会员邀请好友注册送积分" style="width:554px">
        <el-input v-model="scoreSetting.inviteScore"></el-input>
      </el-form-item>
      <el-form-item label="电子质保单评价送积分" style="width:554px">
        <el-input v-model="scoreSetting.assessScore"></el-input>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          每日签到赠送积分
          <el-checkbox class="form-item-check" v-model="isAddtotal" :true-label="'1'" :false-label="'0'">加入累计积分</el-checkbox>
        </div>
        <el-input v-model="scoreSetting.score"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="setScoreSetting">保存</el-button>
      </el-form-item>
    </el-form>
  </article>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { getScoreSetting, setScoreSetting } from '@/api/super-crm/wx-member';

@Component({
})
export default class HomeModule extends Vue {
  private scoreSetting = {
    loginScore: '',
    firstPayScore: '',
    registScore: '',
    modifyScore: '',
    inviteScore: '',
    assessScore: '',
    score: '',
    isRemind: '0',
    intervalDay: ''
  }
  private isAbleScore: string = '0';
  private isTotalScore: string = '0';
  private isAddtotal: string = '0';

  private mounted() {
    this.getScoreSetting();
  }

  private getScoreSetting() {
    getScoreSetting().then(res => {
      this.scoreSetting.loginScore = res.data.loginScore || '';
      this.scoreSetting.firstPayScore = res.data.firstPayScore || '';
      this.scoreSetting.registScore = res.data.registScore || '';
      this.scoreSetting.modifyScore = res.data.modifyScore || '';
      this.scoreSetting.inviteScore = res.data.inviteScore || '';
      this.scoreSetting.assessScore = res.data.assessScore || '';
      this.scoreSetting.isRemind = res.data.isRemind || '0';
      this.scoreSetting.intervalDay = res.data.intervalDay || '';
      this.scoreSetting.score = res.data.score || '';
      this.isAbleScore = res.data.isAbleScore || '0';
      this.isTotalScore = res.data.isTotalScore || '0';
      this.isAddtotal = res.data.isAddtotal || '0';
    })
  }

  private setScoreSetting() {
    if (this.scoreSetting.isRemind === '1' && !this.scoreSetting.intervalDay) {
      this.$message({
        message: '请输入弹窗间隔！',
        type: 'info'
      });
      return;
    }
    const params = {
      loginScore: this.scoreSetting.loginScore || '0',
      firstPayScore: this.scoreSetting.firstPayScore || '0',
      registScore: this.scoreSetting.registScore || '0',
      modifyScore: this.scoreSetting.modifyScore || '0',
      inviteScore: this.scoreSetting.inviteScore || '0',
      assessScore: this.scoreSetting.assessScore || '0',
      isRemind: this.scoreSetting.isRemind || '0',
      intervalDay: this.scoreSetting.intervalDay || '',
      score: this.scoreSetting.score || '0',
      isAbleScore: this.isAbleScore,
      isTotalScore: this.isTotalScore,
      isAddtotal: this.isAddtotal
    }
    setScoreSetting(params).then(res => {
      this.$message({
        message: '保存成功！',
        type: 'success'
      });
    })
  }
}
</script>

<style lang="scss" scoped>
.score-setting {
  height: calc(100vh - 190px);
  overflow: auto;
  .form-content {
    max-width: 1200px;
    min-width: 1200px;
    .score-item {
      width: 210px;
      padding: 18px 0;
    }
    .form-header {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      span {
        font-size: 14px;
        font-weight: normal;
        color: #999999;
        padding-left: 12px;
      }
    }
    .form-item-check {
      margin-left: 12px;
      font-family: MicrosoftYaHei;
      font-size: 12px;
      color: #606266;
    }
  }
}
</style>


