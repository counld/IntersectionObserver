import React, { useState, useEffect, useRef, useCallback } from "react";
import { getScroller, getScrollTop } from '@/utils/getScroll';
import { useGetState } from "@/utils/usehooks";
import getChangeValue from './useReduer';
import './index.less';

const LongList = (props) => {
	let scroller = null;
	const [state, dispatch] = getChangeValue();
	const { currentViewList, sourceList } = state;
	const { size = 10, load , list } = props;
	const loadGuard = useRef(null);
	const longList = useRef(null);
	const fragment = useRef(null);
	const [innerHeight] = useState(window.innerHeight);
	const [loading, setLoading] = useState(false);
	const total = 10;
	const [itemHeight, setItemHeight, getItemHeight] = useGetState(0);
	// const [currentViewList, setCurrentViewList, getCurrentViewList] = useGetState([]);
	const [finished, setFinished] = useState(false);
	const [loadingTop, setLoadingTop] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const [pageHeight, setPageHeight, getPageHeight] = useGetState(0);

	useEffect(() => {
		const action = {
			type: 'SET_INIT',
			list: list,
		}
		dispatch(action)
	},[])
	useEffect(() => { 
		const { sourceList } = state;
		const itemList = sourceList.slice(0,total);
		const loadingtop = itemList.length * itemHeight;
		setLoadingTop(loadingtop);
		setPageHeight(itemHeight * size);
	},[itemHeight,sourceList])

	const translatey = useCallback(() => { 
		// const currentList = getCurrentViewList();
		const { currentViewList } = state;
 		const itemListheight = getItemHeight();
		const [firstItem] = currentViewList;
		
		if (!firstItem) {
			return 0
		};
		setTranslateY(itemListheight * firstItem.key);
	},[]);

	useEffect(() => {
			scroller = getScroller(longList.current)
			// 异步加载
			console.log('iiiiiiiiiiiiiiii')
			const loadCallback = () => {
				if (finished || loading) {
					return
				}
				const y = loadGuard?.current?.getBoundingClientRect()?.y;
				console.log(y,'jjjuuuuyyyyyyyy',innerHeight)
				if (y > innerHeight) {
					return;
				}
					console.log('index-once');
					setLoading(true);
					load({ done });
			}
			const fragmentCallBack = (scrollTop, isDown) => { 
				const { top, bottom } = fragment?.current.getBoundingClientRect();
				console.log(top, bottom,isDown,innerHeight)
				translatey()
				if (isDown) {
					// 向下
					if (bottom <= innerHeight) {
						console.log(bottom,'oooo')
						down(scrollTop, bottom)
					}
				} else {
					// 向上
					if (top >= 0) {
						up(scrollTop, top)
					}
				}
			}
			let oldTop = 0
			const scrollCallback = () => {
				const scrollTop = getScrollTop(scroller)
				console.log(oldTop,'oldtop',scrollTop)
				loadCallback()
				fragmentCallBack(scrollTop, scrollTop > oldTop)
				oldTop = scrollTop
			}
			loadCallback()
			scroller.addEventListener('scroll', scrollCallback)
			return  () => {
				scroller.removeEventListener('scroll', scrollCallback)
			};
	},[])

	const done = useCallback((finish) => {
		if (finished) {
			return
		}
		if (finish === true) {
			setFinished(finish);
		}
		const { currentViewList, sourceList } = state;
		const length = currentViewList.length
		if (length === 0) {
			const action = {
				type: 'SET_CURRENTVIEWLIST',
				currentViewList: list.slice(0,total),
			}
			dispatch(action);
			Promise.resolve().then(() => {
				setItemHeight(fragment.current.children[0].offsetHeight);
				setLoading(false)
			}) 
		} else {
			// 已经触发了加载，但还没加载完成时，向上滚动了
			if (isLoadingView()) {
				const lastKey = currentViewList[length - 1].key;
				console.log(currentViewList,'cruullisrt');
				const action = {
					type: 'SET_CURRENTVIEWLIST',
					currentViewList: [...sourceList.slice(size, size * 2), ...sourceList.slice(lastKey + 1, lastKey + 1 + size)]
				}
				dispatch(action);
			}
			setLoading(false)
		}
	},[]);

	// 向下滚动
	const down = (scrollTop, y) => {
		const { currentViewList, sourceList } = state;
		// const currentList = getCurrentViewList()
		const currentLength = currentViewList.length;
		if (currentLength === size) {
		const action = {
			type: 'SET_CURRENTVIEWLIST',
			currentViewList: currentViewList.concat(startPoint, startPoint + size * 2),
		}
		dispatch(action);
			return;
		}
		const length = sourceList.length
		const lastKey = currentViewList[currentLength - 1].key
		console.log(sourceList.length,lastKey,'uiawejnds, iulebj, jjj')
		
		if (lastKey >= length - 1) {
			return
		}
		let startPoint
		if (y < 0) {
			// 处理快速滚动
			const page = (scrollTop - scrollTop % pageHeight) / pageHeight + (scrollTop % pageHeight === 0 ? 0 : 1) - 1
			startPoint = Math.min(page * size, length - size * 2)
			console.log(page,pageHeight,'jjjjiujkn ')
		} else {
			startPoint = currentViewList[size].key
		}
		console.log(sourceList,'sourcelist',startPoint);
		
		const action = {
			type: 'SET_CURRENTVIEWLIST',
			currentViewList: sourceList.slice(startPoint, startPoint + size * 2),
		}
		dispatch(action);
	};

// 向上滚动
	const up = (scrollTop, y) => {
		// const currentViewList = getCurrentViewList();
		const { currentViewList } = state;
		const currentLength = currentViewList.length
		if (currentLength < size) {
			return
		}
		const firstKey = currentViewList[0].key
		if (firstKey === 0) {
			return
		}
		console.log(finished,firstKey,'pagehieght',pageHeight)
		let startPoint;
		if (y > innerHeight) {
			// 处理快速滚动
			const page = (scrollTop - scrollTop % pageHeight) / pageHeight + (scrollTop % pageHeight === 0 ? 0 : 1) - 1
			startPoint = Math.max(page * size, 0)
		} else {
			startPoint = currentViewList[0].key - size
		};
		const action = {
			type: 'SET_CURRENTVIEWLIST',
			currentViewList: sourceList.current.slice(startPoint, startPoint + size * 2),
		}
		dispatch(action);
	};

	const isLoadingView =  () => {
		return loadGuard?.current?.getBoundingClientRect().y <= innerHeight
	}

	return (
		<div ref={longList} className="long-list">
			<div ref={fragment} className="fragment" style={{ transform: `translate3d(0, ${translateY}px, 0)` }}>
				{
					currentViewList.length && currentViewList.map((item, index) => {
						return <div key={item.key || index} className="item">{item.text}</div>
					})
				}
				{
					JSON.stringify(sourceList.slice(1,10))
				}
			</div>
			<div className="footer" style={{ paddingTop: `${loadingTop}px` }}>
				{
					finished ? (<div>
						<div className="footer-done">没有了......</div>
					</div>) : (<div ref={loadGuard}>
						<div className="footer-loading">Loading......</div>
					</div>) 
				}
			</div>
		</div >)
}

export default LongList;