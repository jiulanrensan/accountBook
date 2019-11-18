<template>
	<div class="firstPage">
		<pagoda-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad"
		>
			<template v-for="(element, index) in listData" >
				<dailyPanel :panelData="element" :key="index"></dailyPanel>
			</template>
		</pagoda-list>
	</div>
</template>

<script>
import dailyPanel from '@/components/dailyPanel'
export default {
  name: 'firstPage',
  data () {
  	return {
  		loading: false,
      finished: false,
  		listData: [
  		]
  	}
  },
  methods: {
  	onLoad () {
  		// 异步更新数据
      setTimeout(() => {
        this.listData.push({
  				titleText: {
		  			date: '11月16日',
			  		week: '星期五',
			  		income: '100',
			  		expenditure: '100'
		  		},
		  		listContent: [
			  		{
			  			sortIconName: 'shop',
			  			sortName: '吃喝',
			  			tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
			  			amount: '29.4',
			  			time: '19:00'
			  		},
			  		{
			  			sortIconName: 'shop',
			  			sortName: '吃喝',
			  			tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
			  			amount: '29.4',
			  			time: '19:00'
			  		},
			  		{
			  			sortIconName: 'shop',
			  			sortName: '吃喝',
			  			tagList: ['早餐','面包', '牛奶','早餐','面包', '牛奶'],
			  			amount: '29.4',
			  			time: '19:00'
			  		}
		  		]
  			})
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.listData.length >= 10) {
          this.finished = true;
        }
      }, 500)
  	}
  },
  components: {
  	dailyPanel
  }
}
</script>
<style>
	.firstPage{
		width: 100%;
		height: 100%;
	}
</style>