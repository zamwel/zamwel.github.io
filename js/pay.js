var url = localStorage.getItem('pay')
var sec = 60
var min = 59
var mil = 0


var xhr = new XMLHttpRequest()
xhr.open('GET', url)
xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.status)
    //console.log(xhr.responseText)
    console.log(JSON.parse(xhr.responseText).data.addresses)
    /* console.log(JSON.parse(xhr.responseText).data.code)
    console.log(JSON.parse(xhr.responseText).data.timeline[0].time)
    console.log(JSON.parse(xhr.responseText).data.timeline[0].status)
    console.log(JSON.parse(xhr.responseText).data.description)
    console.log(JSON.parse(xhr.responseText).data.pricing.local)
    console.log(JSON.parse(xhr.responseText).data.pricing.bitcoin)
    console.log(JSON.parse(xhr.responseText).data.hosted_url)
    console.log(JSON.parse(xhr.responseText).data.payments) */
    pay(JSON.parse(xhr.responseText))
  } else {
    let m = `<div class="col-sm-12 col-md-12 col-lg-12 my-4">
    <div class="card border-0 bg-dark">
      <div class="card-body text-center">
      <h6 class="text-uppercase mb-3">Please There is no current payment transaction ongoing</h6>
      <p class="text-center w-75 m-auto">I want to <a href="/buy.html">buy another card</a></p>
      </div>
    </div>
  </div>`

    let fm = (document.querySelector('#coins').innerHTML = m)
  }
}

xhr.send()

function pay (data) {
  let m, h
  let fm = document.querySelector('#coins')

  m = `<div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Bitcoin <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6> 
                   
                      <h6 class="text-uppercase mb-2">${data.data.pricing
                        .bitcoin.currency +
                        ' ' +
                        data.data.pricing.bitcoin.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p1"><span class="spc">${
                        data.data.addresses.bitcoin
                      }</span></p>
                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p1')"></i>
                    </div>
                  </div>
                </div>
                
                <div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Etherum <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6> 
                     

                      <h6 class="text-uppercase mb-2">${data.data.pricing
                        .ethereum.currency +
                        ' ' +
                        data.data.pricing.ethereum.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p2"><span class="spc">${
                        data.data.addresses.ethereum
                      }</span></p>
                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p2')"></i>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    
                    <h6 class="text-uppercase mb-3">Doge Coin <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6>
                      

                      <h6 class="text-uppercase mb-2">${data.data.pricing
                        .dogecoin.currency +
                        ' ' +
                        data.data.pricing.dogecoin.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p3"><span class="spc">${
                        data.data.addresses.dogecoin
                      }</span></p>
                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p3')"></i>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Litecoin <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6> 
                    
        

                      <h6 class="text-uppercase mb-2">${data.data.pricing
                        .litecoin.currency +
                        ' ' +
                        data.data.pricing.litecoin.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p4"><span class="spc">${
                        data.data.addresses.litecoin
                      }</span></p>
                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p4')"></i>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Bitcoin Cash <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6>

                      <h6 class="text-uppercase mb-2">${data.data.pricing
                        .bitcoincash.currency +
                        ' ' +
                        data.data.pricing.bitcoincash.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p5"><span class="spc">${
                        data.data.addresses.bitcoincash
                      }</span></p>
                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p5')"></i>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6 col-md-4 col-lg-4 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Dai <span class="spc">${data
                      .data.pricing.local.currency +
                      ' ' +
                      data.data.pricing.local.amount}</span></h6> 

                      <h6 class="text-uppercase mb-2">${data.data.pricing.dai
                        .currency +
                        ' ' +
                        data.data.pricing.dai.amount}</h6>
                        <p >Wallet Address:</p>
                      <p id="p6"><span class="spc">${
                        data.data.addresses.dai 
                      }</span></p>

                      <i  class="fa fa-copy" style="cursor:pointer;" onclick="copyToClipboard('#p6')"></i>
                    </div>
                  </div>
                </div>

                <div class="col-sm-12 col-md-12 col-lg-12 my-4">
                  <div class="card border-0 bg-dark">
                    <div class="card-body text-center">
                    <h6 class="text-uppercase mb-3">Please pay exactly the amount stated above</h6>
                    <h6 class="text-uppercase mb-3"><span class="spc">PLEASE DO NOT CLOSE THIS WINDOW UNTILL THE PAYMENT BECOMES SUCCESSFULL</h6></span>
                     
                    <h6 id="timerem" class="text-uppercase mb-2 ">Having difficaulty in making payment or need support? <a href="mailto:appdevlap@gmail.com">Contact Here</a></h6>
                      <p id="status">Status: ${data.data.timeline[0].status}</p>
                      <p id="status">Status: ${data.data.timeline[0].status}</p>
                    </div>
                  </div>
                </div>
                `
  loadstatus().then(() => {
    let goos = setInterval(() => {
      mil++
      if (mil % 300 == 0) {
        sec--
        if (sec % 300 == 0) {
          min--
        }
        if (sec == 0) {
          sec = 59
        }
        if (sec < 10) {
          sec = `0${sec}`
        }
        if (min < 10) {
          min = `0${min}`
        }
      }

      document.getElementById('timerem').innerHTML = `Time Remaining: ${min +
        ' : ' +
        sec}`
      try {
        if (data.data.timeline[0].status === 'NEW') {
          document.getElementById('status').innerHTML =
            'No Payment has been received yet.'
        }
        if (
          data.data.timeline.length > 1 &&
          data.data.timeline[1].status === 'PENDING'
        ) {
          document.getElementById('status').innerHTML =
            'Payment detected wiating for at least 1 confirmation.'
        }
        if (
          data.data.timeline.length > 1 &&
          data.data.timeline[2].status === 'COMPLETED'
        ) {
          document.getElementById(
            'status'
          ).innerHTML = `Payment of $${data.data.pricing.local.amount} has been made successfully, check your <a href="/account.html">account</a> for your card`
          sendcc()
          clearInterval(goos)
        }
        if (
          data.data.timeline.length > 1 &&
          data.data.timeline[3].state === 'UNRESOLVED'
        ) {
          document.getElementById(
            'status'
          ).innerHTML = `Please your payment amount isn't complete please add the remaining balance it its not up to ${data.data.pricing.local.amount} or wait for the vender to rectify this error`
        }
        if (
          data.data.timeline.length > 1 &&
          data.data.timeline[3].status === 'RESOLVED'
        ) {
          document.getElementById(
            'status'
          ).innerHTML = `Payment of $${data.data.pricing.local.amount} has been made successfully, check your <a href="/account.html">account</a> for your card`
          sendcc()
          clearInterval(goos)
        }
        if (
          data.data.timeline.length > 1 &&
          data.data.timeline[3].context === 'UNDERPAID'
        ) {
          document.getElementById('status').innerHTML =
            "Please your payment amount isn't complete please add the remaining amount"
        }
      } catch (error) {}
    })
    //h += m

    fm.innerHTML = m
  }, 1000)
}

