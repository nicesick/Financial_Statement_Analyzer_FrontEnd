export const REQUEST_CORP_DETAIL = 'REQUEST_CORP_DETAIL'
export function requestCorpDetail() {
    return {
        type : REQUEST_CORP_DETAIL
    }
}

export const RESPONSE_CORP_DETAIL = 'RESPONSE_CORP_DETAIL'
export function responseCorpDetail() {
    return {
        type : RESPONSE_CORP_DETAIL
    }
}

export const GET_SUCCESSED_CORP_DETAIL = 'GET_SUCCESSED_CORP_DETAIL'
export function getSuccessedCorpDetail(corpDetail) {
    return {
        type : GET_SUCCESSED_CORP_DETAIL,
        corpDetail
    }
}

export const GET_FAILED_CORP_DETAIL = 'GET_FAILED_CORP_DETAIL'
export function getFailedCorpDetail(error) {
    return {
        type : GET_FAILED_CORP_DETAIL,
        error
    }
}