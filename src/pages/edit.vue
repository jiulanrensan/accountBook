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
      :selectedCate="category"
      :readable="readable"
     ></categoryList>

    <fieldList :fieldList="fieldList" :readable="readable" ref="fieldChild"></fieldList>

    <pagoda-button type="primary" size="large" square class="button" @click="editComfirm">{{readable ? '编辑' : '确认'}}</pagoda-button>

    <pagoda-popup v-model="showPicker" position="bottom">
      <ul class="categories" @click="selectCategory($event)">
        <li v-for="item in list" :key="item.value" :data-set="item.iconName">
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
// import {iconMap} from '@/utils/index'
export default {
  name: 'edit',
  data() {
    return {
      content: {
        category: {
          value: '',
          iconName: ''
        },
        amount: '',
        remark: '',
        tag: ''
      },
      category: {
        value: '吃喝',
        iconName: 'account-chihe'
      },
      // balance表示支出(OUT)或者收入(IN)
      balance: 'IN',
      head_category_balance: 'head_category_balance',
      showPicker: false,
      dialogShow: false,
      readable: false,
      result: [],
      fieldList: [
        {
          id: 'tag',
          labelName: '标签',
          fieldValue: ''
        },
        {
          id: 'sum',
          labelName: '金额',
          fieldValue: ''
        },
        {
          id: 'remark',
          labelName: '备注',
          fieldValue: ''
        }
      ]
    }
  },
  created () {
    // console.log(this.$route)
    this.readable = this.$route.params.read
    this.balance = this.$route.params.balance ? this.$route.params.balance : 'IN'
    if (this.readable) {
      this.$axios.get('/getListDetail', {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        // console.log(res)
        this.category.iconName = res.data.account_type
        this.category.value = this.iconMap(res.data.account_type)
        this.fieldList[0].fieldValue = res.data.tag
        this.fieldList[1].fieldValue = res.data.sum
        this.fieldList[2].fieldValue = res.data.remark
      })
    }
  },
  computed: {
    list () {
      return this.balance === 'IN' ? this.GLOBAL.outcomeCategoriesList : this.GLOBAL.incomeCategoriesList
    }
  },
  methods: {
    selectCategory (ev) {
      // console.log(ev)
      const target = ev.target.parentNode
      if (target.nodeName === 'LI') {
        this.category.iconName =  target.dataset.set
        this.category.value = target.innerText
        this.showPicker = false
      }
      // console.log(this.content.category)
    },
    changeBalance (val) {
      if (!this.readable) {
        this.balance = val
      }
    },
    showPopup (data) {
      this.showPicker = data
    },
    editComfirm () {
      // console.log(this.readable)
      if (this.readable) this.readable = false
      console.log(this.$refs.fieldChild.field)
    },
    iconMap (data) {
			const arr = Array.prototype.concat(this.GLOBAL.outcomeCategoriesList, this.GLOBAL.incomeCategoriesList)
      let index = arr.findIndex(el => el.iconName === data)
			return arr[index].value
		}
  },
  watch: {
    balance (data) {
      this.category = data === 'IN'? {
        value: '吃喝',
        iconName: 'account-chihe'
      } : {
        value: '工资',
        iconName: 'account-gongzi'
      }
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
