
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