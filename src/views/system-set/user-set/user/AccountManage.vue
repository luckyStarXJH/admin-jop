<template>
  <article class="account-manage">
    <div class="page-header">
      <div class="title">
        <i class="iconfont icon-zhanghu1"></i>
        账号管理
      </div>
      <div class="name">
        <span class="name">{{user.serverUser.account.companyName}}</span>
        子账号维护
        <span class="id">(企业ID：{{user.serverUser.account.companyKey}})</span>
      </div>
      <div class="number" v-show="user.serverUser.account.jopUserLimit">最大用户数：<span>{{user.serverUser.account.jopUserLimit}}</span></div>
    </div> 

    <div class="search-panel">
      <el-select v-model="searchItem.accountGroup" placeholder="请选择用户组" style="width:200px;margin-right:15px">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="item in accountGroupList" :value="item.groupId" :label="item.groupName" :key="item.groupId"></el-option>
      </el-select>
      <el-input v-model="searchItem.accountName" placeholder="请输入用户名" style="width: 200px;margin-right:15px"></el-input>
      <el-select v-model="searchItem.accountPosition" placeholder="请选择职位" style="width:200px;margin-right:15px">
        <el-option value="" label="全部"></el-option>
        <el-option v-for="item in positionList" :value="item.positionId" :label="item.positionName" :key="item.positionId"></el-option>
      </el-select>
      <el-button type="primary" @click="searchAccountList">搜索</el-button>
    </div>

    <div class="content-body">
      <div class="body-left">
        <div class="group-tree">
          <GroupTree :tree="treeData" @handleNode="handleNode" @nodeClick="nodeClick"></GroupTree>
        </div>
        <div class="add-groups">
          <el-input size="small" v-model="createAccountGroupName" placeholder="请输入用户组名称" style="width: 120px;margin-right:10px"></el-input>
          <el-button size="small" type="primary" @click="createAccountGroup">新增组</el-button>
        </div>
      </div>
      <div class="body-right">
        <div class="table-info table-list" v-if="accountPerssionUpdateModal.show">
          <SysTable
            :tableList="accountTableInfo.list"
            :positionList="positionList"
            :accountGroupList="accountGroupList"
            @updateTable="updateTable"
            @accountPerssionUpdate="accountPerssionUpdate"
            @tableSelection="tableSelection"></SysTable>
          <div class="table-page">
            <div class="table-btn">
              <el-dropdown trigger="click">
                <el-button size="small" type="primary">
                  批量操作
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="tableAllSelectMethods('2')">批量删除</el-dropdown-item>
                  <el-dropdown-item @click.native="tableAllSelectMethods('0')">设为有效</el-dropdown-item>
                  <el-dropdown-item @click.native="tableAllSelectMethods('1')">设为无效</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button style="margin-left:15px" size="small" icon="el-icon-plus" type="primary" @click="newAccountModal.show = true">新增用户</el-button>
            </div>
              <el-pagination
                v-show="accountTableInfo.total > 0"
                background
                layout="total, prev, pager, next, sizes, jumper"
                :page-sizes="[10, 20, 50, 100]"
                :page-size.sync="pageOptions.pageSize"
                @size-change="searchAccountList"
                @current-change="searchAccountList"
                :current-page.sync="pageOptions.current" 
                :total="accountTableInfo.total">
              </el-pagination>
          </div>
        </div>

        <div class="table-info" v-else>
          <PerssionEdit :data="accountPerssionUpdateModal.data"></PerssionEdit>
        </div>
      </div>
    </div>

    <PoupBox
      v-model="newAccountModal.show"
      @cancel="newAccountCancel('newAccountModal')"
      title="新增-子账号">
      <el-form slot="body" ref="newAccountModal" :model="newAccountModal" :rules="ruleValidate" label-width="100px">
        <el-form-item label="用户组：" prop="accountGroup">
          <el-select v-model="newAccountModal.accountGroup" style="width:100%">
            <el-option v-for="item in accountGroupList" :label="item.groupName" :value="item.groupId" :key="item.groupId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名：" prop="loginName">
          <el-input v-model="newAccountModal.loginName" placeholder="用户名" size="large"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickName">
          <el-input v-model="newAccountModal.nickName" placeholder="昵称" size="large"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="newAccountModal.password" type="password" placeholder="密码" size="large"></el-input>
        </el-form-item>
        <el-form-item label="职位：" prop="accountPosition">
          <el-select v-model="newAccountModal.accountPosition" style="width:100%">
            <el-option v-for="item in positionList" :label="item.positionName" :value="item.positionId" :key="item.positionId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="到期时间：" prop="endTime">
          <el-date-picker type="date" placeholder="到期时间" v-model="newAccountModal.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="是否有效：" prop="status">
          <el-radio-group v-model="newAccountModal.status">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" size="large" @click="newAccountOk('newAccountModal')">确定</el-button>
        <el-button type="ghost" size="large" @click="newAccountCancel('newAccountModal')">取消</el-button>
      </div>
    </PoupBox>

  </article>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import user from '@/utils/user';
