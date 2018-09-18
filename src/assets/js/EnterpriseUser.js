//支持qt使用的工作板块基础js
var _qtbound

$(function () {
  new QWebChannel(qt.webChannelTransport, function (channel) {
    _qtbound = channel.objects.bound
    var qtLogin = _qtbound.GetUserLoginInfo
    var qtEnterpriseInfo = _qtbound.GetUserInEnterpriseInfo

    try {
      _userLoginInfo = eval('(' + qtLogin + ')')
    }
    catch (e) {
      alert('获取用户信息失败！')
      return
    }

    try {
      _userInEnterpriseInfo = eval('(' + qtEnterpriseInfo + ')')
    }
    catch (e) {
      //alert("获取企业信息失败！");
    }
    if (typeof WebPageInit != 'undefined' && WebPageInit instanceof Function) {
      WebPageInit()
    }
  })
})

var isDeBug = false  //是否在调试状态

var _userLoginInfo  //用户登录获取的所有信息
var _userInEnterpriseInfo //用户在企业下所有的信息

function ReSetParm (_userInfo, _enterpriseInfo) {
  _userLoginInfo = _userInfo
  _userInEnterpriseInfo = _enterpriseInfo
}

//获取当前使用的网络 1为内网 0为外网
function GetIsProduction () {
  if (isDeBug == true) {
    return 0
  }
  else {
    if (_qtbound == undefined) {
      var isProduction = _userLoginInfo.IsProduction
    } else {
      var isProduction = _qtbound.GetIsProduction
    }
    if (isProduction == '1') return 1
    return 0
  }
}

//获取用户的token
function GetUserToken () {
  if (isDeBug == true)
    return '未知'
  else {
    if (_qtbound == undefined) {
      return _userLoginInfo.Token
    } else {
      return _qtbound.GetUserToken
    }
  }
}

function GetUserID () {
  if (isDeBug == true)
    return '未知'
  else {
    if (_qtbound == undefined) {
      return _userLoginInfo.UserInfo.Data.UserId
    } else {
      return _qtbound.GetUserID
    }
  }
}

/**工作板块公用方法定义(触发qt方法)*******************************/
//在新的tab窗口中打开一个连接
function OpenTabWindow (id, name, url) {
  _qtbound.OpenTabWindow(id, name, url)
}

//关闭一个已经打开的窗口
function CloseTabWindow (id) {
  _qtbound.CloseTabWindow(id)
}

//发起聊天 uID-UserID,uName-UserName  FromWork
function OpenChatWindow (uID, uName) {
  _qtbound.OpenChatWindow(uID, uName, '1001')
}

//预览pdf文件
function OpenPDFView (uName, uFile) {
  _qtbound.OpenPDFView(uName, uFile)
}

/**工作板块企业调用方法方法定义(触发qt方法)*******************************/
//打开一个新的工作区
function OpenOrgan (organType, organID) {
  _qtbound.OpenOrgan(organType, organID)
}

//打开新的企业,不显示订单
function SetEnterpriseSpace (enterpriseID) {
  _qtbound.SetEnterpriseSpace(enterpriseID)
}

//刷新页面上的角标
function BackGetReportData () {
  _qtbound.BackGetReportData()
}

//刷新首页图标
function EnterpriseRefresh () {
  _qtbound.EnterpriseRefresh()
}

//当前用户的权限改变时，刷新所有页面
function SetResetUserAuth () {
  _qtbound.SetResetUserAuth()
}

//退出企业
function EnterpriseOut () {
  _qtbound.EnterpriseOut()
}

//切换部门
function ReSetDepartment (departID) {
  _qtbound.ReSetDepartment(departID)
  alert('正在切换部门......')
}

//当前用户注册的手机号
function GetUserRegMobile () {
  if (isDeBug == true)
    return '18410407088'
  else {
    return _userLoginInfo.UserInfo.Data.Phone
  }
}

//当前用户注册的头像
function GetUserRegImage () {
  if (isDeBug == true)
    return ''
  else {
    return _userLoginInfo.UserInfo.Data.UserImage
  }
}

/**企业初始化信息*******************************/
function GetUserName () {
  if (isDeBug == true)
    return '何少旭'
  else {
    return _userInEnterpriseInfo.Member.MemberName
  }
}

//获取组织编号
function GetEnterpriseID () {
  if (isDeBug == true)
    return 'c8e0ca6b-b024-4ad1-8c9f-a798012d9724'
  else {
    return _userInEnterpriseInfo.EnterpriseID
  }
}

