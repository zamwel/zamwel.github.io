$(document).ready(() => {
  var loginstatus = localStorage.getItem('login')
  var email = localStorage.getItem('email')
  var uid = localStorage.getItem('uid')
  var username = localStorage.getItem('username')
  var balance = localStorage.getItem('balance')
  var verified = localStorage.getItem('verified')
  var password = localStorage.getItem('password')

  document.getElementById(
    'uname'
  ).innerHTML += `<span class="user-style">${username}</span>`
  document.getElementById(
    'uemail'
  ).innerHTML += `<span class="user-style">${email}</span>`
  document.getElementById(
    'bal'
  ).innerHTML += `<span class="user-style">$${balance}</span>`

  // $('#account-datatable').DataTable()

  $('.left-user #add').click(() => {
    $('#AmountModal').css('display', 'block')
  })

  $('#user-amount').keypress(function (e) {
    if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false
  })

  $('#AmountModal .modal-accept').click(() => {
    var value = $('#user-amount').val()
    if (value === '') value = '50'
    topup = true
    tba = value
    console.log('User amount entered: ', value)
    openloadAPI(value)
  })

  $('#AmountModal .modal-cancel').click(() => {
    closeamount()
  })
  $('#AmountModal .modal-exit').click(() => {
    closeamount()
  })
  loadpurchase()
  loadhistorymaker()
})

function closeamount () {
  $('#AmountModal').css('display', 'none')
}

function openloadAPI (amount) {
  loadAPI(amount)
  closeamount()
}

function loadpurchase () {
  var dataset = new Array()
  var email = localStorage.getItem('email')
  var uid = localStorage.getItem('uid')
  db.collection('unicctoolsuserpurchase')
    .doc(email)
    .collection(uid)
    .get()
    .then(v => {
      v.docChanges().forEach(element => {
        //console.log(element.doc.data())
        dataset.push([
          element.doc.data().order,
          element.doc.data().product,
          element.doc.data().data,
          element.doc.data().datetime
        ])
      })
      var table = $('#account-datatable').DataTable({
        data: dataset
      })
    })
}
function loadhistorymaker () {
  var li, ht
  var uid = localStorage.getItem('uid')
  db.collection('unicctoolsuserhistory')
    .doc(uid)
    .collection('history')
    .get()
    .then(v => {
      v.docChanges().forEach(e=>{
        li = `<li>${e.doc.data().data}</li>`
        ht += li
      })
        if(ht.includes("undefined")){
            document.querySelector(".active-history").innerHTML = ht.replace("undefined","");
        }
    document.querySelector(".active-history").innerHTML = ht;
    })
  
}