import {
  toUpdateAccountGroup,
  getAccountGroups,
  getAccountPositionList,
  searchAccountList,
  searchAPPlist,
  getAccountWithGroup,
  createAccountGroup,
  createAccountInfo,
  toRemoveAccountGroup,
  delAccountByBatch,
  updateAccountByBatch } from '@/api/system-set';
import SysTable from './SysTable.vue';
import PerssionEdit from './PerssionEdit.vue';
import GroupTree from './GroupTree.vue';
import PoupBox from '@/components/PoupBox.vue';
import moment from 'moment';

@Component({
  components: {
    GroupTree,
    SysTable,
    PerssionEdit,
    PoupBox
  }
})
export default class AccountManage extends Vue {
  get user() {
    return user;
  }

  private searchItem = {
    accountGroup: '',
    accountPosition: '',
    accountName: ''
  };
  private accountGroupList = [];
  private positionList = [];
  private createAccountGroupName = '';
  private accountPerssionUpdateModal = {
    show: true,
    data: null
  };
  private pageOptions = {
    current: 1,
    pageSize: 10
  }
  private accountTableInfo = {
    list: [],
    total: 1
  };
  private newAccountModal = {
    show: false,
    accountGroup: '',
    accountPosition: '',
    loginName: '',
    nickName: '',
    password: '',
    status: '0',
    endTime: ''
  };
  private ruleValidate = {
    accountGroup: [
      { required: true, message: '用户组不能为空！', trigger: 'blur' }
    ],
    accountPosition: [
      { required: true, message: '职位不能为空！', trigger: 'blur' }
    ],
    loginName: [
      { required: true, message: '用户名不能为空！', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '密码不能为空！', trigger: 'blur' }
    ],
    endTime: [
      { required: true, type: 'date', message: '到期时间不能为空！', trigger: 'blur' }
    ]
  };
  private treeData = [];
  private multipleSelection = [];

  private mounted() {
    this.getAccountGroups();
    this.getAccountPositionList();
    this.searchAccountList();
    this.getAccountWithGroup();
  }

  private nodeClick(data: any) {
    this.searchItem = {
      accountGroup: data.accountId ? '' : data.groupId,
      accountPosition: '',
      accountName: data.accountId ? data.accountName : ''
    }
    this.searchAccountList();
  }

  // 获取用户组列表
  private getAccountGroups() {
    getAccountGroups({accountId: user.serverUser.account.accountId}).then((res: any) => {
      this.accountGroupList = res.data ? res.data : [];
    })
  }

  // 获取用户职位列表
  private getAccountPositionList() {
    getAccountPositionList({accountId: user.serverUser.account.accountId}).then((res: any) => {
      this.positionList = res.data ? res.data : [];
    })
  }

