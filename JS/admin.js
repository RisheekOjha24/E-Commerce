// Navbar resposive menu code

$(".ham").on("click", function() {
    $(".ham").hide();
    $(".nav_items").css("right",'0');
    setTimeout(function() {
        $(".cross").show();
    }, 400);
});

$(".cross").on("click", function() {
    $(".cross").hide();
    $(".nav_items").css("right",'-30rem');
    $(".ham").show();
});
 
// Nabar resposive menu copde ends successfully----------------------------------------------------------------

//Switch when clcik on link
const toggleForm = (event) => {
    if (event) {
        event.preventDefault(); // Prevent the default behavior of the anchor tag
    }
    $('.container').toggleClass('active');
};
//Switch when clcik on link ended successfully----------------------------------------------------------------


const firebaseConfig = {
    apiKey: "AIzaSyCqc_mvK2Evq8nwCI6ammO-7fm9CzM-Hd8",
    authDomain: "auth-form-5cfc3.firebaseapp.com",
    projectId: "auth-form-5cfc3",
    storageBucket: "auth-form-5cfc3.appspot.com",
    messagingSenderId: "499103046125",
    appId: "1:499103046125:web:b651d029e1fa23466fafe4"
};

firebase.initializeApp(firebaseConfig);

//Firebase Sign Up code below --------------------------------

// Reference the email, password, name, gender, and feedback message input fields
var emailInput_signUp = $("#email-signUp");
var passwordInput_signUp = $("#password-signUp");
var nameInput = $("#username");

var submitButton = $("#sign-up-btn");


// Add click event handler for the Sign Up button
submitButton.click(function() {
  var email = emailInput_signUp.val();
  var password = passwordInput_signUp.val();
  var name = nameInput.val();


  // Sign up with email and password
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(userCredential) {
      // Sign up successful
      var user = userCredential.user;

      // Store additional information in Firestore
      firebase.firestore().collection('UserDetails').doc(user.uid).set({
        name: name,
        email: email  // Optionally, you can store the email as well
      })
      .then(() => {
        console.log('User information stored in the database.');
        // You can redirect to a different page or perform other actions here.
      })
      .catch((error) => {
        console.error('Error storing user information:', error);
      });

      console.log("You are registered: " + user.email);
      // You can redirect to a different page or perform other actions here.
    })
    .catch(function(error) {
      // Handle errors
      var errorMessage = error.message;
      console.error("Sign up error: " + errorMessage);
      // You can display an error message to the user.
    });
});

// Firebase Sign Up code finished successfully --------------------------------



//Validate form and Sign Up Animation code --------------------------------
function validateForm(form) {

    var password = form.password.value;
    var confirmPassword = form.confirmPassword.value;

  // Validate password
    var passwordPattern = /^\S{6,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 6 characters long and should not contain spaces.');
        return false; // Prevent form submission
    }


    // Check if password matches confirm password
    if (password !== confirmPassword) {
        alert('Password and Confirm Password do not match. Please try again.');
        return false; // Prevent form submission
    }

        
var originalWidth = $("#sign-up-form").width();
var originalHeight = $("#sign-up-form").height();

// Remove input elements and change CSS properties
$('#sign-up-form input,#sign-up-form h2').remove();

// Animate the transition
$("#sign-up-form").css({
    "width": originalWidth,
    "height": originalHeight,
    "border-radius": "40px",
    "text-align": "center",
    "background": "linear-gradient(45deg, #FF6B6B, #3B82F6, #9333EA, #FCD34D)"
}).animate({
     
    width: "100%", // Revert to the original width
     height:"4rem",// Revert to the original height
    
}, 1000); // Adjust the duration of the animation as needed (in milliseconds)


$("#sign-up-form .signup").text("Your acconut is created ? ");
$("#sign-up-form .signup").append("<a href='#' onclick='toggleForm();'>Sign in</a>");


setTimeout(function() {

    $('#sign-up-form h1').text("Hooray! You've joined our fantastic community.");
        
    $("#sign-up-form h1").css({
            "color": "white",
            "font-size": "18px",
            "padding":"10px 2px 20px 2px",
            
        }) 

}, 1200);


return false; 
}
//Validate form and Sign Up Animation code ended successfully----------------------------------------------------------------


// Firebase Login code below --------------------------------

// Reference the email and password input fields
var emailInput = $("#email-login");
var passwordInput = $("#password-login");
var submitButton = $("#login-btn");

submitButton.click(function () {
    var email_login = emailInput.val();
    var password_login = passwordInput.val();
    firebase.auth().signInWithEmailAndPassword(email_login, password_login)
        .then(function (userCredential) {
            // Sign in successful
            var user = userCredential.user;
            console.log("Congratulations, " + ", you are logged in as " + user.email);
            successful(user);
        })
        .catch(function (error) {
            // Handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("Invalid Email or Password. Please try again");
            // You can display an error message to the user.
        });
});

//Login code ended successfully----------------------------------------------------------------


//Login Animation code begins----------------------------------------------------------------
function successful(user) {
    // login form original height and width stored       
    var oWidth = $("#sign-in-form").width();
    var oHeight = $("#sign-in-form").height();

    // Remove input elements and change CSS properties
    $('#sign-in-form input,#sign-in-form h2,#sign-in-form .signup').remove();

    // Animate the transition
    $("#sign-in-form").css({
        "width": oWidth,
        "height": oHeight,
        "border-radius": "40px",
        "text-align": "center",
        "background": "linear-gradient(45deg, #FF6B6B, #3B82F6, #9333EA, #FCD34D)"
    }).animate({
        width: "100%", // Revert to the original width
        height: "4rem", // Revert to the original height
    }, 1000); // Adjust the duration of the animation as needed (in milliseconds)

    fetchUserName(user.uid)
        .then(function (userName) {
            setTimeout(function () {
                $('#sign-in-form h1').text("Congratulations! You are logged in as " + userName);

                $("#sign-in-form h1").css({
                    "color": "white",
                    "font-size": "18px",
                    "padding": "10px 2px 20px 2px"
                });
            }, 100);
        })
        .catch(function (error) {
            console.error("Error fetching user name:", error);
        });
}

const fetchUserName = (uid) => {
    return new Promise((resolve, reject) => {
        firebase.firestore().collection('UserDetails').doc(uid).get()
            .then((doc) => {
                if (doc.exists) {
                    // Document exists, resolve with the user name
                    var userName = doc.data().name;
                    resolve(userName);
                } else {
                    // Document does not exist, reject with an appropriate message
                    reject("User not found or document does not exist.");
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};

//Login animation code finished successfully ----------------------------------------------------------------