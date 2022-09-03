import React, { useState } from "react";
import LongList from "./component/longList";

const List = () => {
	const [size, setSize] = useState(10);
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1000);
	// 获取数据
	const list = new Array(2000).fill(1).map((item, index) => ({ key: index, text:  index}))
	const onLoading = ({ done }) => {
        const maxSize = Math.min(size, total)
        const maxPage = ~~(total / maxSize) + (total % maxSize === 0 ? 0 : 1)
				console.log(page,'page')
				done(page === maxPage)
    }
	
	return(
		<LongList 
			load={onLoading}
			size={size}
			list={list}
		/>
	)
}

export default List