<template>
	<pagoda-row>
		<!-- 标题行：展示日期和收入支出 -->
		<pagoda-row type="flex" justify="space-around" class="list-title">
		  <!-- <pagoda-col span="8">{{date}}  {{week}}</pagoda-col> -->
		  <pagoda-col span="8">
		  	<div style="text-align: left">
				  <span>{{panelData.titleText.date}}</span>
				  <span>{{panelData.titleText.week}}</span>
			  </div>
			</pagoda-col>
		  <pagoda-col span="12">
		  	<div style="text-align: right">
		  		<span>收入:{{panelData.titleText.income}}</span>
				  <span>支出:{{panelData.titleText.expenditure}}</span>
		  	</div>
			</pagoda-col>
		</pagoda-row>
		<!-- 内容行，v-for循环渲染列表 -->
		<template v-for="item in panelData.listContent" >
			<pagoda-row 
			type="flex" 
			justify="space-around" 
			class="list-content"
			@click="viewDetail(item)"
			>
				<!-- 左侧icon图标 -->
				<!-- 中间靠左内容+分类 -->
				<!-- 右侧金额+时间 -->
			  <pagoda-col span="4" class="list-item">
			  	<pagoda-icon name="shop" size="40px"/>
				</pagoda-col>
				<pagoda-col span="14" class="list-item item-left">
					<div class="list-item-content">
						<div class="sort">{{item.sortName}}</div>
						<div class="tag-list">
							<pagoda-tag 
								type="info" 
								light
								size="medium"
								v-for="(tag, i) in item.tagList"
								:key="i"
								style="margin-right:4px"
							>
								{{tag}}
							</pagoda-tag>
						</div>
					</div>
				</pagoda-col>
				<pagoda-col span="6" class="list-item item-right">
					<div class="list-item-amount">
						<div class="amount">{{item.amount}}</div>
						<div class="time">{{item.time}}</div>
					</div>
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
  		// titleText: {
  		// 	date: '11月16日',
	  	// 	week: '星期五',
	  	// 	income: '100',
	  	// 	expenditure: '100'
  		// },
  		// listContent: [
	  	// 	{
	  	// 		sortIconName: 'shop',
	  	// 		sortName: '吃喝',
	  	// 		tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
	  	// 		amount: '29.4',
	  	// 		time: '19:00'
	  	// 	},
	  	// 	{
	  	// 		sortIconName: 'shop',
	  	// 		sortName: '吃喝',
	  	// 		tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
	  	// 		amount: '29.4',
	  	// 		time: '19:00'
	  	// 	},
	  	// 	{
	  	// 		sortIconName: 'shop',
	  	// 		sortName: '吃喝',
	  	// 		tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
	  	// 		amount: '29.4',
	  	// 		time: '19:00'
	  	// 	}
  		// ]
  	}
  },
  methods: {
  	viewDetail (item) {
  		console.log(item)
  	}
  },
  props: {
  	panelData: {
  		type: Object,
  		default () {
  			return {}
  		}
  	}
  }
}
</script>
<style scoped lang="less">
	.list-title{
		font-size: 13px;
		background-color: #F5F5F5;
	}
	.list-content{
		height: 60px;
		padding: 3px;
		.list-item{
			display: flex;
			justify-content: center;
			align-items: center;
			.list-item-content,
			.list-item-amount{
				height: 60px;
				width:100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				.sort{
					width: 100%;
					height: 30px;
					font-size: 18px;
					text-align: left;
				}
				.tag-list{
					width: 100%;
					height: 20px;
					font-size: 12px;
					text-align: left;
					overflow: hidden;
				}
				.amount,
				.time{
					height: 30px;
					font-size: 20px;
					text-align: right;
				}
				.time{
					height: 13px;
					font-size: 13px;
				}
			}
			.list-item-amount{
				height: 60px;
				width:100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
			}
		}
		.item-left{
			justify-content: flex-start;
		}
		.item-right{
			justify-content: flex-end;
			margin-right: 15px;
		}
	}
</style>