var firebaseConfig = {
  apiKey: 'AIzaSyBKbNUGmDee-xXjX9Vp0AL43Brg4-Q63pA',
  authDomain: 'creditcards-8e8c5.firebaseapp.com',
  databaseURL: 'https://creditcards-8e8c5.firebaseio.com',
  projectId: 'creditcards-8e8c5',
  storageBucket: 'creditcards-8e8c5.appspot.com',
  messagingSenderId: '359172779245',
  appId: '1:359172779245:web:c346aab37a1723a57f30e4',
  measurementId: 'G-T0354PFK5F'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()
const db = firebase.firestore()
const auth = firebase.auth()
var user,
  email,
  username,
  modal,
  loading,
  paymodal,
  data,
  amt,
  index,
  message,
  bal,
  tba,
  stringitems,
  item,
  topup = false,
  signedin = false
var q = {
  data: {
    addresses: {
      ethereum: '0x61a9e9515c94bb893adccce1eb5d1dd7d7e4a626',
      dai: '0x61a9e9515c94bb893adccce1eb5d1dd7d7e4a626',
      bitcoincash: 'qqwda3c42khq3hzt0w72zjv8fp9qfcehevwscj56ec',
      dogecoin: 'D7XMerR115omPBT92mP5tysPYNbxJQaU8J',
      litecoin: 'MD9HGeexe9HSxZgTGasPzTbirXo26DJ7kq',
      bitcoin: '3FaUMrjHvqzApne3m1ZLZXBzYr4auvRmS3'
    },
    cancel_url: 'https://charge/canceled/page',
    code: '5KDPD74A',
    created_at: '2022-01-07T14:45:07Z',
    description: 'Mastering the Transition to the Information Age',
    exchange_rates: {
      'ETH-USD': '3218.235',
      'BTC-USD': '41946.365',
      'LTC-USD': '132.86',
      'DOGE-USD': '0.15325',
      'BCH-USD': '389.745',
      'DAI-USD': '1.000007'
    },
    expires_at: '2022-01-07T15:45:07Z',
    fees_settled: true,
    hosted_url: 'https://commerce.coinbase.com/charges/5KDPD74A',
    id: '9f7c8e54-f465-42d6-b437-01c111f950cf',
    local_exchange_rates: {
      'ETH-USD': '3218.235',
      'BTC-USD': '41946.365',
      'LTC-USD': '132.86',
      'DOGE-USD': '0.15325',
      'BCH-USD': '389.745',
      'DAI-USD': '1.000007'
    },
    metadata: {
      customer_id: 'id_1005',
      customer_name: 'Satoshi Nakamoto'
    },
    name: 'The Sovereign Individual',
    organization_name: 'AppDevLap',
    payment_threshold: {
      overpayment_absolute_threshold: {
        amount: '5.00',
        currency: 'USD'
      },
      overpayment_relative_threshold: '0.005',
      underpayment_absolute_threshold: {
        amount: '5.00',
        currency: 'USD'
      },
      underpayment_relative_threshold: '0.005'
    },
    payments: [],
    pricing: {
      local: {
        amount: '100.00',
        currency: 'USD'
      },
      ethereum: {
        amount: '0.031073000',
        currency: 'ETH'
      },
      dai: {
        amount: '99.999300004899965700',
        currency: 'DAI'
      },
      bitcoincash: {
        amount: '0.25657802',
        currency: 'BCH'
      },
      dogecoin: {
        amount: '652.52854810',
        currency: 'DOGE'
      },
      litecoin: {
        amount: '0.75267199',
        currency: 'LTC'
      },
      bitcoin: {
        amount: '0.00238400',
        currency: 'BTC'
      }
    },
    pricing_type: 'fixed_price',
    pwcb_only: false,
    redirect_url: 'https://charge/completed/page',
    resource: 'charge',
    support_email: 'appdevlap@gmail.com',
    timeline: [
      {
        status: 'NEW',
        time: '2022-01-07T14:45:07Z'
      }
    ],
    utxo: false
  }
}
auth.onAuthStateChanged(user => {
  authtrack(user)
})

async function authtrack (user) {
  if (user) {
    // console.log('User logged in successfully')
    removeelements()
    getuserdetials(user.email)
    signedin = true
  } else {
    //console.log('User not signed in')
    signedin = false

  }
}

function removeelements () {
  var islogin = localStorage.getItem('login')
  if (islogin !== null && islogin === 'true') {
  
    if (
      document.getElementById('auth-div-on') !== null &&
      document.getElementById('auth-div') !== null
    ) {
      var li = document.getElementById('auth-div')
      var li2 = document.getElementById('auth-div-on')
      li.classList.add('hide-element')
      li2.classList.remove('hide-element')
     
    }
  }else{
    setInterval(()=>{
    document.querySelector('.acc').classList.add('hide-element')
    })
  }
}
function addelements () {}

function hidepopup () {
  modal.style.display = 'none'
}

function load () {
  loading.style.display = 'block'
}
function stopload () {
  loading.style.display = 'none'
}

$(document).ready(() => {
  // Get the modal
  modal = document.getElementById('myModal')
  loading = document.getElementById('myLoadingModal')
  message = document.getElementById('myMessageModal')
  paymodal = document.getElementById('PaymentModal')
  lookupmodal = document.getElementById('LookupModal')
  // var btn = document.getElementById('myBtn')

  //   PopupConfirmModel("Title Text", "Body text too goes in here...", cc)
 
})
function PopupMessageModel (title, msg, color, callback) {
  message.style.display = 'block'

  $('#myMessageModal .modal-exit').click(() => {
    message.style.display = 'none'
    callback()
  })
  $('#myMessageModal .modal-cancel').click(() => {
    message.style.display = 'none'
    callback()
  })
  $('#myMessageModal .modal-content').css('color', '#ffffff')
  $('#myMessageModal .modal-content').css('background', color)
  $('#myMessageModal .modal-content').css('border', 'none')

  $('#myMessageModal h2').text(title)

  $('#myMessageModal p').text(msg)

  window.onclick = function (event) {
    if (event.target == modal) {
      message.style.display = 'none'
    }
  }
}
function OpenLookupCC (title, msg) {
  lookupmodal.style.display = 'block'

  $('#LookupModal .modal-exit').click(() => {
    lookupmodal.style.display = 'none'
    
  })
  $('#LookupModal .modal-cancel').click(() => {
    lookupmodal.style.display = 'none'
    
  })
 

  $('#LookupModal h2').text(title)

  window.onclick = function (event) {
    if (event.target == modal) {
      lookupmodal.style.display = 'none'
    }
  }
}


function PopupConfirmModel (title, message, callback) {
  modal.style.display = 'block'

  $('.modal-exit').click(() => {
    modal.style.display = 'none'
  })
  $('.modal-cancel').click(() => {
    modal.style.display = 'none'
  })
  $('.modal-accept').click(() => {
    modal.style.display = 'none'
  })

  $('.modal-accept').click(() => {
    callback()
  })
  $('#myModal h2').text(title)

  $('#myModal p').text(message)

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
}

function getuserdetials (email) {
  db.collection('unicctoolsuserdetails')
    .doc(email)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        localStorage.setItem('login', 'true')
        localStorage.setItem('email', doc.data()['email'])
        localStorage.setItem('uid', doc.data()['userid'])
        localStorage.setItem('username', doc.data()['username'])
        localStorage.setItem('balance', doc.data()['balance'])
        localStorage.setItem('verified', doc.data()['verified'])
        localStorage.setItem('password', doc.data()['password'])
      }
    })
}
function removeuserdetials () {
  localStorage.setItem('login', 'false')
  localStorage.removeItem('email')
  localStorage.removeItem('uid')
  localStorage.removeItem('username')
  localStorage.removeItem('balance')
  localStorage.removeItem('verified')
  localStorage.removeItem('password')
}
function signout () {
  load()
  hidepopup()
  historymaker(localStorage.getItem('uid'), `You signed out of your account.`)
  auth.signOut().then(() => {
    stopload()
    removeuserdetials()
    location.replace('/auth')
  })
}

