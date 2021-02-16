import { combineReducers } from 'redux'

import { isCorpInfosRequested, corpInfos }      from './SearchReducer'
import { isCorpDetailRequested, corpDetail }    from './ResultReducer'
import { isUpdateRequested, updateTime }        from './UpdateReducer'

import search from '../slice/SearchSlice'

const RootReducer = combineReducers({
    search
});

export default RootReducer