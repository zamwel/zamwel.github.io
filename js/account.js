import {
  auth,
  otherRef,
  usersRef,
  tba,
  loadAPI,
  addADocument,
  genstr,
  historyRef,
  purchaseRef
} from '/js/config.js'

import { onAuthStateChanged, getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'
import { query, where, onSnapshot, orderBy, limit } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'

var accountemail, accountid
onAuthStateChanged(auth, user => {
  accountemail = user.email
  accountid = user.uid
  getAUserCollection(usersRef, 'email', user.email)
  loadhistorymaker(user.email)
  loadpurchase(user.email)
 
})

$(document).ready(() => {
  // $('#account-datatable').DataTable()
  console.log('Ready')
  $('#add').click(() => {
    console.log('console console console console console')
    $('#AmountModal').css('display', 'block')
  })

  $('#user-amount').keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false
  })

  $('#AmountModal .modal-accept').click(() => {
    var value = $('#user-amount').val()
    if (value === '') {
      value = '50'
    }
    if (value !== '' && parseInt(value) < 50) {
      value = '50'
    }

    console.log('User amount entered: ', value)
    openloadAPI(value, true)
  })

  $('#AmountModal .modal-cancel').click(() => {
    closeamount()
  })
  $('#AmountModal .modal-cancel').click(() => {
    closeamount()
  })
  //loadpurchase()
  //loadhistorymaker()
})

function closeamount () {
  $('#AmountModal').css('display', 'none')
}

function openloadAPI (amount, topup) {
  closeamount()
  
  loadAPI(amount, topup)
}

function getAUserCollection (collectionname, args1, args2) {
  var users = []
  var li = ``
  let queries = query(collectionname, where(args1, '==', args2))
  onSnapshot(queries, snapshot => {
    snapshot.docs.forEach(doc => {
      users.push({ ...doc.data(), uid: doc.id })
    
      $('#uname .user-style').text(users[0].username)
      $('#uemail .user-style').text(users[0].email)
      $('#bal .user-style').text(`$${users[0].balance}`)
    })
  })
  /*  document.getElementById(
    'userinfo'
  ).innerHTML =`<li id="uname">Name: <span class="user-style">${}</span> </li>
      <li id="uemail">Email: <span class="user-style">${users[0].email}</span></li>
      <li id="bal">Balance: <span class="user-style">$${users[0].balance}</span></li>
      <div class="account-sec">
          <ul>
              <li id="add">Add Funds</li>
              <li id="edit">Edit Account</li>
              <li id="reset">Reset Password</li>
          </ul>
      </div>` */
}

function loadpurchase (accountemail) {
  var purchase = []
  let queries = query(purchaseRef, where('id', '==', accountemail))
  onSnapshot(queries, snapshot => {
    snapshot.docs.forEach(doc => {
      purchase.push({ ...doc.data(), uid: doc.id })
    })
    var table = $('#account-datatable').DataTable({
      data: purchase,
      columns:[
        {data: 'order'},
        {data: 'product'},
        {data: 'data'},
        {data: 'datetime'},
      ]
     
    })
  })
}
function loadhistorymaker (accountemail) {
  var history = []
  var html = ``, li
  let queries = query(historyRef, orderBy('history', 'desc'), limit(10), where('id', '==', accountemail))
  onSnapshot(queries, snapshot => {
    snapshot.docs.forEach(doc => {
      history.push({ ...doc.data(), uid: doc.id })
    })
   
    history.forEach(e => {
      li = `<li>${e.history}</li>`

      html += li
    })

    document.querySelector('.active-history').innerHTML = html
  })
}


