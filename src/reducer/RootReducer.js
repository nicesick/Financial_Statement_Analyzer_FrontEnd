import { combineReducers } from 'redux'

import { isCorpInfosRequested, corpInfos }      from './SearchReducer'
import { isCorpDetailRequested, corpDetail }    from './ResultReducer'
import { isUpdateRequested, updateTime }        from './UpdateReducer'

import search from '../slice/SearchSlice'
import update from '../slice/UpdateSlice'
import analyze from '../slice/AnalyzeSlice'

const RootReducer = combineReducers({
      search,
      update,
      analyze
});

export default RootReducer