$(document).ready(() => {
  const loginForm = document.getElementById('login-form')
  const signupForm = document.getElementById('signup-form')
  const resetPass = document.getElementById('reset-pass')
  const loginBtn = document.getElementById('su')
  const signupBtn = document.getElementById('si')

  loginForm.classList.add('show-form')
  signupForm.classList.add('hide-form')

  loginBtn.addEventListener('click', e => {
    e.preventDefault()
    loginForm.classList.add('hide-form')
    signupForm.classList.remove('hide-form')
  })

  signupBtn.addEventListener('click', e => {
    e.preventDefault()
    loginForm.classList.remove('hide-form')
    signupForm.classList.add('hide-form')
  })

  $('#user-btn').click(e => {
    e.preventDefault()
    var email = $('#login-form #user-email').val()
    var password = $('#login-form #user-password').val()
    load()
    console.log(email, password)
    auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        historymaker(value.user.uid, `You signed in to your account at ${Date()}`)
        stopload()
        location.replace('/index')
        getuserdetials(email)
        PopupMessageModel(
          'Signin Success',
          'You have successfully signed in as ' + email,
          '#009e1a', ()=>{}
        )
      })
      .catch(err => {
        stopload()
        PopupMessageModel('Signin Error', err, '#b60b0b', ()=>{})
      })
  })

  $('#user-btn2').click(e => {
    e.preventDefault()
    var name = $('#signup-form #user-name').val()
    var email = $('#signup-form #user-email').val()
    var password = $('#signup-form #user-password').val()
    var password2 = $('#user-password2').val()

    if (password.toString().trim() !== password2.toString().trim()) {
      $('.err-two').text('Please your passwords do not match.')
      errcheck()
    } else {
      load()
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(value => {
          adduser(email, value.user.uid, name, password)
        })
        .catch(err => {
          stopload()
          PopupMessageModel('Sign up Error', err, '#b60b0b', ()=>{ location.replace('/index')})
        })
    }
  })
})
function errcheck () {
  setTimeout(() => {
    $('.err-one').text('')
    $('.err-two').text('')
  }, 3000)
}

function adduser (email, uid, name, password) {
  console.log(email, uid, name, password)
  db.collection('unicctoolsuserdetails')
    .doc(email)
    .set({
      username: name,
      userid: uid,
      password: password,
      email: email,
      balance: '0.00',
      verified: 'false'
    })
    .then(val => {
      stopload()
      historymaker(auth.user.uid, `You created an account with email: ${email}, name: ${name} at ${Date()}`)
      PopupMessageModel(
        'Signin Success',
        'You have successfully signed in as ' + name,
        '#009e1a', ()=>{location.replace('/index')}
      )
      getuserdetials(email)
     
    })

   
}
