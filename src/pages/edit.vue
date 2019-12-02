<template>
  <div class="edit">
    <pagoda-button type="primary" size="large" square class="button" @click="editComfirm">确认</pagoda-button>
    <pagoda-row type="flex" justify="space-between" class="content-row">
      <pagoda-col span="8">收入or支出</pagoda-col>
      <pagoda-col span="14">
        <pagoda-radio-group v-model="content.radio">
          <pagoda-row type="flex" justify="end">
            <pagoda-col span="10"><pagoda-radio name="1">收入</pagoda-radio></pagoda-col>
            <pagoda-col span="10"><pagoda-radio name="2">支出</pagoda-radio></pagoda-col>
          </pagoda-row>
        </pagoda-radio-group>
      </pagoda-col>
    </pagoda-row>
    <pagoda-field
      readonly
      clickable
      label="分类"
      :value="content.value"
      placeholder="选择分类"
      input-align="right"
      @click="showPicker = true"
    />
    <!-- 标签确认事件 -->
    <pagoda-field
      readonly
      clickable
      label="标签"
      :value="content.tag"
      placeholder="选择标签"
      input-align="right"
      @click="dialogShow = true"
    />
    <pagoda-cell-group>
      <pagoda-field
        v-model="content.amount"
        label="金额"
        placeholder="请输入金额"
        input-align="right"
      />
    </pagoda-cell-group>
    <div class="remark">备注</div>
    <pagoda-cell-group>
      <pagoda-field
        v-model="content.remark"
        type="textarea"
        placeholder="请输入备注"
        rows="1"
        autosize
      />
    </pagoda-cell-group>

    <pagoda-dialog
      v-model="dialogShow"
      title="请选择标签"
      show-cancel-button
    >
      <pagoda-checkbox-group v-model="result">
        <pagoda-cell-group>
          <pagoda-cell
            v-for="(item, index) in list"
            clickable
            :key="item"
            :title="`${item}`"
            @click="toggle(index)"
          >
            <pagoda-checkbox
              :name="item"
              ref="checkboxes"
              slot="right-icon"
            />
          </pagoda-cell>
        </pagoda-cell-group>
      </pagoda-checkbox-group>
    </pagoda-dialog>

    <pagoda-popup v-model="showPicker" position="bottom">
      <pagoda-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </pagoda-popup>
  </div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {
      content: {
        value: '',
        radio: '',
        amount: '',
        remark: '',
        tag: ''
      },
      showPicker: false,
      dialogShow: false,
      list: ['早餐', '午餐', '晚餐', '零食', '夜宵'],
      result: [],
      columns: ['吃喝', '交通', '医院', '学习', '购物']
    }
  },
  methods: {
    onConfirm(value) {
      this.content.value = value
      this.showPicker = false
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    editComfirm () {
      console.log(111)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .edit{
    height: 100%;
    position: relative;
    .content-row{
      padding: 12px 16px;
      height: 24px;
    }
    .button{
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
  .pagoda-cell--large .pagoda-cell__title{
    text-align: left;
  }
  .remark{
    text-align: left;
    padding: 12px 16px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.4);
  }
</style>
