export const REQUEST_UPDATE = 'REQUEST_UPDATE'
export function requestUpdate() {
    return {
        type : REQUEST_UPDATE
    }
}

export const RESPONSE_UPDATE = 'RESPONSE_UPDATE'
export function responseUpdate() {
    return {
        type : RESPONSE_UPDATE
    }
}

export const GET_SUCCESSED_UPDATE = 'GET_SUCCESSED_UPDATE'
export function getSuccessedUpdate(update) {
    return {
        type : GET_SUCCESSED_UPDATE,
        update
    }
}

export const GET_FAILED_UPDATE = 'GET_FAILED_UPDATE'
export function getFailedUpdate(error) {
    return {
        type : GET_FAILED_UPDATE,
        error
    }
}