//signout user
$('#auth-div-on #auth-id').click(()=>{
  logout()
})


function logout () {
  PopupConfirmModel(
    'Logout',
    'Do you really want to logout from this account?',
    signout
  )
}

function signinuser () {
  hidepopup
  location.replace('/auth')
}

function makePurchase (bal, item) {
  var username = localStorage.getItem('username')
  var balance = localStorage.getItem('balance')
  var email = localStorage.getItem('email')
  var uid = localStorage.getItem('uid')

  if (topup) {
    db.collection('unicctoolsuserdetails')
      .doc(email)
      .update({ balance: bal + parseInt(balance) })
      .then(function (val) {
        PopupMessageModel(
          'Account Fund',
          `You have successfully topped up your account for $${bal} . Check your account pannel for your purchase details.`,
          '#009e1a',
          () => {
            location.reload()
          }
        )
        getuserdetials(email)
        historymaker(
          uid,
          `Account fund order ${item[2]} was successfull at ${item[3]}`
        )
      })
      .catch(e => {
        historymaker(
          uid,
          `Account fund order ${item[2]} was not successfull at ${item[3]}`
        )
        PopupMessageModel('PURCHASING ERROR', e, '#b60b0b', () => {})
      })
    return
  } else {
    db.collection('unicctoolsuserpurchase')
      .doc(email)
      .collection(uid)
      .doc()
      .set({
        product: item[0],
        data: item[1],
        order: item[2],
        datetime: item[3]
      })
      .then(function (val) {
        historymaker(
          uid,
          `Successfull purchase a(an) ${item[0]} for $${amt} with order# ${item[2]} at ${item[3]}`
        )
        db.collection('unicctoolsuserdetails')
          .doc(email)
          .update({ balance: bal })
          .then(function (val) {
            PopupMessageModel(
              'SUCCESSFULL PURCHASE',
              'You have successfully purchase item of order ' +
                item[2] +
                '. Check your account pannel for your purchase details.',
              '#009e1a',
              () => {
                location.reload()
              }
            )
            getuserdetials(email)
          })

        //location.reload()
        // return
      })
      .catch(e => {
        historymaker(uid, `Order ${item[2]} was not successfull at ${item[3]}`)
        PopupMessageModel('PURCHASING ERROR', e, '#b60b0b', () => {})
      })
  }
}

