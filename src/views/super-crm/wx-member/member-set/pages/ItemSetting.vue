<template>
  <section class="register-login">
    <header class="header-content">
      <div class="header-title">
        设置会员登录验证方式：
        <el-checkbox-group style="display: inline-block" v-model="loginMethod">
          <el-checkbox :label="'1'">短信</el-checkbox>
          <el-checkbox :label="'2'">密码</el-checkbox>
        </el-checkbox-group>
      </div>
      <p class="header-info">(至少选择一种进行会员登录认证，短信认证需要开通发送短信功能，具体开通方式需联系金千枝客服）</p>
      <el-checkbox v-model="showLogout" :true-label="'1'" :false-label="'0'">显示会员注销登录按钮</el-checkbox>
      <div class="app-register-control">
        <el-checkbox v-model="canRegister" :true-label="'1'" :false-label="'0'">允许注册新会员</el-checkbox>
        <div class="radio-select">
          <span>会员注册方式：</span>
          <el-radio-group v-model="registerType" @change="activeName = '1'">
            <el-radio label="0">微信卡包注册</el-radio>
            <el-radio label="1">常规方式注册</el-radio>
          </el-radio-group>
        </div>
      </div>
    </header>
    <el-tabs v-model="activeName" class="tab-content">
      <el-tab-pane label="设置会员注册时填写字段" name="1">
        <div class="item-info" v-if="registerType === '0'">温馨提示：微信卡包注册方式最多5个选项（手机号除外）</div>
        <div class="item-title display-flex">
          <div class="name">字段</div>
          <div class="second">是否显示</div>
          <div class="footer">是否必填</div>
        </div>
        <div v-if="registerType === '1'">
          <div class="register-item display-flex" v-for="(item, index) in registerItemList" :key="index">
            <div class="name" :class="{'fonts-color': index < 3}">{{ item.name }}</div>
            <div class="second"><el-checkbox v-model="item.isShow" @change="item.isShow ? '' : (item.isMust = false)" :disabled="index === 0"></el-checkbox></div>
            <div class="footer"><el-checkbox v-model="item.isMust" @change="item.isMust ? (item.isShow = true) : ''" :disabled="index === 0"></el-checkbox></div>
          </div>
          <div class="bind-list">
            <div class="title">请选择要显示的品牌</div>
            <el-checkbox-group v-model="brandCheckedList">
              <el-checkbox style="margin-top: 8px" v-for="(item, index) in brandList" :key="index" :label="item.name"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div v-if="registerType === '0'">
          <div class="register-item display-flex" v-for="(item, index) in packageRegisterItemList" :key="index">
            <div class="name" :class="{'fonts-color': index < 1}">{{ item.name }}</div>
            <div class="second"><el-checkbox v-model="item.isShow" @change="item.isShow ? '' : (item.isMust = false)" :disabled="index === 0"></el-checkbox></div>
            <div class="footer"><el-checkbox v-model="item.isMust" @change="item.isMust ? (item.isShow = true) : ''" :disabled="index === 0"></el-checkbox></div>
          </div>
        </div>
        <div v-if="registerType === '0'">
          <span class="update-person-info">会员开卡后完善信息</span>
          <el-switch
            v-model="isOpenShop"
            active-color="#409eff"
            active-value="1"
            inactive-value="0">
          </el-switch>
          <div v-if="isOpenShop === '1'">
            <div class="register-item display-flex" v-for="(item, index) in cardShopList" :key="index">
              <div class="name" :class="{'fonts-color': index < 1}">{{ item.name }}</div>
              <div class="second"><el-checkbox v-model="item.isShow" @change="item.isShow ? '' : (item.isMust = false)" :disabled="index === 0"></el-checkbox></div>
              <div class="footer"><el-checkbox v-model="item.isMust" @change="item.isMust ? (item.isShow = true) : ''" :disabled="index === 0"></el-checkbox></div>
            </div>
            <div class="bind-list">
              <div class="title">请选择要显示的品牌</div>
              <el-checkbox-group v-model="cardBrandsCheckedList">
                <el-checkbox style="margin-top: 8px" v-for="(item, index) in cardBrandsList" :key="index" :label="item.name"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <el-button class="register-btn" type="primary" @click="setWxLoginRegister">保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="会员个人资料的修改与完善" name="2">
        <div class="item-title display-flex">
          <div class="name">字段</div>
          <div class="second">是否显示</div>
          <div class="footer">是否可修改</div>
        </div>
        <div class="register-item display-flex" v-for="(item, index) in memberItemList" :key="index">
          <div class="name" :class="{'fonts-color': index < 2}">{{item.name}}</div>
          <div class="second"><el-checkbox :disabled="item.isRemind" v-model="item.isShow" @change="item.isShow ? '' : (item.isMust = false)"></el-checkbox></div>
          <div class="footer"><el-checkbox :disabled="item.isRemind" v-if="!item.isDisabled" v-model="item.isMust" @change="item.isMust ? (item.isShow = true) : ''"></el-checkbox></div>
        </div>
        <el-button class="register-btn" type="primary" @click="setWxLoginRegister">保存</el-button>
      </el-tab-pane>
      <el-tab-pane label="会员注册声明" name="3" v-if="registerType === '1'">
        <div class="retister-state">
          <h1 class="register-state-title">会员注册声明</h1>
          <WangEditor></WangEditor>
          <el-button class="register-state-btn" type="primary" @click="setWxLoginRegister">保存</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import { getWxLoginRegister, setWxLoginRegister } from '@/api/super-crm/wx-member';
import WangEditor from '@/components/WangEditor.vue';

@Component({
  components: {
    WangEditor
  }
})
export default class HomeModule extends Vue {
  private activeName: string = '1';
  private checked: boolean = false;
  private loginMethod: string[] = [];
  private canRegister: string = '0';
  private showLogout: string = '0';
  private registerItemList = [
    {
      name: '手机号',
      isShow: true,
      isMust: true
    },
    {
      name: '密码',
      isShow: false,
      isMust: false
    },
    {
      name: '姓名',
      isShow: false,
      isMust: false
    },
    {
      name: '性别',
      isShow: false,
      isMust: false
    },
    {
      name: '生日',
      isShow: false,
      isMust: false
    },
    {
      name: '结婚日期',
      isShow: false,
      isMust: false
    },
    {
      name: '电话',
      isShow: false,
      isMust: false
    },
    {
      name: '职业',
      isShow: false,
      isMust: false
    },
    {
      name: '学历',
      isShow: false,
      isMust: false
    },
    {
      name: '身份证',
      isShow: false,
      isMust: false
    },
    {
      name: 'QQ',
      isShow: false,
      isMust: false
    },
    {
      name: '邮箱',
      isShow: false,
      isMust: false
    },
    {
      name: '传真',
      isShow: false,
      isMust: false
    },
    {
      name: '地址',
      isShow: false,
      isMust: false
    },
    {
      name: '分店',
      isShow: false,
      isMust: false
    },
    {
      name: '店员',
      isShow: false,
      isMust: false
    },
    {
      name: '邀请码',
      isShow: false,
      isMust: false
    },
    {
      name: '客户类型',
      isShow: false,
      isMust: false
    },
    {
      name: '品牌',
      isShow: false,
      isMust: false
    }
  ];
  private brandList = [];
  private brandCheckedList = [];
  private memberItemList = [
    {
      name: '手机号',
      isShow: true,
      isMust: true,
      isDisabled: true
    },
    // 杨总要求
    // {
    //   name: '密码',
    //   isShow: false,
    //   isMust: false,
    //   isDisabled: false
    // },
    {
      name: '姓名',
      isShow: false,
      isMust: false,
      isDisabled: false    },
    {
      name: '性别',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '生日',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '结婚日期',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '电话',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '职业',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '学历',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '身份证',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: 'QQ',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '邮箱',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '传真',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '地址',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '分店',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '店员',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '品牌',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '邀请码',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '客户类型',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '消费次数',
      isShow: false,
      isMust: false,
      isDisabled: true
    },
    {
      name: '最后消费日期',
      isShow: false,
      isMust: false,
      isDisabled: true
    }
  ];
  private packageRegisterItemList = [
    {
      name: '手机号',
      isShow: true,
      isMust: true,
      isDisabled: true
    },
    {
      name: '姓名',
      isShow: true,
      isMust: true,
      isDisabled: false
    },
    {
      name: '性别',
      isShow: true,
      isMust: true,
      isDisabled: false
    },
    {
      name: '生日',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    {
      name: '生日类型',
      isShow: false,
      isMust: false,
      isDisabled: false
    },
    // 测试要求去掉
    // {
    //   name: '结婚日期',
    //   isShow: false,
    //   isMust: false,
    //   isDisabled: false
    // },
    {
      name: '地址',
      isShow: false,
      isMust: false,
      isDisabled: false
    }
  ]
  private registerType: string = '0';
  private isHaveCard: string = '1';

  private isOpenShop: string = '1';
  private cardBrandsList = [];
  private cardBrandsCheckedList = [];
  private cardShopList = [
    {
      name: '门店',
      isShow: true,
      isMust: true,
      isDisabled: true
    },
    {
      name: '店员',
      isShow: true,
      isMust: true,
      isDisabled: false
    },
    {
      name: '邀请码',
      isShow: true,
      isMust: true,
      isDisabled: false
    },
    {
      name: '客户类型',
      isShow: true,
      isMust: true,
      isDisabled: false
    },
    {
      name: '品牌',
      isShow: true,
      isMust: true,
      isDisabled: false
    }
  ]

  private mounted() {
    this.getWxLoginRegister();
  }

  private getWxLoginRegister() {
    getWxLoginRegister().then((res: any) => {
      if (res.data.authType === '3') {
        this.loginMethod = ['1', '2'];
      } else {
        const auth = [];
        auth.push(res.data.authType);
        this.loginMethod = auth;
      };
      this.canRegister = res.data.isRegister || '0';
      this.showLogout = res.data.isCancel || '0';
      this.registerType = res.data.registerType || '0';
      this.isHaveCard = res.data.isHaveCard || '1';
      if (res.data.brands) {
        let brandsList = [];
        brandsList = JSON.parse(res.data.brands);
        this.brandCheckedList = brandsList.filter((p: any) => p.isShow === '1').map((p: any) => p.name);
        this.brandList = brandsList;
      }
      this.computedListItem(res.data.registerSettings, this.registerItemList);
      this.computedListItem(res.data.memberInfo, this.memberItemList, res.data.isRemind);
      this.computedListItem(res.data.registerParams, this.packageRegisterItemList);
      this.isOpenShop = res.data.isOpenShop || '1';
      if (res.data.cardBrands) {
        let brandsList = [];
        brandsList = JSON.parse(res.data.cardBrands);
        this.cardBrandsCheckedList = brandsList.filter((p: any) => p.isShow === '1').map((p: any) => p.name);
        this.cardBrandsList = brandsList;
      }
      this.computedListItem(res.data.cardShop, this.cardShopList);
    })
  }

  private computedListItem(listStr: string, showList: any, isRemind?: string) {
    if (listStr) {
      const list = JSON.parse(listStr);
      for (const i in list) {
        if (i) {
          const index = showList.findIndex((p: any) => p.name === i);
          if (index > -1) {
            if (isRemind && isRemind === '1' && (showList[index].name === '姓名' || showList[index].name === '性别' || showList[index].name === '生日')) {
              showList[index].isShow = true;
              showList[index].isMust = true;
              showList[index].isRemind = true;
            } else {
              showList[index].isShow = list[i].split('|')[0] === '1';
              showList[index].isMust = list[i].split('|')[1] === '1';
            }
          }
        }
      }
    }
    return [];
  }

  private setWxLoginRegister() {
    if (this.loginMethod.length < 1) {
      this.$message({
        message: '请设置会员登录方式',
        type: 'warning'
      });
      return
    };
    if (this.registerType === '0' && this.isHaveCard === '0') {
      this.$message({
        message: '生成卡包后才能开启微信卡包注册',
        type: 'warning'
      });
      return
    }
    const brands = this.brandCheckedList.join(',');
    const cardBrands = this.cardBrandsCheckedList.join(',');
    const params = {
      authType: this.loginMethod.length > 1 ? '3' : this.loginMethod[0],
      isRegister: this.canRegister,
      isCancel: this.showLogout,
      registerType: this.registerType,
      brands,
      registerSettings: this.computedSubListItem(this.registerItemList),
      memberInfo: this.computedSubListItem(this.memberItemList),
      registerParams: this.computedSubListItem(this.packageRegisterItemList),
      isOpenShop: this.isOpenShop,
      cardBrands,
      cardShop: this.computedSubListItem(this.cardShopList)
    }
    setWxLoginRegister(params).then((res: any) => {
      this.$message({
        message: '保存成功！',
        type: 'success'
      });
    })
  }

  private computedSubListItem(list: any[]): string {
    const arr = list.map((p: any) => {
      return `"${p.name}":"${p.isShow ? '1' : '0'}|${p.isMust ? '1' : '0'}"`;
    });
    return `{${arr.join(',')}}`;
  }
}
</script>

<style lang="scss" scoped>
.register-login {
  height: calc(100vh - 190px);
  overflow: auto;
  .header-content {
    padding: 15px 0;
    .header-title {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
    }
    .header-info {
      font-family: MicrosoftYaHei;
      font-size: 12px;
      line-height: 40px;
      color: #999999;
    }
    .app-register-control {
      margin-top: 15px;
      .radio-select {
        padding-top: 8px;
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .tab-content {
    .item-info {
      font-size: 14px;
      color: #e12f30;
      margin-bottom: 15px;
    }
    .item-title {
      background-color: #f5faff;
      font-family: MicrosoftYaHei-Bold;
      font-size: 14px;
      font-weight: bold;
      color: #333333;
    }
    .display-flex {
      width: 620px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 14px;
      .name {
        width: 120px;
      }
      .fonts-color {
        color: red;
      }
      .second {
        width: 56px;
        text-align: center;
      }
      .footer {
        width: 72px;
        text-align: center;
      }
    }
    .register-item:nth-of-type(even) {
      background-color: #fafafa;
    }
    .bind-list {
      width: 618px;
      border-radius: 4px;
      border: solid 1px #dcdfe6;
      padding: 12px;
      .title {
        font-weight: bold;
        font-size: 14px;
        color: #606266;
      }
    }
    .update-person-info {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
      padding: 12px;
    }
    .register-btn {
      margin: 18px 0;
    }
    .retister-state {
      text-align: center;
      .register-state-title {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 22px;
      }
      .register-state-btn {
        margin-top: 22px;
      }
    }
  }
}
</style>


