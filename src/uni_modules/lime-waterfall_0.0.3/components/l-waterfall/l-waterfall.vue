<template>
	<view class="l-waterfall-wrapper">
		<!-- #ifndef APP-NVUE -->
		<view class="l-waterfall-list" :style="[styles]">
			<view class="l-waterfall__column" :style="[columnStyles]" v-for="(col, c) in columnList" :key="c">
				<view 
					class="l-waterfall__row osiris" 
					v-for="(row, r) in col" 
					:id="'l-waterfall__row-' + c + '-' + r"
					:key="r">
						<slot name="item" :content="row" :id="'l-waterfall__row-' + c + '-' + r"></slot>
				</view>
			</view>	
		</view>
		<view class="l-waterfall__error" v-if="props.error && !props.finished" @click="onLoad">
			{{props.errorText}}
			<slot name="error"></slot>
		</view>
		<view class="l-waterfall__loading" v-if="props.loading && !props.finished">
			{{props.loadingText}}
			<slot name="loading"></slot>
		</view>
		
		<view class="l-waterfall__finished" v-if="props.finished">
			{{props.finishedText}}
			<slot name="finished"></slot>
		</view>
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<waterfall :column-count="props.columnCount" :column-gap="columnGap" column-width="auto" @loadmore="loadmore" style="flex:1" :left-gap="columnGap" :right-gap="columnGap">
			<refresh></refresh>
			<cell v-for="(row, r) in list" :style="rowStyles">
			    <slot name="item" :content="row" :id="'l-waterfall__row-0-' + r"></slot>
			</cell>
			<loading>
				<view class="l-waterfall__error" v-if="props.error && !props.finished" @click="onLoad">
					<text class="l-waterfall__error-text">{{errorText}}</text>
					<slot name="error"></slot>
				</view>
				<view class="l-waterfall__loading" v-if="props.loading && !props.finished">
					<text class="l-waterfall__loading-text">{{props.loadingText}}</text>
					<slot name="loading"></slot>
				</view>
				
				<view class="l-waterfall__finished" v-if="props.finished">
					<text class="l-waterfall__finished-text">{{props.finishedText}}</text>
					<slot name="finished"></slot>
				</view>
			</loading>
		</waterfall>
		<!-- #endif -->
	</view>