function loadAPI (amt) {
  var email = localStorage.getItem('email')
  var uid = localStorage.getItem('uid')
  var username = localStorage.getItem('username')
  var balance = localStorage.getItem('balance')

  var url = 'https://api.commerce.coinbase.com/charges/'

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')
  xhr.setRequestHeader('X-CC-Version', '2018-03-22')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status)

      console.log(url, JSON.parse(xhr.responseText).data)

      /* localStorage.setItem(
        'pay',
        'https://api.commerce.coinbase.com/charges/' +
          JSON.parse(xhr.responseText).data.code.toString()
      ) */

      //OpenPaymentModal(JSON.parse(xhr.responseText).data)

      OpenPaymentModal(JSON.parse(xhr.responseText).data)
    }
  }

  var data = `{
       "name": "UNICCSTOOLS",
       "description": "Make your payment to recieve your Credit Card info for the amount, $${amt} placed via any of the crypto wallet address below, you can choose to pay with any of the underlisted cryptocoins below.",
       "local_price": {
         "amount": "${amt}",
         "currency": "USD"
       },
       "pricing_type": "fixed_price",
       "metadata": {
         "customer_id": "${genstr(10)}",
         "customer_name": "${username}",
         "customer_email": "${email}",
         "date_tme": "${Date()}"
       },
       "redirect_url": "https://charge/completed/page",
       "cancel_url": "https://charge/canceled/page"
     }`
  console.log('Data:', amt, genstr(10), username, email)

  xhr.send(data)
}
function genstr (len) {
  var p = '0123456789'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}
function genorder (len) {
  var p = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}
function none () {}

function buynow () {
  modal.style.display = 'none'
  bal = parseInt(localStorage.getItem('balance'))
  tba = bal - amt
  stringitems = `network: ${data[index].network}\n
     card: ${data[index].card}${genstr(10)}\n
     cvv: ${data[index].cvv}\n
     pin: ${data[index].pin}\n
     expiry: ${data[index].expiry}\n
     bank: ${data[index].bank}\n
     balance: ${data[index].balance}\n
     fullname: ${data[index].fullname}\n
     email: ${data[index].email}\n
     phone: ${data[index].phone}\n
     address: ${data[index].address}\n
     zip: ${data[index].zip}\n
     country: ${data[index].country}\n
     state: ${data[index].state}\n
     city: ${data[index].city}`

  item = [$('.top-products').val(), stringitems, genorder(8), Date()]
  if (bal < amt) {
    loadAPI(amt)
    return
  } else {
    //console.log(tba, item)
    makePurchase(tba, item)
    return
  }
}

function historymaker (uid, activity) {
  db.collection('unicctoolsuserhistory')
    .doc(uid)
    .collection('history')
    .doc(Date.parse(Date()).toString())
    .set({
      data: activity,
      time: Date()
    })
}

