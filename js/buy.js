$(document).ready(function () {
  // var data, index
  var table = $('#data-table').DataTable({
    ajax: '/js/file.json',
    columns: [
      {
        data: 'network',
        render: function (data, type, row) {
          return '<span id="card"  class="card-bin">' + data + '</span>'
        }
      },
      {
        data: 'card',
        render: function (data, type, row) {
          return '<span id="card"  class="card-bin">' + data + '</span>'
        }
      },

          {
        data: 'balance',
        render: function (data, type, row) {
          //console.log('new balance:', data)
          return (
            '<span id="card" class="card-bin">$' +
            (data + genstr(1)) +
            '</span>'
          )
        }
      },
      {
        data: 'price',
        render: function (data, type, row) {
          return '<div id="buy" class="buy-now">BUY $' + data + '</div>'
        }
      },
      {
        data: 'country',
      }
    ]
  })

  //sort to randowm rows
 
 

  $('#data-table tbody').on('click', 'tr', function () {
    index = table.row(this).index()
    data = table.data()
    /* console.log('You clicked on ' + index + "'s row")
    console.log('Your data ' + data[index].pin) */
  })

  $(document).on('click', '#data-table td:nth-child(2)', function () {
    // console.log(data[index].card)
    bincheker(data[index].card)
    PopupConfirmModel(
      'BIN LOOKUP',
      'You are about to lookup this BIN ' + data[index].card,
      () => {
        hidepopup
        OpenLookupCC(data[index].card)
      }
    )
  })
  $(document).on('click', '#data-table td:nth-child(4)', function () {
    //console.log(data[index].price)

    if (localStorage.getItem('login') === null || localStorage.getItem('login') === 'false') {
      PopupConfirmModel(
        'USER NOT LOGGED IN',
        'Please you are required to signin before you can make purchase',
        signinuser
      )
    } else {
      amt = data[index].price
      PopupConfirmModel(
        'BUY NOW',
        'This card consist of Fullname, CVV/CVV2 Sate, City, phone number, SSN, etc.\n Are you sure you want to purchase this item' +
          $('.top-products').val() +
          ' for $' +
          data[index].price +
          ' ? | Current balance is $' +
          localStorage.getItem('balance'),
        buynow
      )
    }
  })

  $('#table-name').text($('.top-products').val())

  document
    .querySelector('.top-products')
    .addEventListener('change', function () {
      console.log('You selected: ', this.value)
      $('#table-name').text(this.value)
    })
    
  //OpenPaymentModal(b.data)
  //OpenLookupCC('472185')

})

function bincheker (bin) {
  var xhr = new XMLHttpRequest()

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      console.log(this.responseText)
    }
  })

  xhr.open('GET', 'https://bin-checker.net/api/376659')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var scheme = JSON.parse(xhr.responseText).scheme
      var type = JSON.parse(xhr.responseText).type
      var level = JSON.parse(xhr.responseText).level
      var country = JSON.parse(xhr.responseText).country
      var bank = JSON.parse(xhr.responseText).bank
      console.log(xhr.responseText)
      document.querySelector('.lookup-head').innerHTML = `  <div class="top-bin">
                        <div>
                            <p class="identifier">SCHEME:</p>
                            <p class="card-bin">${scheme}</p>
                        </div>
                        <div>
                            <p class="identifier">TYPE:</p>
                            <p class="card-bin">${type}</p>
                        </div>
                        <div>
                            <p class="identifier">LEVEL:</p>
                            <p class="card-bin">${level}</p>
                        </div>
                    </div>
                    <div class="down-bin">
                        <div>
                            <p class="identifier">COUNTRY:</p>
                            <p class="card-bin">${country.code} ${country.name}</p>
                        </div>
                        <div>
                            <p class="identifier">BANK: WEBSITE: PHONE#</p>
                            <p class="card-bin">${bank.name}</p>
                            <p class="identifier">${bank.website}</p>
                            <p class="card-bin">${bank.phone}</p>
                        </div>
                        
                    </div>`
    }
  }
  xhr.send()
}

function sortTable() {
  //get the parent table for convenience
  let table = document.getElementById("data-table");

  //1. get all rows
  let rowsCollection = table.querySelectorAll("tr");

  //2. convert to array
  let rows = Array.from(rowsCollection)
    .slice(1); //skip the header row

  //3. shuffle
  shuffleArray(rows);

  //4. add back to the DOM
  for (const row of rows) {
    table.appendChild(row);
  }
}


function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/*C:\Program Files\Google\Chrome\Application>chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

C:\Program Files\Google\Chrome\Application>
*/

