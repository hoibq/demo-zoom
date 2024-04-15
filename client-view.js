const urlParams = new URLSearchParams(window.location.search);
const zoomNumber = urlParams.get('zoom_number');
const password = urlParams.get('password')

ZoomMtg.preLoadWasm()
ZoomMtg.prepareWebSDK()

var authEndpoint = 'http://localhost:4000'
var sdkKey = ''
var meetingNumber = zoomNumber
var passWord = password
var role = 0
var userName =  urlParams.get('username') || 'JavaScript'
var userEmail = urlParams.get('useremail') || ''
var registrantToken = ''
var zakToken = ''
var leaveUrl = 'https://zoom.us'

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

  ZoomMtg.init({
    leaveUrl: leaveUrl,
    patchJsMedia: true,
    success: (success) => {
      console.log(success)
      ZoomMtg.join({
        signature: signature,
        sdkKey: sdkKey,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (success) => {
          console.log(success)
        },
        error: (error) => {
          console.log(2, error)
        },
      })
    },
    error: (error) => {
      console.log(error)
    }
  })
}
