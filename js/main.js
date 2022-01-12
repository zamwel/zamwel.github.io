//window.onload(() => {})

const mobileOpenIcon = document.getElementById('menu-icon')
const nav = document.querySelector('nav')
const mobileCloseIcon = document.getElementById('close')

mobileOpenIcon.addEventListener('click', () => {
  nav.classList.add('menu-slide')
})

mobileCloseIcon.addEventListener('click', () => {
  nav.classList.remove('menu-slide')
})

parsewebpages()

//console.log(dm.data.timeline[0].status.toString())

function parsewebpages () {
    var url = 'https://coinmarketcap.com/'
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = "document";
    xhr.onload = function () {
      if (xhr.readyState === 4 && xhr.status == 200) {
        var html = xhr.responseXML
        console.log('coin marketcap', html)
      }
    }
    xhr.onerror = ()=>{
        console.log(xhr.status, xhr.statusText)
    }
    xhr.send()
  }