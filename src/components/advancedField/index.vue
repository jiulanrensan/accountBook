<template>
	<div class="field">
    <div class="label_name">{{labelName}}</div>
    <!-- <div class="label_icon">
      <i class="iconfont account-chihe"></i>
    </div> -->
    <pagoda-field 
    class="pdfield"
    input-align="right"
    v-model="value" 
    placeholder="请输入" />
  </div>
</template>
<script>
	export default {
		name: 'advanced-field',
		data () {
			return {
        value: ''
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
      labelName: {
        type: String,
        default: () => ''
      }
		},
		methods: {

    },
    watch: {
      value (val) {
        // this.$emit('')
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