//组织名称
function GetEnterpriseName () {
  if (isDeBug == true)
    return '高建平那个测试'
  else {
    return _userInEnterpriseInfo.EnterpriseName
  }
}

function GetDepartmentID () {
  if (isDeBug == true)
    return '707f160e-cb64-41ba-8890-a760012f2f88'
  else {
    return _userInEnterpriseInfo.Department.DepartmentID
  }
}

function GetDepartmentName () {
  if (isDeBug == true)
    return '开发3部'
  else {
    return _userInEnterpriseInfo.Department.DepartmentName
  }
}

function GetUserMobile () {
  if (isDeBug == true)
    return '12345678901'
  else {
    return _userInEnterpriseInfo.Member.Mobile
  }
}

function GetIsEnterpriseAdmin () {
  if (isDeBug == true)
    return '1'
  else {
    return _userInEnterpriseInfo.IsEnterpriseAdmin
  }
}

//是否部门管理员
function GetIsDepartmentAdmin () {
  if (isDeBug == true)
    return '1'
  else {
    return _userInEnterpriseInfo.Department.IsDepartmentAdmin
  }
}

//获取用户在企业下的头像
function GetEnterpriseUserPhoto () {
  if (isDeBug == true)
    return ''
  else {
    return _userInEnterpriseInfo.Member.UserImage
  }
}

//获取系统参数
function GetSystemPara (paraID) {
  if (isDeBug == true)
    return '1'
  else {
    var authorityList = _userInEnterpriseInfo.SystemParas
    for (var index = 0; index < authorityList.length; index++) {
      var element = authorityList[index]
      if (element.ParaID == paraID) {
        return element.Val
      }
    }
  }
}

//获取是否使用工作密码 1-使用  0不使用
function GetUseWorkPwd (specialModuleID) {
  if (isDeBug == true)
    return '1'
  else {
    var authorityList = _userInEnterpriseInfo.WorkPwdModuleList
    for (var index = 0; index < authorityList.length; index++) {
      var element = authorityList[index]
      if (element.WPModuleID == specialModuleID) {
        if (element.Permission > 0) {
          return '1'
        }
      }
    }
    return '0'
  }
}

/**用户权限信息*******************************/
//模块是否有权限
function GetUserAuth (moduleID) {
  if (isDeBug == true)
    return '1'
  else {
    //return browser().GetUserAuth(moduleID);  //不为1时，返回代码
    if (!_userInEnterpriseInfo.UserAuthorityList) {
      return '0'
    } else {
      var authorityList = _userInEnterpriseInfo.UserAuthorityList
      for (var index = 0; index < authorityList.length; index++) {
        var element = authorityList[index]
        if (element.ModuleID == moduleID) {
          if (element.Permission > 0) {
            return '1'
          }
        }
      }
      return '0'
    }
  }
}

//业务模块是否有权限
function GetUserBusinessAuth (moduleID, btype, bid) {
  if (isDeBug == true)
    return '1'
  else {
    //return browser().GetUserBusinessAuth(moduleID, btype, bid);  //不为1时，返回错误代码
    if (!_userInEnterpriseInfo.UserAuthorityList) {
      return '0'
    } else {
      var authorityList = _userInEnterpriseInfo.UserAuthorityList
      for (var index = 0; index < authorityList.length; index++) {
        var element = authorityList[index]
        if (element.ModuleID == moduleID) {
          if (element.Permission > 0) {
            if (element.ModuleExtType == btype && element.BID == bid) {
              return '1'
            }
          }
        }
      }
      return '0'
    }
  }
}

//获取业务ID
function GetUserBussinessID (moduleID, btype) {
  if (isDeBug == true)
    return '@id1,id2'
  else {
    //return browser().GetUserBussinessID(moduleID, btype);  //返回格式@id1,id2,id3,不是以@开头的都是错误提示
    if (btype == 0) return '模块编号为空，请和管理员联系'
    if (!_userInEnterpriseInfo.UserAuthorityList) {
      return '工作模块中没有权限信息'
    } else {
      var arr = []
      var str = '@'
      $.each(_userInEnterpriseInfo.UserAuthorityList, function (item, index) {
        if (item.ModuleExtType == btype && item.ModuleID == moduleID) {
          arr.push(item.BID)
        }
      })

      $.each(arr, function (item, index) {
        if (!!arr[index]) {
          str += arr[index] + ','
        }
      })
      str.substring(0, re.Length - 1)
      return str
    }
  }
}