async function loadstatus () {
  if (document.getElementById('status') !== null) {
    return true
  }
}

function copytext (id) {
  navigator.clipboard.writeText(id.toString()).then(
    () => {
      console.log(
        `Successfully copied wallet address ${id.toString()} on clipboard`
      )
    },
    err => {
      console.error("Couldn't copy wallet address", err)
    }
  )
}

function sendcc () {
  auth.onAuthStateChanged(user => {
    var usd = user.uid

    db.collection('unicc')
      .doc(email)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          db.collection('unipur')
            .doc()
            .set({
              address: doc.data()['address'],
              bin: doc.data()['bin'],
              bank: doc.data()['bank'],
              balance: doc.data()['balance'],
              card: doc.data()['card'],
              city: doc.data()['city'],
              country: doc.data()['country'],
              cvv: doc.data()['cvv'],
              email: doc.data()['email'],
              expiry: doc.data()['expiry'],
              fullname: doc.data()['fullname'],
              network: doc.data()['network'],
              phone: doc.data()['phone'],
              price: doc.data()['price'],
              useremail: doc.data()['useremail'],
              pin: doc.data()['pin'],
              state: doc.data()['state'],
              card: doc.data()['card'],
              timestamp: doc.data()['timestamp'],
              userid: usd,
              zip: doc.data()['zip']
            })
            .then(v => {
              alert('You have Successfully bought a credit card')
              localStorage.removeItem('pay')
            })
            .catch(e => {
              alert(e)
            })

          //sendEmail(cc_det, email);
        } else {
          alert('No such document!')
        }
      })
      .catch(function (error) {
        //alert('Error getting documentsss: ' + error + "uid: "+ user.email)
        console.log('Error getting documentsss: ' + error + 'uid: ' + email)
      })
  })
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
  alert('Succeffully coppied wallet address, kindly paste to make payment.')
}
