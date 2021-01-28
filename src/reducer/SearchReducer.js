import { GET_FAILED_CORPS, GET_SUCCESSED_CORPS, REQUEST_CORPS, RESPONSE_CORPS } from '../actions/CorpActions'

export function isCorpInfosRequested(state = false, action) {
    switch(action.type) {
        case REQUEST_CORPS:
            return true;
        case RESPONSE_CORPS:
            return false;
        default:
            return state;
    }
}

export function corpInfos(state = {}, action) {
    switch(action.type) {
        case GET_SUCCESSED_CORPS:
            return Object.assign({}, state, {
                status  : true,
                data    : action.corpInfos
            });
        case GET_FAILED_CORPS:
            return Object.assign({}, state, {
                status  : false
            });
        default:
            return state;
    }
}