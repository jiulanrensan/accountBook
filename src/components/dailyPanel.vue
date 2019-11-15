<template>
	<pagoda-row>
		<!-- 标题行：展示日期和收入支出 -->
		<pagoda-row type="flex" justify="space-around" class="listTitle">
		  <!-- <pagoda-col span="8">{{date}}  {{week}}</pagoda-col> -->
		  <pagoda-col span="8">
		  	<div style="text-align: left">
				  <span>{{titleText.date}}</span>
				  <span>{{titleText.week}}</span>
			  </div>
			</pagoda-col>
		  <pagoda-col span="12">
		  	<div style="text-align: right">
		  		<span>收入:{{titleText.income}}</span>
				  <span>支出:{{titleText.expenditure}}</span>
		  	</div>
			</pagoda-col>
		</pagoda-row>

		<!-- 内容行，v-for循环渲染列表 -->
		<template v-for="(item, index) in [1,2,3]" >
			<pagoda-row 
			type="flex" 
			justify="space-around" 
			class="listContent"
			>
				<!-- 左侧icon图标 -->
				<!-- 中间靠左内容+分类 -->
				<!-- 右侧金额+时间 -->
			  <pagoda-col span="4">
			  	<pagoda-icon name="shop" size="50px"/>
				</pagoda-col>
				<pagoda-col span="14">
					span: 14
				</pagoda-col>
				<pagoda-col span="6">
					span: 6
				</pagoda-col>
			</pagoda-row>
			<div class="pagoda-hairline--bottom"></div>
		</template>
	</pagoda-row>
</template>
<script>
export default {
  name: 'dailyList',
  data () {
  	return {
  		titleText: {
  			date: '11月16日',
	  		week: '星期五',
	  		income: '100',
	  		expenditure: '100'
  		}
  	}
  }
}
</script>
<style>
	.listTitle{
		font-size: 13px;
		background-color: #F5F5F5;
	}
	.listContent{
		height: 50px;
		padding: 3px;
		
	}
</style>