<template>
<<<<<<< HEAD
  <pagoda-nav-bar
    :title="title"
    :left-text="leftText"
    :left-arrow="arrowShow"
    fixed
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <pagoda-icon name="search" slot="right" />
  </pagoda-nav-bar>
=======
	<div :style="{height: homeHeight}" style="padding-top: 46px">
		<pagoda-nav-bar 
	  :title="title" 
	  :left-text="leftText" 
	  :left-arrow="arrowShow"
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
		  slot="right" 
		  size="20px"
			@click="handleNew"
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
>>>>>>> 8c461632c32d73e597d52e77580a168f367e4bb2
</template>

<script>
export default {
  name: 'home',
  data () {
<<<<<<< HEAD
    return {
      leftText: '返回',
      arrowShow: false,
      title: '记账本'
    }
  },
  methods: {
    onClickLeft () {},
    onClickRight () {}
=======
  	return {
  		title: '记账本',
  		arrowShow: false,
  		leftText: '返回',
  		leftIconName: 'wap-nav',
  		rightIconName: "plus",
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
  },
  methods: {
  	handleNew () {
  		console.log(111)
  	}
>>>>>>> 8c461632c32d73e597d52e77580a168f367e4bb2
  }
}
</script>

