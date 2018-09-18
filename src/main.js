import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Lycore from './assets/js/Lycore'
import QWebChannel from './assets/js/qwebchannel'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'
import './assets/css/reset.css'
import '../theme/index.css'
import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
/* eslint-disable no-eval */
if (process.env.NODE_ENV === 'development') {
  let lycore = new Lycore(null, null, null)
  Vue.prototype.lycore = lycore
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
} else {
  new QWebChannel(qt.webChannelTransport, function (channel) {
    var _qtbound = channel.objects.bound
    var _userLoginInfo = null
    var _userInEnterpriseInfo = null
    try {
      _userLoginInfo = eval('(' + _qtbound.GetUserLoginInfo + ')')
    } catch (e) {
      alert('获取用户信息失败！')
      return
    }

    try {
      _userInEnterpriseInfo = eval('(' + _qtbound.GetUserInEnterpriseInfo + ')')
    } catch (e) {
      //alert("获取企业信息失败！");
    }
    var lycore = new Lycore(_qtbound, _userLoginInfo, _userInEnterpriseInfo)
    localStorage.setItem('userToken', lycore.getUserToken())
    localStorage.setItem('userId', lycore.getUserId())
    Vue.prototype.lycore = lycore
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  })
}
