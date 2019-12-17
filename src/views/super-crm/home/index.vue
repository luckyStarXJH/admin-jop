<template>
  <div class="super-crm-home">
    <div class="quick-entry">
      <div class="title">快捷入口</div>
      <div class="app-menu">
        <div
          v-for="(item, index) in shortcutMenu"
          :key="index"
          class="app-menu-item"
        >
          <div class="app-name">
            <span class="name">
              {{item.name}}
            </span>
            <el-button
              circle
              icon="el-icon-plus"
              size="mini"
              plain
              @click="showShortcutMenuEditDialog(index)"
            >
            </el-button>
          </div>
          <div class="app-menu-list">
            <el-button
              v-for="(item, index) in item.menu"
              v-show="item.isShow === '1'"
              :key="index"
              type="primary"
              plain
              @click="shortcutMenuClick(item)"
            >
              {{item.name}}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="count">
      <div class="count-group vip">
        <div class="title">会员数据统计</div>
        <div class="content">
          <div>
            <span class="name">
              剩余验证短信
            </span>
            <span class="value">
              {{crmCountInfo.smsCount.val / 10}}
            </span>
          </div>
          <div>
            <span class="name">
              今日新增会员数
            </span>
            <span class="value">
              {{crmCountInfo.memberCount.addDay}}
            </span>
          </div>
          <div>
            <span class="name">
              日活跃会员数
              <el-popover
                placement="top-start"
                trigger="hover"
                content="当天访问的用户数量"
              >
                <el-icon
                  type="icon-wenhao"
                  size="16px"
                  slot="reference"
                  color="#606266"
                />
              </el-popover>
            </span>
            <span class="value">
              {{crmCountInfo.memberCount.activitDay}}
            </span>
          </div>
          <div>
            <span class="name">
              周活跃会员数
              <el-popover
                placement="top-start"
                trigger="hover"
                content="7天内访问的用户数量"
              >
                <el-icon
                  type="icon-wenhao"
                  size="16px"
                  slot="reference"
                  color="#606266"
                />
              </el-popover>
            </span>
            <span class="value">
              {{crmCountInfo.memberCount.activitWeek}}
            </span>
          </div>
          <div>
            <span class="name">
              月活跃会员数
              <el-popover
                placement="top-start"
                trigger="hover"
                content="30天内访问的用户数量"
              >
                <el-icon
                  type="icon-wenhao"
                  size="16px"
                  slot="reference"
                  color="#606266"
                />
              </el-popover>
            </span>
            <span class="value">
              {{crmCountInfo.memberCount.activitMonth}}
            </span>
          </div>
        </div>
      </div>
      <div class="count-group official-accounts">
        <div class="title">公众号粉丝统计</div>
        <div class="content">
          <div>
            <span class="name">
              粉丝总数
            </span>
            <span class="value">
              {{crmCountInfo.clueCount.clueAll}}
            </span>
          </div>
          <div>
            <span class="name">
              今日新增粉丝
            </span>
            <span class="value">
              {{crmCountInfo.clueCount.clueNum}}
            </span>
          </div>
          <div>
            <span class="name">
              今日取消粉丝
            </span>
            <span class="value">
              {{crmCountInfo.clueCount.clueFullNum}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="charts">
      <ve-line :data="chartsData"></ve-line>
    </div>
    <el-dialog
      v-if="shortcutMenu.length"
      :title="`菜单编辑-${shortcutMenu[checkedMenuIndex].name}`"
      :visible.sync="isShowShortcutMenuEditDialog"
      width="700px"
    >
      <div class="menu-list">
        <el-checkbox
          v-for="(item, index) of shortcutMenu[checkedMenuIndex].menu"
          :key="index"
          v-model="item.isShow"
          true-label="1"
          false-label="0"
        >
          {{item.name}}
        </el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowShortcutMenuEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitShortcutMenuEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {State} from 'vuex-class';
import {
  getSuperCrmCountInfo,
  getShortcutMenu,
  setShortcutMenu,
  getChartsData
} from '@/api/super-crm/home';
import moment from 'moment';
import ElIcon from '@/components/ElIcon.vue';

@Component({
  components: {
    ElIcon
  }
})
export default class SuperCRMHome extends Vue {
  @State('canAccessAppURL')
  canAccessAppURL!: any[];

  // 统计信息
  crmCountInfo = {
    clueCount: {
      clueAll: 0,
      clueFullNum: 0,
      clueNum: 0,
    },
    memberCount: {
      activitDay: 0,
      activitMonth: 0,
      activitWeek: 0,
      addDay: 0
    },
    smsCount: {
      val: 0
    }
  }

  // 快捷菜单
  shortcutMenu: any[] = [];

  // 选择的快捷键菜单
  checkedMenuIndex = 0;

  // 是否显示快捷菜单编辑对话框
  isShowShortcutMenuEditDialog = false;

  // 图标数据
  chartsData: {
    columns: string[],
    rows: any[]
  } = {
    columns: ['日期', '每日新增会员', '门店关注趋势', '会员活跃度趋势'],
    rows: [],
  };

  mounted() {
    this.getSuperCrmCountInfo();
    this.getShortcutMenu();
    this.getChartsData();
  }

  // 获取统计数据
  async getSuperCrmCountInfo() {
    const body = {
    }

    const res = await getSuperCrmCountInfo(body);
    const {data} = res;

    this.crmCountInfo = data;

    return data;
  }

  // 获取快捷菜单
  async getShortcutMenu() {
    const body = {
      category: 'CRM'
    }

    const res = await getShortcutMenu(body);
    const {data} = res;

    this.shortcutMenu = data;

    return data;
  }

  // 快捷菜单点击
  shortcutMenuClick(item: any) {
    const {appCode} = item;
    const checkedMenuItem = this.canAccessAppURL.find((item: any) => {
      return item.appCode === appCode;
    })

    this.$router.push(checkedMenuItem.path);
  }

  // 显示快捷菜单编辑对话框
  showShortcutMenuEditDialog(index: number) {
    this.checkedMenuIndex = index;
    this.isShowShortcutMenuEditDialog = true;
  }

  // 提交快捷菜单修改
  async submitShortcutMenuEdit() {
    const checkedMenu = this.shortcutMenu[this.checkedMenuIndex];
    const checkedMenuItem = checkedMenu.menu.filter((item: any) => {
      return item.isShow === '1';
    })
    const checkedMenuItemAppCode = checkedMenuItem.map((item: any) => {
      return item.appCode;
    })

    const body = {
      appCode: checkedMenu.appCode,
      menu: checkedMenuItemAppCode.join(',')
    }

    const res = await setShortcutMenu(body);
    const {data} = res;

    this.$message.success('修改成功');
    this.isShowShortcutMenuEditDialog = false;

    return data;
  }

  // 获取图表数据
  async getChartsData() {
    const body = {
      startTime: moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
    }

    try {
      const res = await getChartsData(body);
      const {data} = res;

      const {
        addChat,
        shopChat,
        actChat,
      } = data;


      interface DataFormatElement {
        日期: string;
        每日新增会员: number;
        门店关注趋势: number;
        会员活跃度趋势: number;
      }

      const dataFormat: DataFormatElement[] = [];

      addChat.forEach((item: any, index: number) => {
        dataFormat.push({
          日期: item.dateTime,
          每日新增会员: item.memberNum,
          门店关注趋势: shopChat[index].memberNum,
          会员活跃度趋势: actChat[index].memberNum,
        })
      });

      this.chartsData.rows = dataFormat;

    } catch (err) {
      this.$message.warning('图表数据获取失败');
      console.error(err);
    }
  }
}
</script>

<style lang="scss" scoped>
.super-crm-home {
  > .count {
    > .count-group {
      margin-bottom: 20px;

      > .title {
        margin-bottom: 20px;
        font-size: 16px;
        color: #606266;
      }

      > .content {
        display: flex;
        justify-content: space-between;

        > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          border: 1px solid #e4e7ed;
          border-right: none;
          height: 100px;

          &:last-of-type {
            border-right: 1px solid #e4e7ed;
          }

          > .name {
            margin-bottom: 5px;
            font-size: 14px;
            color: #606266;
          }

          > .value {
            font-size: 36px;
            color: #6699ff;
          }
        }
      }
    }
  }

  > .quick-entry {
    > .title {
      margin-bottom: 20px;
      color: #606266;
      font-size: 16px;
    }

    > .app-menu {
      > .app-menu-item {
        margin-bottom: 20px;

        > .app-name {
          margin-bottom: 20px;

          > .name {
            margin-right: 10px;
            font-size: 16px;
            color: #606266;
          }
        }

        > .app-menu-list {
          display: flex;
          flex-wrap: wrap;

          > button {
            margin: 0;
            margin-bottom: 20px;
            margin-right: 20px;
          }
        }
      }
    }
  }

  .menu-list {
    display: flex;
    flex-wrap: wrap;

    & > * {
      margin-right: 50px;
      margin-bottom: 20px;
    }
  }
}
</style>


