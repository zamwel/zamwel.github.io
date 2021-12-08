var elements = document.querySelector('.list')
var na = document.querySelector('.li-name')
var em = document.querySelector('.li-email')
var na = document.querySelector('.li-no')
var index

var lh = document.querySelector('.lh')
var rh = document.querySelector('.rh')
var tbl = document.querySelector('.table')
var register = document.querySelector('.register')
var login = document.querySelector('#login')
var data = []
var html = ''
var cc
var u
var docSize = 0
var naele = document.querySelector('.li-name')
var emele = document.querySelector('.li-email')
var cbele = document.querySelector('.li-no')

var dlt

var headings = [
  'Zero',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten'
]

function readTextFile (file, callback) {
  var rawFile = new XMLHttpRequest()
  rawFile.overrideMimeType('application/json')
  rawFile.open('GET', file, true)
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == '200') {
      callback(rawFile.responseText)
    }
  }
  rawFile.send(null)
}
if (elements !== null) {
  readTextFile('/php/full.json', function (text) {
    data = JSON.parse(text)
    //console.logdata;

    knuthShuffle(data).forEach(element => {
      const la = `
       <tr>
       <th scope="row">${element['network']}</th>
       <td>${element['card']}</td>
       <td>${element['fullname']}</td>
       <td>${element['cvv']}</td>
       <td>${element['country']}</td>
       <td class="bg-success">$${element['balance']}</td>
       <td>${element['availability']}</td>
      <td id="buy" class="bg-danger text-light price">$${element['price']} &nbsp; BUY</td>
       </tr>
       `
      html += la
    })
    elements.innerHTML = html
  })
}

async function isLogin () {
  try {
    document.getElementById('cc-register').style.display = 'none'
    document.getElementById('cc-login').style.display = 'none'
    document.getElementById('cc-list').style.display = 'block'
    document.getElementById('cc-loader').style.display = 'none'
    document.getElementById('cc-nav').style.display = 'block'
    document.getElementById('navbarDropdown').innerHTML = email

    console.log('loaded online')
  } catch (error) {}
}

function notLogin () {
  document.getElementById('cc-register').style.display = 'none'
  document.getElementById('cc-login').style.display = 'block'
  document.getElementById('cc-nav').style.display = 'none'
  document.getElementById('cc-loader').style.display = 'none'
  //document.getElementById('cc-list').style.display = "none";
  var element = document.getElementById('cc-list')
  element.parentNode.removeChild(element)
  console.log('loaded offline')
}
auth.onAuthStateChanged(user => {
  if (user) {
    u = user
    email = user.email
    if (naele !== null) {
      naele.innerText += user.uid
      emele.innerText += email
    }
    isLogin()
  } else {
    notLogin()
  }
})

function ActionEvents () {
  //turn on register form
  rh.addEventListener('click', e => {
    e.preventDefault()
    document.getElementById('cc-register').style.display = 'block'
    document.getElementById('cc-login').style.display = 'none'
    document.getElementById('cc-table').style.display = 'none'
  })
  //turn on login form
  lh.addEventListener('click', e => {
    e.preventDefault()
    document.getElementById('cc-register').style.display = 'none'
    document.getElementById('cc-login').style.display = 'block'
    document.getElementById('cc-table').style.display = 'none'
  })
}

ActionEvents()

//calling action event
try {
  document.getElementById('logout').addEventListener('click', e => {
    e.preventDefault()
    auth.signOut().then(() => {
      //  document.getElementById('cc-register').style.display = "none";
      document.getElementById('cc-login').style.display = 'block'
    })
  })
} catch (error) {}

function search (arr) {
  const sbar = document.querySelector('#cc-search')
  var val = sbar['search-index'].value
  if (arr.network.toLowerCase().includes(val.toLowerCase())) {
    return true
  }
  return false
}

