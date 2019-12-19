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
      ref="cateChild"
     ></categoryList>

    <fieldList :fieldList="fieldList" :readable="readable" ref="fieldChild"></fieldList>

    <pagoda-button type="primary" size="large" square class="button" :style="{'bottom': readable ? '48px' : '0'}" @click="editComfirm">{{readable ? '编辑' : '确认'}}</pagoda-button>
    <pagoda-button type="danger" size="large" square class="button" @click="deleteComfirm" v-if="readable">删除</pagoda-button>

    <pagoda-popup v-model="showPicker" position="bottom">
      <ul class="categories" @click="selectCategory($event)">
        <li v-for="(item, index) in list" :key="index" :data-set="item.iconName">
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
import {formatDate} from '@/utils/index'
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
      balance: 'OUT',
      head_category_balance: 'head_category_balance',
      showPicker: false,
      dialogShow: false,
      readable: false,
      create: true,
      // 用来记录修改状态下，原有的新增时间
      create_time: '',
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
    // console.log(this.$route.params.id)
    // 确认当前页面是否新增状态
    this.create = !this.$route.params.read
    // console.log(this.create)
    // 点击列表进来read为true,点击右上角加号进来，read为false
    // 修改不改变时间，新增改变时间
    this.readable = this.$route.params.read
    this.balance = this.$route.params.balance ? this.$route.params.balance : 'IN'
    if (this.readable) {
      this.$axios.get('/getListDetail', {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        this.category.iconName = res.data.account_type
        this.create_time = formatDate({GMT: res.data.time})
        // dsf
        this.category.value = this.iconMap(res.data.account_type)
        this.fieldList[0].fieldValue = res.data.tag
        this.fieldList[1].fieldValue = res.data.sum
        this.fieldList[2].fieldValue = res.data.remark
        this.fieldList = [...this.fieldList]
      })
    }
  },
  computed: {
    list () {
      return this.balance === 'OUT' ? this.GLOBAL.outcomeCategoriesList : this.GLOBAL.incomeCategoriesList
    },
    itemUrl () {
      return this.create ? '/addItem': '/updateItem'
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
    // 编辑 和 新增
    editComfirm () {
      // console.log(this.readable)
      if (this.readable) {
        this.readable = false
      } else {
        // console.log(this.$refs.fieldChild.field)
        const field = this.$refs.fieldChild.field
        const requestBody = {
          user_name: 'lee',
          account_type: this.$refs.cateChild.cateValue.iconName,
          tag: field[0].fieldValue,
          sum: field[1].fieldValue,
          remark: field[2].fieldValue,
          in_or_out: this.balance,
          time: this.create ? formatDate({GMT: new Date()}) : this.create_time
        }
        Object.assign(requestBody, this.create ? {} : {id: this.$route.params.id})
        this.$axios.post(this.itemUrl, requestBody)
        .then(res => {
          // console.log(res)
          // 需要禁止页面返回按钮
          // 新增需要返回id，不然没法在activated里请求详情
          this.eventBus.$emit('changeLeft', true)
          this.$router.push({name: 'firstPage', params:{id: this.$route.params.id || res.data.insertId, request: true}})
        })
        .catch(e => {
          // Toast.fail(`提交失败,${e.data.msg}`)
          console.log(e)
        })
      }
    },
    // 删除
    deleteComfirm () {
      this.$axios.post('/delNote', {id: this.$route.params.id}).then(res => {
        if (res.code === 0) {
          this.eventBus.$emit('changeLeft', true)
          this.$router.push({
            name: 'firstPage',
            params: {delInfo: {id: this.$route.params.id, time: this.create_time}, delete: true}
          })
        }
      })
    },
    iconMap (data) {
			const arr = Array.prototype.concat(this.GLOBAL.outcomeCategoriesList, this.GLOBAL.incomeCategoriesList)
      // let index = arr.findIndex(el => el.iconName === data)
      // console.log(arr, data)
      let icon = arr.find(el => el.iconName === data)
      // dsf
			return (icon && icon.value) || '吃喝'
		}
  },
  watch: {
    balance (data) {
      this.category = data === 'OUT'? {
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
    .delete{
      bottom: 48px;
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
