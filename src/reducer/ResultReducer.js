import { REQUEST_CORP_DETAIL, RESPONSE_CORP_DETAIL, GET_SUCCESSED_CORP_DETAIL, GET_FAILED_CORP_DETAIL } from '../actions/CorpDetailActions'

export function isCorpDetailRequested(state = false, action) {
    switch(action.type) {
        case REQUEST_CORP_DETAIL:
            return true;
        case RESPONSE_CORP_DETAIL:
            return false;
        default:
            return state;
    }
}

export function corpDetail(state = {}, action) {
    switch(action.type) {
        case GET_SUCCESSED_CORP_DETAIL:
            return Object.assign({}, action.corpDetail, {
                status : true
            });;
        case GET_FAILED_CORP_DETAIL:
            return Object.assign({}, state, {
                status : false
            });
        default:
            return state;
    }
}