<template>
	<div class="field">
    <div class="cate_name">分类</div>
    <div class="cate_main" @click="showPopup">
      <div class="cate_icon">
        <i class="iconfont" :class="cateValue.iconName"></i>
      </div>
      <div class="cate_value">{{cateValue.value}}</div>
    </div>
  </div>
</template>
<script>
	export default {
		name: 'category-list',
		data () {
			return {
        cateValue: {
          value: '',
          iconName: ''
        }
			}
		},
		created () {
			// console.log(111)
		},
		computed: {
		},
		mounted () {
		},
		props: {
      selectedCate: {
        type: Object,
        default: () => {
          return {}
        }
      }
		},
		methods: {
      showPopup () {
        this.$emit('category', true)
      }
    },
    watch: {
      selectedCate: {
        handler (val) {
          // console.log(val)
          this.cateValue = val
        },
        immediate: true,
        deep: true
      }
    }
	}
</script>
<style lang="less" scoped>
  .field{
    position: relative;
    line-height: 45px;
    height: 70px;
    .cate_name{
      width: 40px;
      height: 45px;
      line-height: 45px;
      margin-left: 10px;
      padding-top: 12px;
      padding-bottom: 12px;
      float: left;
    }
    .cate_main{
      width: 200px;
      height: 45px;
      float: right;
      padding-top: 12px;
      padding-bottom: 12px;
      display: flex;
      justify-content: flex-end;
      .cate_icon{
        // width: 40px;
        i{
          font-size: 30px;
          margin-right: 10px;
          color: #fff;
          background-color: rgba(255, 204, 119, 0.8);
          border-radius: 50%;
        }
      }
      .cate_value{
        margin-right: 10px;
      }
    }
    
  }
</style>