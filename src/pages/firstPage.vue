<template>
	<div class="firstPage">
		<pagoda-list
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
			:error.sync="error"
			error-text="请求失败，点击重新加载"
		  @load="onLoad"
		>
			<template v-for="(element, index) in listData" >
				<dailyPanel :panelData="element" :key="index"></dailyPanel>
			</template>
		</pagoda-list>
	</div>
</template>

<script>
import {formatDate, timeComparison} from '@/utils'
import dailyPanel from '@/components/dailyPanel'
export default {
  name: 'firstPage',
  data () {
		return {
			error: false,
			loading: false,
			finished: false,
			listData: [
			],
			// 记录时间的数组,'yyyy-mm-dd'形式
			timeArr: [],
			page_size: 5,
			page_num: 1
		}
	},
	created () {
		// console.log(formatDate({GMT: 'Sun Dec 15 2019 14:38:14 GMT+0800 (中国标准时间)'}))
		// console.log(formatDate({GMT: 'Sun Dec 14 2019 14:38:14 GMT+0800 (中国标准时间)'}))
		// console.log(timeComparison('2019-12-15','2019-12-14'))
	},
	activated () {
		// console.log(this.$route.params)
		if (this.$route.params && this.$route.params.request) {
			// 根据修改的或新增的id用详情接口获取信息，并改动此id
			this.$axios.get('/getListDetail', {
				params: {
					id: this.$route.params.id
				}
			})
			.then(res => {
				// console.log(res)
				let time = res.data.time.slice(0, 10)
				let index = this.listData.findIndex(el => el.date === time)
				if (index < 0) {
					// 当前日期不存在，则往数组前新增一项
					this.listData.unshift({
						date: formatDate({GMT: res.data.time}).slice(0, 10),
						titleText: {
							date: formatDate({GMT: res.data.time}).slice(0, 10),
							income: res.data.in_or_out === 'IN' ? res.data.sum : 0,
							expenditure: res.data.in_or_out === 'OUT' ? res.data.sum : 0
						}, 
						listContent: [res.data]
						})
				} 
				else {
					let id = this.listData[index].listContent.findIndex(el => el.id === this.$route.params.id)
					if (id < 0) {
						this.listData[index].listContent.unshift(res.data)
					} else {
						// 直接赋值不起作用，改用splice方法
						this.listData[index].listContent.splice(id, 1, res.data)
						// this.$set(this.listData[index], listContent[id], res.data)
					}
				}
			})
		} else if (this.$route.params && this.$route.params.delete) {
			let {time, id} = this.$route.params.delInfo
			let index = this.listData.findIndex(el => el.date === time.slice(0, 10))
			let idIndex = this.listData[index].listContent.findIndex(el => el.id === id)
			this.listData[index].listContent.length === 1 ?
				this.listData.splice(index, 1) :
				this.listData[index].listContent.splice(idIndex, 1)
		}
	},
  methods: {
		onLoad () {
			this.getList(this.page_size, this.page_num)
		},
		getList (page_size, page_num) {
			this.$axios.get('/getList', {
				params: {
					page_size: page_size,
					page_num: page_num
				}
			})
			.then(res => {
				// 加载状态结束
				// console.log(res)
				this.loading = false
				this.page_num += 1
				const obj = {
					IN: 0,
					OUT: 0
				}
				if (!res.data.length) this.finished = true
				for (let i = 0; i < res.data.length; i++) {
					let index = this.timeArr.indexOf(formatDate({GMT: res.data[i].time}).slice(0, 10))
					if (index < 0) {
						this.timeArr.push(formatDate({GMT: res.data[i].time}).slice(0, 10))
						obj[res.data[i].in_or_out] = res.data[i].sum
						this.listData.push({
							date: formatDate({GMT: res.data[i].time}).slice(0, 10),
							titleText: {
								date: formatDate({GMT: res.data[i].time}).slice(0, 10),
								income: res.data[i].in_or_out === 'IN' ? res.data[i].sum : 0,
								expenditure: res.data[i].in_or_out === 'OUT' ? res.data[i].sum : 0
							}, 
							listContent: [res.data[i]]
							})
					} else {
						if (res.data[i].in_or_out === 'IN') {
							this.listData[index].titleText.income += res.data[i].sum
						} else {
							this.listData[index].titleText.expenditure += res.data[i].sum
						}
						this.listData[index].listContent.push(res.data[i])
					}
				}
				this.listData = [...this.listData]
			})
			.catch(e => {
				// 加载状态结束
				this.loading = false
				this.error = true
				// this.listData = []
				console.log(e)
			})
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