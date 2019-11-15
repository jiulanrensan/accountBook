<template>
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
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      leftText: '返回',
      arrowShow: false,
      title: '记账本'
    }
  },
  methods: {
    onClickLeft () {},
    onClickRight () {}
  }
}
</script>

