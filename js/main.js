const mobileOpenIcon = document.getElementById('menu-icon')
const nav = document.querySelector('nav')
const mobileCloseIcon = document.getElementById('close')

mobileOpenIcon.addEventListener('click', () => {
  nav.classList.add('menu-slide')
})

mobileCloseIcon.addEventListener('click', () => {
  nav.classList.remove('menu-slide')
})

document.querySelector('#close').addEventListener('click', e => {
  e.preventDefault()
  $('.menu-slide').css('display', 'none')
})

//console.log(dm.data.timeline[0].status.toString())
//parsewebpages()

function parsewebpages () {
  var url = '/src/file.json'
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)

  xhr.onload = function () {
    if (xhr.readyState === 4 && xhr.status == 200) {
      var html = xhr.responseText
      //console.log('coin marketcap', html)
    }
  }
  xhr.onerror = () => {
    console.log(xhr.status, xhr.statusText)
  }
  xhr.send()
}
$(document).ready(() => {
  topActivities()

  function topActivities () {
    var pro = ['Credit Cards']
    var ite = [
      'American Express',
      'Visa',
      'Visa Electron',
      'Mastercard',
      'Instapayment',
      'Discover'
    ]
    var qua = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      30,
      40,
      50
    ]
    var topTen = document.querySelector('.top-ten')
    for (var a = 1; a <= 10; a++) {
      const prorand = Math.floor(Math.random() * pro.length)
      const iterand = Math.floor(Math.random() * ite.length)
      const quarand = Math.floor(Math.random() * qua.length)
      var li = `<p>We just added <span class="items">${qua[quarand]}</span> items of  <span class="items">${ite[iterand]}</span> onto our  <span class="items">${pro[prorand]}</span> collection
      <span class="items">some moments</span> ago. </p>
     <hr>`

      if (topTen !== null) {
        topTen.innerHTML += li
      }
    }
  }
})

//$('.acc').css('display', 'block')
//$('.acc').css('display', 'none')
