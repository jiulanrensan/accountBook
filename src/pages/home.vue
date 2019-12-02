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
		<router-view/>
		<!-- 侧边栏 -->
		<!-- fixed定位在最顶层 -->
		<pagoda-popup 
			v-model="leftPopShow"
			position="left"
			:style="{ width: '50%', height: '100%' }"
		>内容</pagoda-popup>
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
  		leftPopShow: false
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
  },
  methods: {
		// stop阻止事件冒泡
  	handleNew () {
      // console.log(111)
      this.leftIconShow = false
			this.arrowShow = true
			this.rightIconShow = false
      this.$router.push('/edit')
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
  	}
  }
}
</script>

