<template>
  <div>
    <div class="field" v-for="(item, index) in field" :key="index">
      <div class="label_name">{{item.labelName}}</div>
      <!-- <div class="label_icon">
        <i class="iconfont account-chihe"></i>
      </div> -->
      <pagoda-field 
      :readonly="fieldread"
      class="pdfield"
      input-align="right"
      v-model="item.fieldValue" 
      placeholder="请输入" />
    </div>
  </div>
	
</template>
<script>
	export default {
		name: 'advanced-field',
		data () {
			return {
        field: [],
        fieldread: true
			}
		},
		created () {
			// console.log(111)
      this.field = JSON.parse(JSON.stringify(this.fieldList))
		},
		computed: {
		},
		mounted () {
		},
		props: {
      fieldList: {
        type: Array,
        default: () => []
      },
      readable: {
        type: Boolean,
        default: () => true
      }
		},
		methods: {

    },
    watch: {
      fieldList: {
        handler (data) {
          // console.log(data)
          this.field = JSON.parse(JSON.stringify(this.fieldList))
        },
        deep: true
      },
      readable: {
        handler (val) {
          this.fieldread = val
        },
        immediate: true
      }
    }
	}
</script>
<style lang="less" scoped>
  .field{
    // display: flex;
    // position: relative;
    // line-height: 45px;
    height: 48px;
    .label_name{
      float: left;
      width: 40px;
      margin-left: 10px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .label_icon{
      position: relative;
    }
    .pagoda-cell{
      padding-right: 10px;
    }
    .pdfield{
      width: 60%;
      float: right;
    }
  }
</style>