<template>
	<!-- <div class="advanced_picker"> -->
		<pagoda-popup v-model="showPicker" position="bottom">
			<!-- cancel事件触发父组件关闭popup -->
			<!-- confirm事件传回选中值给父组件 -->
			<pagoda-picker
				ref="picker"
			  show-toolbar
			  :columns="columnsList"
			  @cancel="handleHide"
			  @confirm="onConfirm"
			/>
		</pagoda-popup>
	<!-- </div> -->
	
</template>
<script>
	export default {
		name: 'advanced-picker',
		data () {
			return {
				// 汉字名称与icon映射
				iconNameList: {
					'吃喝': 'icon-account-chihe',
					'医院': 'icon-account-hospital',
					'交通': 'icon-account-bus',
					'学习': 'icon-account-study',
					'购物': 'icon-account-shopping'
				}
			}
		},
		created () {
			// console.log(111)
		},
		computed: {
			pickerShow () {
				return this.showPicker
			}
		},
		mounted () {
			// console.log(this.$refs)
			// const a = document.querySelector('pagoda-picker__columns')
			// console.log(a)
		},
		props: {
			showPicker: {
				type: Boolean,
				default: () => false
			},
			columnsList: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			onConfirm () {},
			handleHide () {
				// this.$emit()
			},
			getHTML (parent, children) {
				return parent.getElementsByTagName(children)
			},
			createElement (inner) {
				// ${this.iconNameList[inner]}
				let element = `
					<div class="li_item">
						<span><i class="iconfont ${this.iconNameList[inner]}"></i></span>
						<span>${inner}</span>
					</div>
				`
				return element
			}

		},
		watch: {
			pickerShow (val) {
				if (val) {
					this.$nextTick(() => {
						// const picker = this.$refs.picker.$el
						const liCollection = this.getHTML(this.$refs.picker.$el, 'li')
						for (let i = 0; i < liCollection.length; i++) {
							liCollection[i].innerHTML = this.createElement(liCollection[i].innerHTML)
						}

					})
					
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	.li_item{
		display: flex;
		justify-content: center;
	}
</style>