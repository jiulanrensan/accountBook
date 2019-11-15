<template>
	<div class="firstPage">
		<dailyPanel></dailyPanel>
	</div>
</template>

<script>
import dailyPanel from '@/components/dailyPanel'
export default {
  name: 'firstPage',
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