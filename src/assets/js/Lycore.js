//公用方法
export default class Lycore {
  constructor (bound, userLoginInfo, userEnterpriseInfo) {
    this.bound = bound
    this.userLoginInfo = userLoginInfo
    this.userEnterpriseInfo = userEnterpriseInfo
    this.pageSize = 10
  }

  getUserId () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '5ab9a7102d3b4105b491af45'
    } else {
      return this.userLoginInfo.UserInfo.Data.UserId
    }
  }

  getUserName () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '云中歌'
    } else {
      return this.userEnterpriseInfo.Member.MemberName
    }
  }

  getUserToken () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return 'WZ8azGAUy5a-djIY8SxaBlqe*-384BCCeuraYf5iKQm1H1RwlYJtpQ..'
    } else {
      return this.userLoginInfo.Token
    }
  }

  getIsProduction () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '0'
    } else {
      var isProduction = this.bound.GetIsProduction
      if (isProduction == '1') {
        return '1'
      }
      return '0'
    }
  }

  getBaseUrl () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return 'http://ope.lingyi365.com:5608'
    } else {
      return this.userLoginInfo.BaseUrl
    }
  }

  getApiUrl () {
    return this.getBaseUrl() + '/cloud/rest-home/'
  }

  getEnterpriseApiUrl () {
    return this.getBaseUrl() + '/oa/'
  }

  getEnterpriseId () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '320156f5-d12d-4831-b110-a68600a8322e'
    } else {
      return this.userEnterpriseInfo.EnterpriseID
    }
  }

  getDeparmentName () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '研发部'
    } else {
      return this.userEnterpriseInfo.Department.DepartmentName
    }
  }

  getIsEnterpriseAdmin () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '1'
    } else {
      return this.userEnterpriseInfo.IsEnterpriseAdmin
    }
  }

  getIsDepartmentAdmin () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '1'
    } else {
      return this.userEnterpriseInfo.Department.IsDepartmentAdmin
    }
  }

  getUserRegTrueName () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '张强'
    } else {
      return this.userLoginInfo.UserInfo.Data.TrueName
    }
  }

  getUserNickName () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return 'poppy'
    } else {
      return this.userLoginInfo.UserInfo.Data.NickName
    }
  }

  getUserRegMobile () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '17346525230'
    } else {
      return this.userLoginInfo.UserInfo.Data.Phone
    }
  }

  getUserRegImage () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return ''
    } else {
      return this.userLoginInfo.UserInfo.Data.UserImage
    }
  }

  openTabWindow (id, name, url) {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      window.open(url)
    } else {
      this.bound.OpenTabWindow(id, name, url)
    }
  }

  closeTabWindow (id) {
    this.bound.CloseTabWindow(id)
  }

  openPDFView (uName, uFile) {
    this.bound.OpenPDFView(uName, uFile)
  }

  reSetEnterprise (enterpriseID) {
    this.bound.SetEnterpriseSpace(enterpriseID)
  }

  openChatWindow (uID, uName) {
    this.bound.OpenChatWindow(uID, uName, '1001')
  }

  getUserAuth (moduleID) {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return '1'
    } else {
      var authorityList = this.userEnterpriseInfo.UserAuthorityList
      if (authorityList && authorityList instanceof Array && authorityList.length > 0) {
        for (var index = 0; index < authorityList.length; index++) {
          var element = authorityList[index]
          if (element.ModuleID == moduleID && element.Permission > 0) {
            return '1'
          }
        }
      }
      return '0'
    }
  }

  getUploadUrl () {
    return this.getBaseUrl() + '/bms/File/uploadOneFile'
  }

  getHeaders () {
    return {
      Authentication: this.getUserToken()
    }
  }

  getWebUrl () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return 'http://localhost:8080/#/'
    }
    return this.getBaseUrl() + '/webui/web06/RestHome/dist/index.html#/'
  }

  getNativeWebUrl () {
    if (process.env.NODE_ENV === 'development' || this.isDebug) {
      return 'http://localhost:8080/#/'
    }
    return this.getBaseUrl() + '/webui/web06/RestHome/views/'
  }
}
