import axios from 'axios'
import { Loading } from 'element-ui'

let util = {}
util.install = function (Vue, options) {
  Vue.prototype.ajax = function (url = '', type = 'POST', data = {}, retCallback, timeout = 30000, loadingShow = true) {
    let token = Vue.prototype.lycore.getUserToken()
    type = type.toUpperCase()
    url = Vue.prototype.baseUrl + url
    let opaction = {
      method: type,
      url: url,
      timeout: timeout,
      data: data,
      params: data,
      headers: {
        Authentication: token
      }
    }
    showLoad('Loading...')
    axios(opaction).then((response) => {
      closeLoad()
      retCallback(response.data)
    }, (err) => {
      closeLoad()
      console.log(err)
      alert('请求失败')
    })

    function showLoad (text) {
      if (loadingShow) {
        Loading.service({lock: true, text: text})
      }
    }

    function closeLoad () {
      if (loadingShow) {
        Loading.service({}).close()
      }
    }
  }
  //支付组件
  Vue.prototype.payment = function (orderId, money, title, userId, receiverId, callBackUrl = location.href) {
    receiverId = receiverId || '21dc2f8e-6e57-4eb5-afbb-a6910157dc21'
    const url = debug ? 'http://ope.lingyi365.com:5608/payweb/Pages/PcOrderPayExe.html' : 'https://01.lingyi365.com/payweb/Pages/PcOrderPayExe.html'
    const UId = userId || localStorage.getItem('userId')
    Loading.service({lock: true, text: '正在调用支付组件，请稍等...'})
    setTimeout(function () {
      window.location.href = url + '?businessTypeCode=56&orderId=' +
        orderId + '&title=' + escape(title) +
        '&tradeMoney=' + money + '&receiverId=' + receiverId +
        '&userId=' + UId +
        '&token=' + userToken + '&backUrl=' + encodeURIComponent(callBackUrl)
    }, 2000)
  }
//去除字符串两边空格
  Vue.prototype.trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  //判断是否位数字
  Vue.prototype.checkRate = function (nubmer) {
    var re = /^[0-9]+.?[0-9]*/
    if (!re.test(nubmer)) {
      return true
    } else {
      return false
    }
  }
}
export default util