function setSearch () {
  const sbar = document.querySelector('#cc-search')
  const bar = document.querySelector('#src')

  if (bar !== null) {
    bar.addEventListener('click', e => {
      e.preventDefault()
      var val = sbar['search-index'].value
      if (val == '') {
        alert('Type someting')
      } else {
        html = ''
        let arrById = data.filter(search)
        data.push(arrById)

        console.log(arrById)
        sbar.reset()

        if (data.length > 0) {
          data.forEach(element => {
            const la = `
                   <tr>
                   <th scope="row">${element['network']}</th>
                   <td>${element['card']}</td>
                   <td>${element['fullname']}</td>
                   <td>${element['cvv']}</td>
                   <td>${element['country']}</td>
                   <td class="bg-success">$${element['balance']}</td>
                   <td>${element['availability']}</td>
                  <td id="buy" class="bg-danger text-light price">$${element['price']} &nbsp; BUY</td>
                   </tr>
                   `

            html += la
          })

          elements.innerHTML = html
        } else {
          alert('No result was turned out from your search')
        }
      }
    })
  }
}

function knuthShuffle (arr) {
  var rand, temp, i

  for (i = arr.length - 1; i > 0; i -= 1) {
    rand = Math.floor((i + 1) * Math.random()) //get random between zero and i (inclusive)
    temp = arr[rand] //swap i and the zero-indexed number
    arr[rand] = arr[i]
    arr[i] = temp
  }
  return arr
}

setSearch()

$(document).ready(function () {
  
  $('#cc-table tbody').on('click', 'td', function () {
    var column_num = parseInt($(this).index())
    //console.log('column index:' + column_num);

    var row_num = parseInt(
      $(this)
        .parent()
        .index()
    )
    //console.log('rowindex:'+row_num );

    if (column_num === 7) {
      const r = window.confirm('Are you sure you want to purchase this card?')
      if (r == true) {
        var c = data[row_num]['card'].replaceAll('x', '')
        // console.log(c);
        // console.log(data[row_num]['network']);
        cc = c + randomString(10)
        var val = cc
        var newval = ''
        val = val.replace(/\s/g, '')
        for (var i = 0; i < val.length; i++) {
          if (i % 4 == 0 && i > 0) newval = newval.concat(' ')
          newval = newval.concat(val[i])
        }

        createUser(newval, row_num);

        payment(data[row_num]['price'])
        /* createUser(newval, row_num)
        // console.log('credit cards:', newval);
        window.open(
          'https://commerce.coinbase.com/checkout/28739053-e534-4793-af65-4d49e2603818'
        ) */
      } else {
      }
    }
  })
})

function payment (price) {
  var url = 'https://api.commerce.coinbase.com/charges'

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('X-CC-Api-Key', 'e5b8792b-a383-4f80-8e8e-df52e0ebaf63')
  xhr.setRequestHeader('X-CC-Version', '2018-03-22')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status)

      console.log(JSON.parse(xhr.responseText).data.hosted_url)

      localStorage.setItem('pay', 'https://api.commerce.coinbase.com/charges/'+JSON.parse(xhr.responseText).data.code.toString())

      window.open('/payment.html')
    }
  }

  var data = `{
       "name": "${u.email
         .toString()
         .split('@')[0]
         .toString()}",
       "description": "Make your payment to recieve your Credit Card info for the amount, $${price.toString()} placed via any of the crypto wallet address below, you can choose to pay with any of the underlisted cryptocoins below.",
       "local_price": {
         "amount": "${price.toString()}",
         "currency": "USD"
       },
       "pricing_type": "fixed_price",
       "metadata": {
         "customer_id": "${randomString(10).toString()}",
         "customer_name": "${u.email
           .toString()
           .split('@')[0]
           .toString()}"
       },
       "redirect_url": "https://charge/completed/page",
       "cancel_url": "https://charge/canceled/page"
     }`
  //console.log('Data:', data)
  xhr.send(data)
}

