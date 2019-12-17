<template>
  <div class="product-edit">
    <el-form ref="form"
      :model="formData"
      label-width="100px" 
    >
      <el-form-item label="商品名称">
        {{formData.name}}
      </el-form-item>
      <el-form-item label="对外名称">
        <el-input v-model="formData.outName"></el-input>
      </el-form-item>
      <el-form-item label="商品详情">
        <wang-editor ref="ue"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updateProductDetail"
        >
          保存
        </el-button>
        <el-button
          type="success"
          @click="emitBack"
        >
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {getProductInfo, updateProductDetail} from '@/api/super-crm/point-mall';
import {Message} from 'element-ui';
import WangEditor from '@/components/WangEditor.vue';

@Component({
  components: {
    WangEditor
  }
})
export default class PointMallProductDetailEditProductEdit extends Vue {
  formData = {
    name: '',
    outName: '',
    detail: '',
  }

  @Prop({
    type: String,
  })
  code!: string;

  @Emit('back')
  emitBack() {
    return false;
  }

  mounted() {
    this.getProductInfo();
  }

  // 获取产品信息
  getProductInfo() {
    const body = {
      code: this.code,
    }

    getProductInfo(body).then((res: any) => {
      const {data} = res;

      this.formData = {
        name: data.productName,
        outName: data.outName,
        detail: data.giftDetail,
      };

      (this.$refs.ue as any).setContent(data.giftDetail);
    })
  }

  // 更新产品信息
  updateProductDetail() {
    this.formData.detail = (<any> this.$refs.ue).getContent();

    const body = {
      code: this.code,
      ...this.formData
    }
    updateProductDetail(body).then((res: any) => {
      Message.success('提交成功');
    })
  }
}
</script>

<style lang="scss" scoped>
</style>


