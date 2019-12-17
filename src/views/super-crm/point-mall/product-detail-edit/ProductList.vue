<template>
  <div class="product-list">
    <form-bar>
      <el-form v-model="form" :inline="true">
        <el-form-item label="商品名称：">
          <el-input 
            v-model="form.proInfo"
            placeholder="名称支持模糊查询"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="分类：">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option
              v-for="item of typeList"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架：">
          <el-select v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item of putawayStatus"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button
          type="primary"
          @click="getTableData"
        >
          查询
        </el-button>
      </el-form>
      <template
        v-slot:right
      >
      <div class="right-box">
        <el-button
          @click="exportHandle"
          type="primary"
        >
          导出
        </el-button>
      </div>
    </template>
    </form-bar>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        prop="code"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        label="图片"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 80px"
            :src="imagesUrl({
              path: '/jop-wx-web/op/showimage',
              name: scope.row.pic_url,
              alias: 'Gift'
            })"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类"
      >
      </el-table-column>
      <el-table-column
        prop="actualIntegral"
        label="兑换积分"
      >
      </el-table-column>
      <el-table-column
        label="上架状态"
      >
        <template slot-scope="scope">
          <el-icon
            v-if="scope.row.status === '1'"
            type="el-icon-success"
            size="25px"
          />
          <el-icon
            v-else
            type="el-icon-error"
            size="25px"
            color="#F56C6C"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.createdTime | momentFilter}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="emitEditDetail(scope.row)"
          >
            编辑详情
          </el-button>
          <el-button
            type="text"
            @click="copyLink(scope.row)"
          >
            复制链接
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @current-change="pageTurning"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import FormBar from '@/components/FormBar.vue';
import {getProductList, getProductTyple} from '@/api/super-crm/point-mall';
import {imagesUrl} from '@/utils/imageUrl';
import ElIcon from '@/components/ElIcon.vue';
import {momentFilter} from '@/filters/date';
import exportCsv from '@/utils/exportCsv';
import user from '@/utils/user';
import {copyText} from '@/utils/copyText';

@Component({
  name: 'productList',
  components: {
    FormBar,
    ElIcon
  },
})
export default class PointMallProductDetailEditProductList extends Vue {
  form = {
    category: '',
    proInfo: '',
    status: '',
  };

  total = 0;

  pageSize = 10;

  pageNum = 1;

  // 类型列表
  typeList: any[] = [];

  imagesUrl = imagesUrl;

  // 上架状态
  putawayStatus = [
    {
      lable: '全部',
      value: '',
    },
    {
      lable: '上架',
      value: '1',
    },
    {
      lable: '下架',
      value: '0',
    },
  ];

  // 表格信息
  tableData = [];

  mounted() {
    this.getProductTyple();
    this.getProductList();
  }

  // 查询
  getTableData() {
    this.pageNum = 1;
    this.getProductList();
  }

  // 翻页
  pageTurning(val: number) {
    this.getProductList();
  }

  // 获取赠品分类
  getProductTyple() {
    const body = {}

    getProductTyple(body).then((res: any) => {
      const {data} = res;

      const formatData = (<any[]> data).map((item, index) => {
        return {
          lable: item.name,
          value: item.name
        }
      });

      this.typeList = [
        {
          lable: '全部',
          value: ''
        },
        ...formatData
      ];
    })
  }

  // 查询积分商品列表
  async getProductList(onlyData: boolean = false) {
    try {
      const body = {
        ...this.form,
        pageSize: onlyData ? 99999 : this.pageSize,
        pageNum: this.pageNum,
      }

      const res = await getProductList(body)

      const {data} = res;

      if (onlyData) {
        return data;
      } else {
        const {list, total} = data;

        this.tableData = list;
        this.total = total;
      }
    } catch (err) {
      console.warn(err);
      return Promise.reject(err);
    }
  }

  // 导出处理
  async exportHandle() {
    try {
      const data = await this.getProductList(true);
      const {list} = data;

      if (list && list instanceof Array) {
        list.forEach((item) => {
          item.createdTime = momentFilter(item.createdTime);
          item.status = ((type: any) => {
            switch (type) {
              case 1:
                return '已上架'
              default:
                return '未上架'
            }
          })(item.status);
        })

        exportCsv({
          filename: '礼品详情',
          data: list,
          columns: [
            {
              title: '编号',
              key: 'code'
            },
            {
              title: '名称',
              key: 'productName'
            },
            {
              title: '分类',
              key: 'category'
            },
            {
              title: '兑换积分',
              key: 'actualIntegral'
            },
            {
              title: '上架状态',
              key: 'status'
            },
            {
              title: '时间',
              key: 'createdTime'
            },
          ]
        })
      }
    } catch (err) {
      console.warn(err);
      this.$message.warning('导出失败');
    }
  }

  // 提交编辑详情时
  @Emit('editDetail')
  emitEditDetail(row: any) {
    return row;
  }

  async copyLink(row: any) {
    try {
      if (user.serverUser) {
        const origin = process.env.VUE_APP_BASE_API;
        const companyKey = user.serverUser.account.companyKey
        const url = `${origin}/wx-interface-web/wx/auth?companyKey=${companyKey}&page=wx_point_mall&childPage={"path":"/product-detail","query":{"id":"${row.code}"}}`

        await copyText(encodeURI(url));
        this.$message.success('复制成功');
      } else {
        this.$message.success('无法获取企业编号');
      }
    } catch (error) {
      console.warn(error);
      this.$message.warning('复制失败');
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  & > * {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  > .pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>


