var getJSON = function (url, callback) {
  var promise = new Promise(function (resolve, reject) {
    var client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler//readyState属性的值由一个值变为另一个值时，都会触发readystatechange事件
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()

    function handler () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        callback(this.response)
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
  })
  return promise
}

getJSON('./e2e-tests/get.json', function (resp) {
  console.log('get:' + resp.name)
}).then(function (json) {
  getJSON('./e2e-tests/get2.json', function (resp) {
    console.log('get2:' + resp.name)
  })
}).catch(function (error) {
  console.log('error1：' + error)
})
