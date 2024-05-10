<template>
	<!-- <demo-block title="瀑布流"> -->
		<l-waterfall 
			:list="list" 
			v-model:loading="loading"
			error-text="请求失败，点击重新加载"
			:finished="finished"
			finished-text="没有更多了"
			@load="load" 
			:gap="[10, 10]">
			<template #item="{content, id}">
				<view class="l-waterfall-card" v-if="content" >
					<l-image id="wimage" class="l-waterfall-card-image" parent-id="l-waterfall" :inject-id="id" :src="content.file.src" l-style="width: 100%" mode="widthFix"/>
					<view class="l-waterfall-card-info">{{content.title}}</view>
					<view class="l-waterfall-card-author">
						<l-image :src="content.avatar" shape="circle" width="27" height="27"></l-image>
						<view class="inner">
							<text>{{content.username}}</text>
						</view>
					</view>
				</view>
			</template>
		</l-waterfall>
	<!-- </demo-block> -->
</template>
<script>
	import {ref, defineComponent, onMounted } from '../l-waterfall/vue';
	import data from './data'
	export default defineComponent({
		setup() {
			const loading = ref(false);
			const error = ref(false);
			const finished = ref(false);
			const list = ref([]) 
			let page = 0
			const load = () => {
				page++
				if(page > 2) {
					console.log('全部加载完毕')
					loading.value = false
					return finished.value = true
				}
				console.log('加载第'+page+'页')
				loading.value = true
				list.value.push(...data.map(item => {
					return {
						file: Object.assign(item.file, {src: item.file.src ? item.file.src : `https://gd-hbimg.huaban.com/${item.file.key}_fw320`}),
						title: item.raw_text,
						avatar: `https://gd-hbimg.huaban.com/${item.via_user.avatar.key}`,
						username: item.via_user.username,  
					}
				}))
				loading.value = false
			}
			// onMounted(() => {
				load()
			// })
			return {
				list,
				load,
				error,
				loading,
				finished
			}
		}
	})
	
</script>
<style lang="scss">
	.l-waterfall-card {
		position: relative;
		box-shadow: 0 8rpx 16rpx 0 rgba(0, 0, 0, 0.02), 0 2rpx 6rpx 0 rgba(0, 0, 0, 0.02);
		background: #fff;
		font-size: 24rpx;
		border-radius: 6rpx;
		overflow: hidden;
		&-info {
			font-size: 28rpx;
			padding: 16rpx 16rpx;
			line-height: 1.5;
			color: #333;
			margin-bottom: 16rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		&-author {
			display: flex;
			background: #fff;
			border-top: 1rpx solid #F2F2F2;
			position: relative;
			color: #999;
			border-bottom-left-radius: 4rpx;
			border-bottom-right-radius: 4rpx;
			padding-left: 16rpx;
			padding-top: 16rpx;
			.inner {
				padding: 14rpx 16rpx 16rpx 16rpx;
				line-height: 1.2;
				text-decoration: none;
				min-height: 56rpx;
				word-wrap: break-word;
			}
		}
	}
</style>
