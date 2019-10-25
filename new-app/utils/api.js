const baseUrl = 'https://www.bangbangtiezi.com:8081';
// const baseUrl = 'https://192.168.3.125:8081';

const http = ({ url = '', param = {}, method, ...other } = {}) => {
  let timeStart = Date.now();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      method: method,
      data: param,
      header: {
        'content-type': 'application/json', // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
        // 'content-type': method == 'get' ? 'application/json' : 'application/x-www-form-urlencoded',
      },
      ...other,
      complete: (res) => {
        wx.hideLoading();
        console.log(`耗时${Date.now() - timeStart}`);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

const getUrl = (url) => {
  if (url.indexOf('://') == -1) {
    url = baseUrl + url;
  }
  return url
}

// get方法
const _get = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'get'
  })
}

const _post = (url, param = {}) => {
  return http({
    url,
    param,
    method: 'post'
  })
}

module.exports = {
  baseUrl,
  _get,
  _post
}