</template>
<script lang="ts">
	import { ref, watch, getCurrentInstance, nextTick, provide, reactive, defineComponent, toRefs, onMounted, computed } from './vue';
	import { getRect} from '@/uni_modules/lime-shared/getRect';
	import { unitConvert } from '@/uni_modules/lime-shared/unitConvert';
	import { addUnit } from '@/uni_modules/lime-shared/addUnit';
	import { sleep } from '@/uni_modules/lime-shared/sleep';
	import { range } from '@/uni_modules/lime-shared/range';
	import WaterfallProps from './props';
	import { getPropByPath } from './utils';
	const name = 'l-waterfall'
	export default defineComponent({
		name,
		props: WaterfallProps,
		emits: ['rendered', 'load', 'update:loading', 'update:error'],
		// #ifdef MP-TOUTIAO
		data() {
			return {
				imageMap: new Map()
			}
		},
		provide() {
			const push = (value: any) => {
				if(value.id) {
					this.imageMap.set(value.id, value.image)
				}
			}
			return {
				[name]: {push}
			}
		},
		// #endif
		setup(props, {emit, slots}) {
			const app = getCurrentInstance();
			if(!app) return
			const columnList = ref<any[]>([]);
			// 如果列表提供尺寸,则使用提供的，否则就自动获取
			const hasSizePath = props.widthPath && props.heightPath
			let observerMap = new Map()
			let minColumn = 0 // 最小列索引
			let innerData:any[] = [] // 瀑布流数据队列
			let count = 0 // 已经渲染的数量
			let imageMap = computed(():Map<any, any> => (app.data.imageMap || new Map() as any))
			let columnWidth = ref(0)
			let columnHeights = [...new Array(props.columnCount).fill(0)]
			// #ifndef MP-TOUTIAO
			const push = (value: any) => {
				if(value.id) {
					imageMap.value.set(value.id, value.image)
				}
			}
			const parent = reactive({push})
			provide(name, parent)
			// #endif
			const onLoad = () => {
				if(props.finished) {
					emit('rendered')
				} else {
					emit('update:loading', true)
					emit('load')
				}
			}
			
			// #ifndef APP-NVUE 
			const getPadding = ():number[] => {
				const { padding } = props
				const p1 = unitConvert(padding[0]) 
				const p2 = unitConvert(padding[1]) 
				const p3 = unitConvert(padding[2])
				const p4 = unitConvert(padding[3])
				return [p1, p2||p1, p3||p1, p4||p2||p1]
			}
			const calcHeight = (width: number, height: number) => {
				const [p1, p2, p3, p4] = getPadding()
				return Math.round((columnWidth.value - p2 - p4) * height / width) + p1 + p3 +  unitConvert(props.extraHeight)
			}
			const styles = computed(() => {
				return {
					gap: addUnit(props.gap[0]||0)
				}
			})
			const columnStyles = computed(() => {
				return {
					gap: addUnit(props.gap[1]||props.gap[0]||0)
				}
			})
			const updateMinCol = async () => {
				if(hasSizePath) {
					if(!columnWidth.value) {
						const res = await getRect('.l-waterfall__column', { context: app})
						columnWidth.value = Math.round(res.width)
						if(!props.widthPath || !props.heightPath) return
						const {v: width} = getPropByPath(innerData[0], props.widthPath)
						const {v: height} = getPropByPath(innerData[0], props.heightPath) 
						const itemHeight = calcHeight(unitConvert(width), unitConvert(height))
						
						const minHeight = Math.min(...columnHeights)
						minColumn = columnHeights.indexOf(minHeight)
						columnHeights[minColumn] += (itemHeight + unitConvert(props.gap[0]))
					}
					return 
				}
				
				// 并行渲染时，无法获取最小列，只能按列依次渲染
				if (count < props.firstPageCount) {
					minColumn = count % (props.columnCount)
					return
				}
				await sleep(50)
				const res = await getRect('.l-waterfall__column', { context: app, needAll: true })
				const heightList = res.map((item: any) => item.height)
				const minHeight = Math.min(...heightList)
				minColumn = heightList.indexOf(minHeight)
				columnHeights[minColumn] = minHeight
				
			}
			const appendColData = () => {
				const colItem = innerData.shift()
				columnList.value[minColumn].push(colItem)
				return new Promise((resolve) => {
					nextTick(() => {
						resolve(true)
					})
				})
			}
			const startObserver = async () => {
				// 开始监测新增加的瀑布流元素
				// #ifdef MP-TOUTIAO
				await sleep()
				// #endif
				const rowKey = columnList.value[minColumn].length - 1
				const key = `l-waterfall__row-${minColumn}-${rowKey}`
				const getTartet = () =>  hasSizePath ? true : imageMap.value.get(key)
				let target = getTartet()
				if(!target) {
					await sleep()
					target = getTartet()
				}
				// #ifdef MP
				// const {image: target} = selectComponent('#' + key, {context: page}) || {}
				// #endif
				// #ifdef H5
				// const {image: target} = selectComponent('$' + key, {context: _this.refs[key][0]}) || {}
				// #endif
				// #ifdef APP 
				// const {image: target} = selectComponent('$' + key, {context: _this}) || {}
				// #endif
				if (!target) return
				if (!observerMap.get(key)) {
					const observer = uni.createIntersectionObserver(app.proxy)
					observer.relativeToViewport({top: 0, bottom: props.offset});
					observer.observe(`#${key}`, res => {
						const next = () => {
							if (target.complete || hasSizePath) {
								done()
							} else {
								target.onload = target.onerror = done
							}
						}
						const done = () => {
							if (innerData.length) {
								waterfall()
							} else {
								if(!props.error && !props.disabled) {
									onLoad()
								} 
							}
							// 停止观察，防止回拉时二次触发监听逻辑
							observer.disconnect()
							observerMap.delete(key)
						}
						const check = () => {
							nextTick(() => {
								// 可能uniapp存在BUG 有的节点在可视区也没有触发
								const o = observerMap.get(key)
								if(!o) return
								clearTimeout(o.timer)
								emit('update:loading', true)
								o.timer = setTimeout(() => {
								    if(observerMap.get(key)) {
										emit('update:loading', false)
										next()
									}
								},2000)
							})
						}
						if (res.intersectionRatio) {
							next()
						} else {
							// check()
						}
					})
					observerMap.set(key, {
						timre: null,
						observer,
						target
					});
				}
			}
			const waterfall = async () => {
				try{
					// 更新瀑布流高度最小列
					await updateMinCol()
					// 取出数据源中最靠前的一个并添加到瀑布流高度最小的那一列
					await appendColData()
					// 首屏采用并行渲染，非首屏采用串行渲染
					if (++count < props.firstPageCount) {
						nextTick(() => waterfall())
					} else {
						nextTick(() => startObserver())
					}
				}catch(e){
					//TODO handle the exception
				}
			}
			
			const init = () => {
				setTimeout(() => {
					count = 0
					imageMap.value.clear()
					const base = range(0, props.columnCount) 
					columnList.value = base.map(() => []) //new Array(props.columnCount).fill([]).map(() => [])
					columnHeights = base //[...new Array(props.columnCount).fill(0)]
					innerData = props.list ? [...props.list] : []
					if(innerData.length) {
						waterfall()
					}
				}, 300)
			}
			watch(() => props.columnCount, init, { immediate: true })
			watch(() => props.list, (v, o) => {
				// 如果长度跟之前的数据不一样 可以认为是刷新数据了
				if(!v) return
				if(v.length < count && count > 0 ||  o && v != o  ) {
					return init()
				}
				let newList = []
				if(o && count < v.length) {
					newList = v.slice(count, v.length)
				} else {
					newList = v
				}
				innerData = [...innerData, ...newList]
				waterfall()
			}, {deep: true})
			// #endif
			// #ifdef APP-NVUE 
			const loadmore = () => {
				if(!props.disabled) {
					onLoad()
				}
			}
			const columnGap = computed(() => unitConvert(props.gap[0]||0))
			const rowStyles = computed(() => ({
				paddingBottom: addUnit(props.gap[1]||props.gap[0]||0)
			}))
			// #endif
			
			
			return {
				slots,
				onLoad,
				// #ifndef APP-NVUE
				columnList,
				styles,
				columnStyles,
				// #endif
				// #ifdef APP-NVUE 
				loadmore,
				columnGap,
				rowStyles,
				// #endif
				props
				// ...toRefs(props)
			}
		}
	})
	
</script>
<style lang="scss">
	@import './index';
</style>