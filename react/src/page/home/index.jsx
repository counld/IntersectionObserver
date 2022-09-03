import React, { useRef, useState, useEffect} from "react";
import styles from "./index.modules.less";

const Home = () => {
	const content = useRef(null)
	const scrollBox = useRef(null)
	const scrollList = useRef(null)
	const [data, setData] = useState([])
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(0)
	const scrollInfo = useRef({
			boxHeight: 500,
			itemHeight: 50,
			renderCount: 0,
			bufferSize: 8
	})

	useEffect(() => {
			// 获取数据
			const res = new Array(100).fill(1).map((item, index) => item + index)
			setData(res)
			// 获取渲染的个数
			const {itemHeight, boxHeight, bufferSize} = scrollInfo.current
			const renderCount = Math.ceil(boxHeight / itemHeight) + bufferSize
			scrollInfo.current.renderCount = renderCount
			// 获取首次渲染时截取数据的索引
			setEnd(renderCount)
	}, [])

	// 处理滚动
	const handleScroll = () => {
			const {itemHeight, boxHeight, bufferSize, renderCount} = scrollInfo.current
			// 获取元素中的内容”超出“元素上边界”的高度
			const {scrollTop} = scrollBox.current
			// 获取开始截取数据的值
			const bufferVal = bufferSize / 2
			const newStartIndex = Math.floor(scrollTop / itemHeight)
			// 获取结束截取的数据的值
			const newEndIndex = newStartIndex + renderCount
			// 如果发生变化，那么就重新渲染
			if (newEndIndex !== end || newStartIndex !== start) {
					setStart(newStartIndex)
					setEnd(newEndIndex)
			}
			const currentOffset = scrollTop - (scrollTop % itemHeight)
			scrollList.current.style.transform = `translate3d(0, ${currentOffset}px, 0)` /* 偏移，造成下滑效果 */
	} 
	// 对数据进行截取进行渲染
	const renderList = data.slice(start, end)
	const {itemHeight} = scrollInfo.current
	return <div ref={content}>
			<div ref={scrollBox} className={styles.scroll_box}  onScroll={() => requestAnimationFrame(handleScroll)}>
					{/* 撑开div 让其滚动 */}
					<div className={styles.scroll_hold} style={{height: `${data.length * itemHeight}px`}}></div>
					<ul className={styles.list} ref={scrollList}>
							{
									renderList.map(item => <div style={{padding: '4px'}} key={item}><li  className={styles.color_list} style={{height: '50px'}}>{item}</li></div>)
							}
					</ul>
			</div>
	</div>
}

export default Home;