import { REQUEST_UPDATE, RESPONSE_UPDATE, GET_SUCCESSED_UPDATE, GET_FAILED_UPDATE } from '../actions/UpdateActions'

export function isUpdateRequested(state = false, action) {
    switch(action.type) {
        case REQUEST_UPDATE:
            return true;
        case RESPONSE_UPDATE:
            return false;
        default:
            return state;
    }
}

export function updateTime(state = {}, action) {
    switch(action.type) {
        case GET_SUCCESSED_UPDATE:
            if (Object.keys(action.update).length > 0) {
                return Object.assign({}, action.update, {
                    updateDate : action.update.updateDate.substr(0, 10)
                });
            } else {
                return Object.assign({}, action.update);
            }
        case GET_FAILED_UPDATE:
            return Object.assign({}, state, {
                progress : 'error'
            });
        default:
            return state;
    }
}