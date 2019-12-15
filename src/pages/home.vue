<template>
	<div :style="{height: homeHeight}" style="padding-top: 46px">
		<pagoda-nav-bar 
	  :title="title" 
	  :left-text="leftText" 
	  :left-arrow="arrowShow"
		:right-text="rightText"
	  @click-left="onClickLeft"
	  fixed
	  border>
		  <pagoda-icon 
		  :name="leftIconName" 
		  slot="left" 
		  v-if="leftIconShow"
		  size="20px"
		  @click="leftPopShow = !leftPopShow"
		  />
		  <pagoda-icon 
		  :name="rightIconName"
			v-if="rightIconShow"
		  slot="right" 
		  size="20px"
			@click.stop="handleNew"
		  />
		</pagoda-nav-bar>
		<keep-alive :include="['firstPage']">
			<router-view/>
		</keep-alive>
		
		<!-- 侧边栏 -->
		<!-- fixed定位在最顶层 -->
		<pagoda-popup 
			v-model="leftPopShow"
			position="left"
			:style="{ width: '50%', height: '100%' }"
		>内容</pagoda-popup>

		<pagoda-overlay :show="overlayShow" @click="overlay = false" class-name="overlay"/>
		<pagoda-loading size="50px" vertical class="loading" v-show="overlayShow">加载中...</pagoda-loading>
	</div>
</template>

<script>
export default {
  name: 'home',
  data () {
  	return {
  		title: '记账本',
  		arrowShow: false,
  		leftText: '返回',
  		leftIconName: 'wap-nav',
			rightIconName: "plus",
			rightIconShow: true,
			rightText: '',
  		leftIconShow: true,
			leftPopShow: false,
			overlayShow: false
  	}
  },
  computed: {
  	homeHeight () {
  		// 计算屏幕高度，减去顶部导航的高
  		return `${document.body.clientHeight - 46}px`
  	}
  },
  created () {
  	// this.$eventBus.on('leftIconShow', data => {
  	// 	console.log(data)
		// })
		this.eventBus.$on('loading', data => {
			this.overlayShow = data
		})
		this.eventBus.$on('turnEdit', data => {
			// console.log(data)
			this.turnEdit(data)
		})
  },
  methods: {
		// stop阻止事件冒泡
  	handleNew () {
      // console.log(111)
      this.turnEdit()
		},
		onClickRight () {
			console.log(111)
		},
  	onClickLeft () {
  		if (this.arrowShow) {
  			this.$router.go(-1)
  			this.leftIconShow = true
				this.arrowShow = false
				this.rightIconShow = true
				this.rightText = ''
  		}
  		// console.log(111)
		},
		turnEdit (data) {
			this.leftIconShow = false
			this.arrowShow = true
			this.rightIconShow = false
			const param = {
				edit: true
			}
			data ? Object.assign(param, {id: data.id, edit: data.edit}) : ''
      this.$router.push({name: 'edit', params: param})
		}
  }
}
</script>
<style lang="less">
	.overlay{
		z-index: 500 !important;
		background-color: rgba(0,0,0,0.5);
	}
	.loading{
		position: fixed;
		z-index: 501;
		top: 50%;
		left: 50%;
		transform: translate(-50%);
		margin: 0 auto;
	}
</style>

