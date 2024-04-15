const urlParams = new URLSearchParams(window.location.search);
const zoomNumber = urlParams.get('zoom_number');
const password = urlParams.get('passWord')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

var authEndpoint = 'https://mtt-dev.fabbidev.com/api'
var meetingNumber = zoomNumber
var passWord = password
var role = 0
var userName =  urlParams.get('username') || ''
var userEmail = urlParams.get('useremail') || ''
var registrantToken = ''
var zakToken = ''
var leaveUrl = ''

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
  	console.log(error)
  })
}

function startMeeting(signature) {

  document.getElementById('zmmtg-root').style.display = 'block'
  console.log(signature, passWord, meetingNumber)
  ZoomMtg.init({
    leaveUrl: leaveUrl,
    patchJsMedia: true,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: '3DfnAgnXX3U6IwqKBdbYhtYKv1wZ6FN2EAZs',
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName || "Nhung LH",
        userEmail: userEmail || "hoibq@gmail.com",
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
