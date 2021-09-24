const signupform = document.querySelector('#f-signup');
const loginform = document.querySelector('#f-signin');
var email = '';


auth.onAuthStateChanged((user) => {
    if (user) {
        email = user.email;

    }
});

signupform.addEventListener('submit', (e) => {
    e.preventDefault();

    var email = signupform['inputEmail'].value;
    var pass = signupform['inputPassword1'].value;
    var cpass = signupform['inputPassword2'].value;

    if (pass === cpass) {
        console.log(email, pass, cpass);

        auth.createUserWithEmailAndPassword(email, pass).then(cred => {
            alert("Registered successflly");
            location.reload();
            document.addEventListener("DOMContentLoaded", function (event) {
                document.getElementById('cc-register').style.display = "none";
                document.getElementById('cc-login').style.display = "none";
                document.getElementById('cc-nav').style.display = "block";
                document.getElementById('cc-list').style.display = "block";
            });
        }).catch(error => {
            console.log(error);
            alert(error);
        });
    } else {
        alert("Passwords do not match");
    }
});


loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    var email = loginform['inputEmail'].value;
    var pass = loginform['inputPassword'].value;
    auth.signInWithEmailAndPassword(email, pass).then(cred => {
        alert("Logged in successflly");
        location.reload();
        document.addEventListener("DOMContentLoaded", function (event) {


            document.getElementById('cc-register').style.display = "none";
            document.getElementById('cc-login').style.display = "none";
            document.getElementById('cc-nav').style.display = "block";
            document.getElementById('cc-table').style.display = "block";
            document.getElementById('cc-list').style.display = "block";
            pass = "";
        });
    }).catch(error => {
        console.log(error);
        alert(error);
    });

    console.log(email, pass);
});