  // table编辑、删除刷新
  private updateTable() {
    this.searchAccountList();
    this.getAccountWithGroup();
  }

  // table权限管理
  private accountPerssionUpdate(data: any) {
    this.accountPerssionUpdateModal.show = false,
    this.accountPerssionUpdateModal.data = data;
  }

  // table表单选中
  private tableSelection(list: any) {
    this.multipleSelection = list;
  }

  // 批量操作
  private tableAllSelectMethods(data: any) {
    if (this.multipleSelection.length > 0) {
      if (data === '2') {
        this.delAccountByBatch(this.multipleSelection);
      } else {
        this.updateAccountByBatch(this.multipleSelection, data);
      }
    } else {
      this.$message({
        type: 'info',
        message: '请选择！'
      });
    }
  }

  // 新增用户组
  private createAccountGroup() {
    if (this.createAccountGroupName) {
    const params = {
      accountId: user.serverUser.account.accountId,
      groupName: this.createAccountGroupName,
      sort: this.accountGroupList.length
    }
    createAccountGroup(params).then((res: any) => {
      this.createAccountGroupName = '';
      this.getAccountWithGroup();
      this.getAccountGroups();
    })
    } else {
      this.$message('用户组名称不能为空！')
    }
  }

  private searchAccountList() {
    const accountListParams = {
      page: {
        pageNum: this.pageOptions.current,
        pageSize: this.pageOptions.pageSize
      },
      params: {
        positionId: this.searchItem.accountPosition,
        groupId: this.searchItem.accountGroup,
        accountName: this.searchItem.accountName
      }
    };
    const getAPPParams = {
      ticket: user.serverUser.ticket,
      companyKey: user.serverUser.account.companyKey,
      channel: 'wx'
    }
    Promise.all([searchAccountList(accountListParams), searchAPPlist(getAPPParams)]).then(([userData, appUser]: any) => {
      if (userData.code === 0 && appUser.code === 0) {
        const list = userData.data ? userData.data.list : [];
        const appUserData = appUser.data || [];
        this.accountTableInfo.list = list.map((p: any) => {
          const findAppUserData = appUserData.find((item: any) => item.jopLoginName === p.loginName);
          if (findAppUserData) {
            Object.defineProperties(p, {
              id: {
                value: findAppUserData.id,
                writable: true,
                enumerable: true
              },
              jopLoginName: {
                value: findAppUserData.jopLoginName,
                writable: true,
                enumerable: true
              },
              phone: {
                value: findAppUserData.phone,
                writable: true,
                enumerable: true
              }
            })
          }
          return p;
        })
        this.accountTableInfo.total = userData.data && userData.data.total;
        this.accountPerssionUpdateModal.show = true;
      }
    }).catch(err => {
      console.log(err);
    })
  }
  // 新增用户
  private newAccountOk(name: any) {
    (this.$refs[name] as any).validate((valid: any) => {
      if (valid) {
        this.newAccountMethods(name);
      }
    })
  }
  private newAccountCancel(name: any) {
    (this.$refs[name] as any).resetFields();
    this.newAccountModal.show = false;
  }
  private newAccountMethods(name: any) {
    const params = {
      accountId: user.serverUser.account.accountId,
      loginName: this.newAccountModal.loginName,
      nickName: this.newAccountModal.nickName,
      password: this.newAccountModal.password,
      accountName: this.newAccountModal.loginName,
      isAdmin: '0',
      status: this.newAccountModal.status,
      endTime: moment(this.newAccountModal.endTime).format('YYYY-MM-DD'),
      groupId: this.newAccountModal.accountGroup,
      positionId: this.newAccountModal.accountPosition,
      companyName: user.serverUser.account.companyName
    }
    createAccountInfo(params).then((res: any) => {
      this.getAccountWithGroup();
      this.newAccountModal.show = false;
      this.newAccountCancel(name);
      this.searchAccountList();
    })
  }

