export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://cardshopapi.koudaiqifu.cn' : 'http://cardapi.fxqifu.com' // 测试环境host
// export const BASE_URL = 'http://cardapi.fxqifu.com';//正式环境host
export const UPLOAD_URL = BASE_URL + '/v1/upload' // 上传图片接口地址
