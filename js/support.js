import {
  PopupConfirmModel,
  genstr,
  PopupMessageModel,
  auth,
  supportRef
} from '/js/config.js'
import { onSnapshot, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js'
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js'

var email, uid

onAuthStateChanged(auth, user => {
  if (user) {
    email = user.email
    uid = user.uid
  }
})
$(document).ready(() => {
  document.querySelector('.send').addEventListener('click', e => {
    e.preventDefault()
    sendmessage()
  })
})
function sendmessage () {
  var title, message, email, ticket
  title = $('#support .username').val()
  message = $('#support .message').val()

  email = $('#support .useremail').val()
  ticket = DocId()

  if (email === '') {
    $('#support').attr('value', 'enter something')
    PopupMessageModel(
      'Error',
      "Please don't leave the email input field  empty",
      '#b60b0b',
      () => {}
    )
    return
  }

  if (title === '') {
    $('#support').attr('value', 'enter something')
    PopupMessageModel(
      'Error',
      "Please don't leave the title input field empty",
      '#b60b0b',
      () => {}
    )
    return
  }
  if (message === '') {
    $('#support').attr('value', 'enter something')
    PopupMessageModel(
      'Error',
      "Please don't leave the input message field empty",
      '#b60b0b',
      () => {}
    )
    return
  } else {
    setDoc(doc(supportRef, ticket), {
      uid: uid,
      message: message,
      title: title,
      date: Date(),
      ticket: ticket,
      email: email
    }).then(() => {
      $('#support .username').text('')
      $('#support .message').text('')
      $('#support .useremail').text('')
      PopupMessageModel(
        `${ticket} Placed`,
        `Your message with ticket id ${ticket} has been sent successfully for further assistance.`,
        '#009e1a',
        () => {}
      )
      document.querySelector('.sendmsg').reset()
    })
  }
}
