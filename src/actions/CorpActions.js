export const REQUEST_CORPS = 'REQUEST_CORPS'
export function requestCorps() {
    return {
        type : REQUEST_CORPS
    }
}

export const RESPONSE_CORPS = 'RESPONSE_CORPS'
export function responseCorps() {
    return {
        type : RESPONSE_CORPS
    }
}

export const GET_SUCCESSED_CORPS = 'GET_SUCCESSED_CORPS'
export function getSuccessedCorps(response) {
    return {
        type        : GET_SUCCESSED_CORPS,
        corpInfos   : response.data
    }
}

export const GET_FAILED_CORPS = 'GET_FAILED_CORPS'
export function getFailedCorps(error) {
    return {
        type : GET_FAILED_CORPS,
        error
    }
}