  // 获取用户分组详细列表
  private getAccountWithGroup() {
    getAccountWithGroup({accountId: user.serverUser.account.accountId}).then((res: any) => {
      const list = res.data ? res.data : [];
      this.treeData = list.sort((a: any, b: any) => {
        return a.sort > b.sort;
      })
    })
  }
  // 树形图节点操作（改/删）
  private handleNode(data: any) {
    if (data.type == 'remove') {
      if (data.node.listAPG.length > 0) {
        // 有子账号的情况下不能删除
        this.$message('该用户组下存在子账号，不能删除！');
      } else {
        this.$confirm(`确定要删除${data.node.groupName}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toRemoveAccountGroup(data.node);
        }).catch(() => {
          console.log('cancel')
        });
      }
    }
    if (data.type == 'edit') {
      this.toUpdateAccountGroup(data);
    }
  }
  // 节点删除
  private toRemoveAccountGroup(node: any) {
    const params = {
      accountId: user.serverUser.account.accountId,
      groupId: node.groupId
    }
    toRemoveAccountGroup(params).then((res: any) => {
      this.getAccountGroups();
      this.getAccountWithGroup();
      this.$message({
        type: 'success',
        message: '删除成功！'
      });
    })
  }
  // 节点编辑
  private toUpdateAccountGroup(node: any) {
    const params = {
      accountId: user.serverUser.account.accountId,
      groupId: node.node.groupId,
      groupName: node.name
    }
    toUpdateAccountGroup(params).then((res: any) => {
      this.getAccountGroups();
      this.getAccountWithGroup();
      this.$message({
        type: 'success',
        message: '修改成功！'
      });
    })
  }

  // 批量删除
  private delAccountByBatch(list: any) {
    const listAccount = list.map((p: any) => {
      return {accountId: p.accountId}
    })
    delAccountByBatch({listAccount}).then((res: any) => {
      this.updateTable();
      this.$message({
        type: 'success',
        message: '删除成功！'
      });
    })
  }
    // 批量修改用户状态
  private updateAccountByBatch(list: any, status: any) {
    const listAccount = list.map((p: any) => {
      return {
        accountId: p.accountId,
        status
      }
    })
    updateAccountByBatch({listAccount}).then((res: any) => {
      this.updateTable();
      this.$message({
        type: 'success',
        message: '修改成功！'
      });
    })
  }
}
</script>

<style lang="scss" scoped>
.account-manage {
  .page-header {
    display: flex;
    height: 45px;
    border-bottom: 1px solid #dddddd;
    .title {
      font-size: 22px;
      padding: 2px 15px;
      color: #333333;
      > i {
        font-size: 22px;
      }
    }
    .name {
      flex-grow: 1;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      .name {
        color: #6699ff;
      }
      .id {
        color: #6699ff;
        font-weight: 100;
      }
    }
    .number {
      font-size: 14px;
      padding-top: 12px;
      > span {
        color: #6699ff;
        font-weight: bold;
      }
    }
  }
  .search-panel {
    padding: 16px;
    border-bottom: 1px solid #dddddd;
  }
  .content-body {
    width: 100%;
    display: flex;
    .body-left {
      width: 220px;
      border-right: 1px solid #dddddd;
      height: calc(100vh - 230px);
      position: relative;
      .add-groups {
        padding: 8px;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      .group-tree {
        height: calc(100% - 50px);
        overflow: auto;
      }
    }
    .body-right {
      width: calc(100% - 220px);
      height: calc(100vh - 280px);
      overflow: auto;
      .table-info {
        .table-page {
          margin-left: 12px;
          display: flex;
          justify-content: space-between;
        }
      }
      .table-list {
        .table-page {
          position: fixed;
          bottom: 25px;
          width: calc(100% - 500px);
          padding: 8px 30px;
          z-index: 1000;
        }
      }
    }
  }
}
</style>
