//var elements = document.getElementById('listu');
var dat = [];
var html = '';
db.collection("unicc").get()
    .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            dat.push(doc.data());
            const la = `
       <tr>
       <th scope="row">${doc.data()['useremail']}</th>
       <td>${doc.data()['network']}</td>
       <td>${doc.data()['timestamp']}</td>
       <td>${doc.data()['card']}</td>
       <td>$${doc.data()['price']}.00</td>
       <td class="bg-success">Accept</td>
       <td class="bg-danger">Delete</td>
       </tr>
       `;
            html += la;
        });
        document.querySelector('#listu').innerHTML = html;
    }).catch((e) => {
        alert('Error: ' + e);
    });;



var elements = document.querySelector('.list');
var lh = document.querySelector('.lh');
var rh = document.querySelector('.rh');
var tbl = document.querySelector('.table');
var register = document.querySelector('.register');
var login = document.querySelector('#login');
var data = [];
var html = '';
var cc;
var u;
var uid;

function isLogin() {

    document.getElementById('cc-register').style.display = "none";
    document.getElementById('cc-login').style.display = "none";
    document.getElementById('cc-list').style.display = "block";
    document.getElementById('cc-loader').style.display = "none";
    document.getElementById('cc-nav').style.display = "block";
    document.getElementById('navbarDropdown').innerHTML = email;



}

function notLogin() {
    document.getElementById('cc-register').style.display = "none";
    document.getElementById('cc-login').style.display = "block";
    document.getElementById('cc-nav').style.display = "none";
    document.getElementById('cc-loader').style.display = "none";
    //document.getElementById('cc-list').style.display = "none";
    var element = document.getElementById('cc-list');
    element.parentNode.removeChild(element);

}
auth.onAuthStateChanged((user) => {
    if (user) {
        u = user;
        email = user.email;
        uid = user.uid;
        isLogin();
    } else {
        notLogin();
    }
});

function ActionEvents() {

    //turn on register form
    rh.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cc-register').style.display = "block";
        document.getElementById('cc-login').style.display = "none";
        document.getElementById('cc-table').style.display = "none";
    });
    //turn on login form
    lh.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('cc-register').style.display = "none";
        document.getElementById('cc-login').style.display = "block";
        document.getElementById('cc-table').style.display = "none";
    });
}



ActionEvents();


//calling action event





document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        //  document.getElementById('cc-register').style.display = "none";
        document.getElementById('cc-login').style.display = "block";


    });
});


/* $(document).ready(function () {
    $('#cc-table tbody').on('click', 'td', function () {

        var column_num = parseInt($(this).index());
        //console.log('column index:' + column_num);

        var row_num = parseInt($(this).parent().index());
        //console.log('rowindex:'+row_num );

        if (column_num === 4) {
            const r = window.confirm('Are you sure you want to ACCEPT this payment?');
            if (r == true) {
                window.open("https://commerce.coinbase.com/checkout/15aa5270-60ae-40e3-9455-5884809787ab");
            } else {

            }
        }
    });
}); */

$(document).ready(function () {
    $('#cc-tableu tbody').on('click', 'td', function () {

        var column_num = parseInt($(this).index());
        //console.log('column index:' + column_num);

        var row_num = parseInt($(this).parent().index());
        //console.log('rowindex:'+row_num );
        //ACCEPT
        if (column_num === 5) {
            const r = window.confirm('Are you sure you want to accept this payment?');
            if (r == true) {

                console.log('row number: ', row_num);
                //console.log(dat[row_num]['card']);
                send(dat[row_num]['card'], dat[row_num]['useremail']);

                // window.open("https://commerce.coinbase.com/checkout/15aa5270-60ae-40e3-9455-5884809787ab");
            } else {

            }
        }
        if (column_num === 6) {
            const r = window.confirm('Are you sure you want to delete this payment?');
            if (r == true) {

                console.log('row number: ', row_num);
                db.collection("unicc").doc(dat[row_num]['useremail']).delete().then(function () {
                    console.log("Document successfully deleted!");
                    alert("Document successfully deleted!");
                    //location.reload();
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
            } else {

            }
        }

    });
});

function send(card, email) {
    db.collection("unicc").doc(email)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                db.collection("unipur").doc().set({
                    "address": doc.data()['address'],
                    "bin": doc.data()['bin'],
                    "bank": doc.data()['bank'],
                    "balance": doc.data()['balance'],
                    "card": doc.data()['card'],
                    "city": doc.data()['city'],
                    "country": doc.data()['country'],
                    "cvv": doc.data()['cvv'],
                    "email": doc.data()['email'],
                    "expiry": doc.data()['expiry'],
                    "fullname": doc.data()['fullname'],
                    "network": doc.data()['network'],
                    "phone": doc.data()['phone'],
                    "price": doc.data()['price'],
                    "useremail": doc.data()['useremail'],
                    "pin": doc.data()['pin'],
                    "state": doc.data()['state'],
                    "card": doc.data()['card'],
                    "timestamp": doc.data()['timestamp'],
                    "userid": uid,
                    "zip": doc.data()['zip'],

                }).then((v)=>{
                    alert('Sent Successfully');
                    console.log('Sent Successfully');
                    
                }).catch((e)=>{
                    alert(e)
                });


                //sendEmail(cc_det, email);
            } else {

                alert("No such document!");
            }
        }).catch(function (error) {
            alert("Error getting documentsss: " + error);
        });
}

function sendEmail(message, email) {
    /*
User name
otengs16@gmail.com
Password
546580420BF5E7D14823BC4D6AD21B41121F
Copy
Server
smtp.elasticemail.com
Port
2525

apiF6BEF3DB37A1CC627068DEB089400447EE75BC8715B5231F50E432448EB80228AE5CAF94F5D57BEA2D09E1F996042B6E

   
    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "otengs16@gmail.com",
        Password: "546580420BF5E7D14823BC4D6AD21B41121F",
        To: email,
        From: "otengs16@gmail.com",
        Subject: "Unicc Credit Cards",
        Body: message,
    }).then(
        message => alert(message +" "+ email),
    ); */
}