import { combineReducers } from 'redux'

import { isCorpInfosRequested, corpInfos }      from './SearchReducer'
import { isCorpDetailRequested, corpDetail }    from './ResultReducer'
import { isUpdateRequested, updateTime }        from './UpdateReducer'

const RootReducer = combineReducers({
    isCorpInfosRequested
    , corpInfos
    , isCorpDetailRequested
    , corpDetail
    , isUpdateRequested
    , updateTime
});

export default RootReducer