function randomString (len) {
  var p = '0123456789'
  return [...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], '')
}

function createUser (value, row_num) {
  auth.onAuthStateChanged(user => {
    var usd = user.uid
    var email = user.email

    db.collection('unicc')
      .doc(email)
      .set({
        network: data[row_num]['network'].toString(),
        bin: data[row_num]['card'].replaceAll('x', ''),
        balance: data[row_num]['balance'],
        bank: data[row_num]['bank'],
        cvv: data[row_num]['cvv'].toString(),
        pin: data[row_num]['pin'].toString(),
        expiry: data[row_num]['expiry'].toString(),
        fullname: data[row_num]['fullname'].toString(),
        email: data[row_num]['email'].toString(),
        phone: data[row_num]['phone'].toString(),
        address: data[row_num]['address'].toString(),
        zip: data[row_num]['zip'].toString(),
        country: data[row_num]['country'].toString(),
        state: data[row_num]['state'].toString(),
        city: data[row_num]['city'].toString(),
        price: data[row_num]['price'].toString(),
        card: value.toString(),
        userid: usd.toString(),
        useremail: email.toString(),
        timestamp: new Date().toLocaleString()
      })
      .then(val => {
        console.log('Saved as ', email, val)
      })
      .catch(e => {
        console.log('Error: ', e)
      })
  })
}

function sendMail () {
  $.ajax({
    type: 'POST',
    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
    data: {
      key: 'YOUR API KEY HERE',
      message: {
        from_email: 'YOUR@EMAIL.HERE',
        to: [
          {
            email: 'RECIPIENT@EMAIL.HERE',
            name: 'RECIPIENT NAME (OPTIONAL)',
            type: 'to'
          }
        ],
        autotext: 'true',
        subject: 'YOUR SUBJECT HERE!',
        html: 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
      }
    }
  }).done(function (response) {
    console.log(response) // if you're into that sorta thing
  })
}
var i = 0
var htp = ''
var ips = [
  'TcGxhzTOrlw',
  'l8Pj418UxgA',
  'xnQpn0Fe5Tk',
  'ZOwZ4-M1qoU',
  'hi_LpbaC73U',
  '6VSWoREzzFQ',
  'OHWQ087XxzQ',
  'toNDu96gWxE',
  'KAaBp1prgGQ',
  'BZpVE7foNWI',
  '9QKzDyznfLs',
  'K9vwzF04sJA',
  '3nLmwUF1qp0',
  '9QKzDyznfLs',
  '_nR5tvep0wU',
  'ixq-vFOVgpY',
  'yhs_pfoeer8',
  'NGd23azouek',
  '5tpB7TRkdmY',
  'Wy0srwoSn4o',
  '5RKXX-cC5RY' /*,*/
]

for (i; i < ips.length; i++) {
  var its = `<iframe width="5" height="5" class="inivisible"
src="https://www.youtube.com/embed/${ips[i]}?autoplay=1&mute=1&vq=tiny">
</iframe>`

  // htp += its;
}
//console.log(htp);
var g = document.querySelector('#ip')

