import ErrorCode from '@/constant/errorCode'

let util = (error_code) => {
    return ErrorCode[error_code] || `系统异常，请稍后重试(${error_code})`
}

export default util