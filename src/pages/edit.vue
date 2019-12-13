<template>
  <div class="edit">
    <pagoda-row type="flex" justify="center">
      <pagoda-col span="8" class="head_category">
        <div :class="balance === 'IN' ? head_category_balance : ''" @click="changeBalance('IN')">收入</div>
        <div :class="balance === 'OUT' ? head_category_balance : ''" @click="changeBalance('OUT')">支出</div>
      </pagoda-col>
    </pagoda-row>

    <categoryList
      @category="showPopup"
      :selectedCate="content.category"
     ></categoryList>

    <fieldList :fieldList="fieldList"></fieldList>

    <pagoda-button type="primary" size="large" square class="button" @click="editComfirm">确认</pagoda-button>

    <pagoda-popup v-model="showPicker" position="bottom">
      <ul class="categories" @click="selectCategory($event)">
        <li v-for="item in outcomeCategoriesList" :key="item.value" :data-set="item.iconName">
          <i class="iconfont" :class="item.iconName"></i>
          <div>{{item.value}}</div>
        </li>
      </ul>
    </pagoda-popup>
  </div>
</template>

<script>
import categoryList from '@/components/categoryList'
import fieldList from '@/components/advancedField'
export default {
  name: 'edit',
  data() {
    return {
      content: {
        category: {
          value: '',
          iconName: ''
        },
        radio: '',
        amount: '',
        remark: '',
        tag: ''
      },
      // balance表示支出(OUT)或者收入(IN)
      balance: 'IN',
      head_category_balance: 'head_category_balance',
      showPicker: false,
      dialogShow: false,
      list: ['早餐', '午餐', '晚餐', '零食', '夜宵'],
      result: [],
      outcomeCategoriesList: [
        {value: '吃喝', iconName: 'account-chihe'}, 
        {value: '交通', iconName: 'account-traffic'},
        {value: '衣物鞋包', iconName: 'account-clothes'}, 
        {value: '医院', iconName: 'account-hospital'}, 
        {value: '学习', iconName: 'account-study'}, 
        
        {value: '日用品', iconName: 'account-riyongpin'},
        {value: '房租', iconName: 'account-fangzu'},
        {value: '化妆品', iconName: 'account-huazhuang'}
      ],
      incomeCategoriesList: [
        {value: '工资', iconName: 'account-gongzi'}, 
        {value: '奖金', iconName: 'account-jiangjin'}, 
        {value: '兼职', iconName: 'account-jianzhi'}, 
        {value: '投资', iconName: 'account-touzi'}, 
        {value: '红包', iconName: 'account-hongbao'}
      ],
      fieldList: [
        {
          labelName: '标签',
          fieldValue: ''
        },
        {
          labelName: '金额',
          fieldValue: ''
        },
        {
          labelName: '备注',
          fieldValue: ''
        }
      ]
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
    },
    selectCategory (ev) {
      // console.log(ev)
      const target = ev.target.parentNode
      if (target.nodeName === 'LI') {
        this.content.category.iconName =  target.dataset.set
        this.content.category.value = target.innerText
        this.showPicker = false
      }
      // console.log(this.content.category)
    },
    changeBalance (val) {
      this.balance = val
    },
    showPopup (data) {
      this.showPicker = data
    }
  },
  components: {
    categoryList,
    fieldList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .edit{
    height: 100%;
    position: relative;
    .head_category{
      display: flex;
      justify-content: center;
      font-size: 16px;
      padding-top: 5px;
      .head_category_balance{
        background-color: rgb(255, 204, 119);
        color: #fff;
      }
      div{
        padding: 2px 5px;
        height: 20px;
        line-height: 20px;
        border: 1px solid rgb(255, 204, 119);
      }
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
  .categories{
    height: 300px;
    list-style-type: none;
    overflow: scroll;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-around;
    // align-content: flex-start;
    padding: 10px 5px;
    li{
      width: 20%;
      float: left;
      padding: 10px 2.5%;
      i {
        font-size: 20px;
      }
      div{
        font-size: 14px;
        height: 30px;
      }
    }
  }
</style>