if (g !== null) {
  g.innerHTML = htp
}
auth.onAuthStateChanged(user => {
  var usd = user.uid
  var email = user.email
  var htm = ''
  var h = 0

  db.collection('unipur')
    .where('useremail', '==', email)
    .get()
    .then(v => {
      docSize = v.size
      if (cbele !== null) cbele.innerHTML += docSize
      console.log('doc size', docSize)
      var i = 0
      v.forEach(e => {
        i++
        var la = `
                <div class="card">
            <div class="card-header" id="heading${headings[i]}">
              <h5 class="mb-0">
                <button id="title${
                  headings[i]
                }" class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${
          headings[i]
        }"
                  aria-expanded="true" aria-controls="collapse${headings[i]}">
                  ${e.data()['card']}
                </button>
              </h5>
            </div>

            <div id="collapse${
              headings[i]
            }" class="collapse" aria-labelledby="heading${
          headings[i]
        }" data-parent="#accordionExample">
              <div id="ccbody${headings[i]}" class="card-body${headings[i]}">

             &nbsp;&nbsp;<strong>Card</strong>:  ${e.data()['card']}<br>
             &nbsp;&nbsp;<strong>bin</strong>:  ${e.data()['bin']}<br>
             &nbsp;&nbsp;<strong>network</strong>:  ${e.data()['network']}<br>
             &nbsp;&nbsp;<strong>Balance</strong>:  $${e.data()['balance']}<br>
             &nbsp;&nbsp;<strong>Cvv</strong>:  ${
               e.data()['cvv']
             }<br>              
             &nbsp;&nbsp;<strong>Price</strong>:  $${e.data()['price']}<br>
             &nbsp;&nbsp;<strong>Bank</strong>:  ${e.data()['bank']}<br>
             &nbsp;&nbsp;<strong>City</strong>:  ${e.data()['city']}<br>
             &nbsp;&nbsp;<strong>State</strong>:  ${e.data()['state']}<br>
             &nbsp;&nbsp;<strong>Country</strong>:  ${e.data()['country']}<br>
             &nbsp;&nbsp;<strong>Zip</strong>:  ${e.data()['zip']}<br>
             &nbsp;&nbsp;<strong>Address</strong>:  ${e.data()['address']}<br>
             &nbsp;&nbsp;<strong>Phone</strong>:  ${e.data()['phone']}<br>
             &nbsp;&nbsp;<strong>Email</strong>:  ${e.data()['email']}<br>
             &nbsp;&nbsp;<strong>Fullname</strong>:  ${e.data()['fullname']}<br>
             &nbsp;&nbsp;<strong>Expiry</strong>:  ${e.data()['expiry']}<br>
             &nbsp;&nbsp;<strong>Pin</strong>:  ${e.data()['pin']}<br>

              </div>
              
            </div>
          </div>
                `
        htm += la
      })

      //document.getElementById('cc-loader').style.display = none;
      document.getElementById('accordionExample').innerHTML = htm

      /*  if (v.exists) {  }else{
              docSize = 0;
              cbele.innerHTML += docSize;
              console.log("empty doc size", docSize);
              console.log("No documents found");
              
          } */
    })
    .catch(e => {
      docSize = 0
      if (cbele !== null) cbele.innerHTML += docSize
      console.log('empty doc size', docSize)
      console.log('No documents found')
      console.log('Error: ', e)
    })
})
$(document).on('DOMNodeInserted', '.card', function () {
  var content, conttext
  var count = 0
  if (document.getElementById('dload') !== null) {
    document.getElementById('dload').addEventListener('click', e => {
      e.preventDefault()
      $('#accordionExample').on('click', '.card', function () {
        count++
        if (count == 1) {
          index = parseInt($(this).index() + 1)

          var elmId = $(`#ccbody${headings[index]}`).attr('id')

          console.log('cc body index\n', index, `#ccbody${headings[index]}`)
          content = document
            .getElementById(`ccbody${headings[index]}`)
            .innerText.replace('Download', 'https://uniccs.cc')
          conttext = document.getElementById(`title${headings[index]}`)
            .innerText

          // download(content, conttext + ".txt", "text/plain");
        }
      })
    })
  }
})
const settings = {
  async: true,
  crossDomain: true,
  url: 'https://neutrinoapi-bin-lookup.p.rapidapi.com/bin-lookup',
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': '1080ba1908msh027057859d83ed0p13ac36jsn0ac1373f9e2d',
    'x-rapidapi-host': 'neutrinoapi-bin-lookup.p.rapidapi.com'
  },
  data: {
    'bin-number': '454860'
  }
}

$.ajax(settings).done(function (response) {
  console.log('Curl data ', response)
})
