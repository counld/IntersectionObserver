import { useReducer } from "react";


const initialState = {
  sourceList: [],
	currentViewList: [],
  loading: false,
	itemHeight: 0,
	translateY: 0,
  visible: false,
  pageHeight: 0,
}

const reducer = (state, action) => {
   let newState = {...state};
  switch(action.type) {
		case 'SET_INIT':
      newState.sourceList = action.list;
      break
    case 'SET_SOURCELIST':
      newState.sourceList = newState.sourceList.concat(action.sourceList);
      break
		case 'SET_CURRENTVIEWLIST':
			newState.currentViewList = action.currentViewList;
			break
    case 'OPEN_LOADING':
      newState.loading = true;
      break;
    default: 
      newState = state;
  }
  return newState
}


export default function getChangeValue() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return [state, dispatch]
}
