import axios from 'axios'
import { Loading } from 'element-ui'

const debug = true
export let baseUrl = debug ? 'http://172.18.114.250:30200/' : 'https://01.lingyi365.com:443'
// export let baseUrl = "https://01.lingyi365.com:443";

//获取用户token
export const GetUserToken = () => {
  if (debug) {
    return 'WZ8azGAUy5a-djIY8SxaBlqe*-384BCCqRXD-JFMOriFx-rPcZ5KrQ..'
  } else {
    return browser().GetUserToken()
  }
}
//获取用户ID
export const GetUserID = () => {
  if (debug) {
    return '5ab9a7102d3b4105b491af45'  //yzg
    // return '5837d3b059242f1c60cf459f'
  } else {
    return browser().GetUserID()
  }
}
//ajax请求;地址,请求方式,提交数据,回调函数,超时时间（默认30秒）,请求时loading...(默认弹出)
export const ajax = (url = '', type = 'POST', data = {}, retCallback, timeout = 30000, loadingShow = true) => {
  type = type.toUpperCase()
  url = baseUrl + url
  let opaction = {
    method: type,
    url: url,
    timeout: timeout,
    data: data,
    params: data,
    headers: {
      Authentication: GetUserToken()
    }
  }
  showLoad()
  axios(opaction).then((response) => {
    closeLoad()
    retCallback(response.data)
  }, (err) => {
    closeLoad()
    console.log(err)
    alert('请求失败')
  })

  function showLoad () {
    if (loadingShow) {
      Loading.service({lock: true, text: 'Loading...'})
    }
  }

  function closeLoad () {
    if (loadingShow) {
      Loading.service({}).close()
    }
  }
}
/*支付跳转*/
export const Payment = (orderId, money, title, userId = GetUserID(), receiverId = '21dc2f8e-6e57-4eb5-afbb-a6910157dc21', callBackUrl = location.href) => {
  const url = debug ? 'http://172.18.115.100:87/Pages/PcOrderPay.html' : 'https://01.lingyi365.com/payweb/Pages/PcOrderPay.html'
  window.location.href = url + '?businessTypeCode=56&orderId=' +
    orderId + '&title=' + escape(title) +
    '&tradeMoney=' + money + '&receiverId=' + receiverId +
    '&userId=' + userId +
    '&token=' + GetUserToken() + '&backUrl=' + encodeURIComponent(callBackUrl)
}
// "http://172.18.115.100:87/Pages/PcOrderPay.html?businessTypeCode=56&orderId=00397548302&title=%u5347%u7EA7%u4FDD%u8BC1%u91D1&tradeMoney=42&receiverId=21dc2f8e-6e57-4eb5-afbb-a6910157dc21&token=WZ8azGAUy5a-djIY8SxaBlqe*-384BCCmTPEVXO6V9ebEf*4Ljhv7w..&userId=5ab9a7102d3b4105b491af45&backUrl=http%3A%2F%2Flocalhost%3A8080%2F%23%2Fcash_deposit%3Fok%3D1"
/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
Date.prototype.Format = function (fmt) {
  let o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

//去除字符串两边空格
export function Trim (str) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

//判断是否位数字
export function checkRate (nubmer) {
  var re = /^[0-9]+.?[0-9]*/
  if (!re.test(nubmer)) {
    return true
  } else {
    return false
  }
}
