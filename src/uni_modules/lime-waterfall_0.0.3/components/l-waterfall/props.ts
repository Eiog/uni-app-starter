import {PropType} from './vue'
export default {
	list: Array,
	widthPath: String,
	heightPath: String,
	columnCount: {
		type: Number,
		default: 2
	},
	// 行、列间距
	gap: {
		type: Array as PropType<string[]|number[]>,
		default: () => ['0px', '0px']
	},
	/**
	 * 图片四边的padding
	 */
	padding: {
		type: Array as PropType<string[]|number[]>,
		default: () => ['0px', '0px']
	},
	/**
	 * 除图片容器外，别一个放内容的容器高度
	 */
	extraHeight: {
		type: [String, Number],
		default: 0
	},
	offset: {
		type: Number,
		default: 1500,
	},
	// rootMargin: {
	// 	type: Object,
	// 	default: { top: 0, bottom: 1500 }
	// },
	firstPageCount: {
		type: Number,
		default: 6
	},
	loading: Boolean,
	loadingText: {
		type: String,
		default: '加载中…'
	},
	finished: Boolean,
	finishedText: String,
	error: Boolean,
	disabled: Boolean,
	errorText: String
}