function closepayment () {
  paymodal.style.display = 'none'
}
function OpenPaymentModal (data) {
  paymodal.style.display = 'block'
  var created = Date.parse(data.created_at)
  var ending = Date.parse(data.expires_at)
  var now = Date.parse(Date())

  //console.log(created, ending, now)

  let s = setInterval(() => {
    if (now >= ending) {
      //todo
      PopupMessageModel(
        'Time up',
        'The allocated time for the payment to be made has ellaped. Payment cancelled',
        '#b60b0b',
        closepayment
      )
      clearInterval(s)
    }
  }, 60000)

  paywithBTC(data)
}

function paywithBTC (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                          <option value="1">Bitcoin</option>
                          <option value="2">Ethereum</option>
                          <option value="3">Litecoin</option>
                          <option value="4">Bitcoin Cash</option>
                          <option value="5">Dai</option>
                          <option value="6">Dogecoin</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">Bitcoin</span></p>
                      <p class="amount">$<span
                              class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.bitcoin.currency}<span
                              class="coin logo-style">${crypto.pricing.bitcoin.amount}</span></p>
                  </div>
                  <hr>
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.bitcoin}</span></p>
              
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.bitcoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function paywithETC (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                      <option value="2">Ethereum</option>
                          <option value="1">Bitcoin</option>
                          <option value="3">Litecoin</option>
                          <option value="4">Bitcoin Cash</option>
                          <option value="5">Dai</option>
                          <option value="6">Dogecoin</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">eEthereum</span></p>
                      <p class="amount">$<span
                              class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.ethereum.currency}<span
                              class="coin logo-style">${crypto.pricing.ethereum.amount}</span></p>
                  </div>
                  <hr>
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.ethereum}</span></p>
                  <br>
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.ethereum,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })

  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function paywithLTC (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                      <option value="3">Litecoin</option>
                          <option value="1">Bitcoin</option>
                          <option value="2">Ethereum</option>
                          <option value="4">Bitcoin Cash</option>
                          <option value="5">Dai</option>
                          <option value="6">Dogecoin</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">Litecoin</span></p>
                      <p class="amount">$<span
                              class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.litecoin.currency}<span
                              class="coin logo-style">${crypto.pricing.litecoin.amount}</span></p>
                  </div>
                  <hr>
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.litecoin}</span></p>
                  <br>
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.litecoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function paywithBCH (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                      <option value="4">Bitcoin Cash</option>
                          <option value="1">Bitcoin</option>
                          <option value="2">Ethereum</option>
                          <option value="3">Litecoin</option>
                          <option value="5">Dai</option>
                          <option value="6">Dogecoin</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">Bitcoin Cash</span></p>
                      <p class="amount">$<span
                              class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.bitcoincash.currency}<span
                              class="coin logo-style">${crypto.pricing.bitcoincash.amount}</span></p>
                  </div>
                  <hr>
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.bitcoincash}</span></p>
                  <br>
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.bitcoincash,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function paywithDAI (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                      <option value="5">Dai</option>
                          <option value="1">Bitcoin</option>
                          <option value="2">Ethereum</option>
                          <option value="3">Litecoin</option>
                          <option value="4">Bitcoin Cash</option>
                          <option value="6">Dogecoin</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">Dai</span></p>
                      <p class="amount">$<span
                              class="amt logo-style">${crypto.pricing.local.amount}</span>${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.dai.currency}<span
                              class="coin logo-style">${crypto.pricing.dai.amount}</span></p>
                  </div>
                  <hr>
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.dai}</span></p>
                  <br>
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.dai,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })

  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function paywithDOG (crypto) {
  SniffPaymentStatus(crypto.code)
  var element = `
                  <a class="logo" href="#">Unicc<span class="logo-style">Tools</span></a>
                  <p class="pay-notice logo-style">PLEASE DO NOT CLOSE THIS WINDOW UNTILL SUCCESSFUL PAYMENT MADE.</p>
                  <p class="pay-order">ORDER NO. <span class="logo-style order-no">${crypto.code}</span></p>
                  <p class="pay-description">${crypto.description}</p>

                  <div id="qrcode"></div>
                  <div class="cs">

                      <!-- <p>Select your payment type</p> -->
                      <select id="cccs" class="top-products">
                      <option value="6">Dogecoin</option>
                          <option value="1">Bitcoin</option>
                          <option value="2">Ethereum</option>
                          <option value="3">Litecoin</option>
                          <option value="4">Bitcoin Cash</option>
                          <option value="5">Dai</option>
                      </select>
                  </div>
                  <div class="money-content">
                      <p class="cn">Crypto <span class="cname logo-style">Dogecoin</span></p>
                      <p class="amount">$ <span
                              class="amt logo-style">${crypto.pricing.local.amount} </span> ${crypto.pricing.local.currency}
                      </p>
                      <p class="camount">${crypto.pricing.dogecoin.currency}<span
                              class="coin logo-style">${crypto.pricing.dogecoin.amount}</span></p>
                  </div>
                  <hr>
                  
                  <p class="cn">Copy the address below</p>
                  <p class="amount"><span class="address logo-style">${crypto.addresses.dogecoin}</span></p>
                  <br>
                 <br>
                  <p class="process"></p>
                  <br>
                  <p class="statement">Please Pay exactly the Amount stated above to prevent further processing
                      issues.</p>`

  document.querySelector('#PaymentModal .pay-head').innerHTML = element
  var qrcode = new QRCode(document.getElementById('qrcode'), {
    text: crypto.addresses.dogecoin,
    width: 128,
    height: 128,
    colorDark: '#8f1414',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  })
  document.getElementById('cccs').addEventListener('change', function () {
    console.log('You selected: ', parseInt(this.value))

    switch (parseInt(this.value)) {
      case 1:
        paywithBTC(crypto)
        break
      case 2:
        paywithETC(crypto)
        break
      case 3:
        paywithLTC(crypto)
        break
      case 4:
        paywithBCH(crypto)
        break
      case 5:
        paywithDAI(crypto)
        break
      case 6:
        paywithDOG(crypto)
        break
    }
  })
}
function SniffPaymentStatus (code) {
  $('#PaymentModal .process').text('Initiate a Payment now!')
  $('#PaymentModal .process').css('color', '#b60b0b')
  setInterval(() => {
    var url = 'https://api.commerce.coinbase.com/charges/' + code
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)

    xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')
    xhr.setRequestHeader('X-CC-Version', '2018-03-22')

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //console.log(xhr.status)

        // console.log('Sniffed data: ',JSON.parse(xhr.responseText).data)
        var sniffed = JSON.parse(xhr.responseText).data

        console.log(sniffed.timeline.length)
        var sniffedlen = sniffed.timeline.length
        sniffed.timeline.forEach(element => {
          console.log(element.status)
          if (
            element.status
              .toString()
              .toLowerCase()
              .trim() === 'completed' ||
            element.status
              .toString()
              .toLowerCase()
              .trim() === 'resolved'
          ) {
            makePurchase(parseInt(sniffed.pricing.local.amount), [
              'Topup',
              '',
              genorder(8),
              Date()
            ])
            historymaker(
              localStorage.getItem('uid'),
              `Successfully paied an amount of ${sniffed.pricing.local.amount} into your account.`
            )
            PopupMessageModel(
              'Successful Payment',
              'You have successfully completed the payment process.',
              '#009e1a',
              closepayment
            )
            $('#PaymentModal .process').text('Payment completed')
            $('#PaymentModal .process').css('color', '#009e1a')
            return
          }
          if (
            sniffed.timeline.length === 3 &&
            sniffed.timeline[2].status
              .toString()
              .toLowerCase()
              .trim() === 'unresolved' &&
            sniffed.timeline[2].context
              .toString()
              .toLowerCase()
              .trim() === 'underpaid'
          ) {
            PopupMessageModel(
              'Payment Warning',
              `Your payment is unresolved meaning you paid less than the specified amount. Check the remaining balance $(${sniffed
                .pricing.local.amount -
                payments.value.local
                  .amount}) and complete the payment with same crypto wallet address.`,
              '#fbff00',
              () => {}
            )
            $('#PaymentModal .process').text('Payment Underpaid!')
            $('#PaymentModal .process').css('color', '#20272e')
            return
          }
          if (sniffedlen === 1) {
            //new payment detected
            $('#PaymentModal .process').text('Payment Detected!')
            $('#PaymentModal .process').css('color', '#1d0d0d')
            return
          }
          if (sniffedlen === 2) {
            //processing data in progress
            $('#PaymentModal .process').text(
              'Pending: Waiting for confirmation'
            )
            $('#PaymentModal .process').css('color', '#009e1a')
            return
          }
        })
      }
    }
    xhr.send(data)
  }, 10000)
}
document.querySelector('.year').innerHTML = new Date().getFullYear()

$('.telegram').click(() => {
  window.open('https://t.me/betwayx10')
})

