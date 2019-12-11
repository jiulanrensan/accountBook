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
			}
		},
		watch: {
			pickerShow (val) {
				if (val) {
					this.$nextTick(() => {
						const picker = this.$refs.picker.$el
						const ul = picker.getElementsByTagName('ul')[0]
						// console.log(ul)
					})
					
				}
			}
		}
	}
</script>