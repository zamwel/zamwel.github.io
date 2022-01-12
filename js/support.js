function sendmessage () {
  var title, message, email, ticket
  title = $('#support .username').val()
  message = $('#support .message').val()
  email = $('#support .useremail').val()
  ticket = genstr(10)

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
    db.collection('unicctoolsuserstickets')
      .doc(localStorage.getItem('uid'))
      .collection(ticket)
      .doc(title)
      .set({
        uid: localStorage.getItem('uid'),
        message: message,
        title: title,
        date: Date(),
        ticket: ticket,
        email: email
      })
      .then(() => {
        $('#support .username').text('')
        $('#support .message').text('')
        $('#support .useremail').text('')
        PopupMessageModel(
          `${ticket} Placed`,
          `Your message with ticket id ${ticket} has been sent successfully for further assistance.`, '#009e1a',()=>{}
        )
      })
  }
}
