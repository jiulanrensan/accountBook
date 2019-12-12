<template>
	<div class="field">
    <div class="label_name">分类</div>
    <!-- <div class="label_icon">
      <i class="iconfont account-chihe"></i>
    </div> -->
    <pagoda-field 
    readonly
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
		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
  .field{
    display: flex;
    position: relative;
    .label_name{
      width: 10%;
      padding-top: 12px;
      padding-bottom: 12px;
      margin-left: 10px;
    }
    .label_icon{
      position: relative;
    }
  }
</style>