
var config = {
  apiKey: "AIzaSyCNZ9cMznTZNSVQx9WIxmsrcTWKF7LN_4A",
  authDomain: "ucbgp1.firebaseapp.com",
  databaseURL: "https://ucbgp1.firebaseio.com",
  projectId: "ucbgp1",
  storageBucket: "ucbgp1.appspot.com",
  messagingSenderId: "593100455307"
};
firebase.initializeApp(config);

var database = firebase.database();

var user_email = ""
var user_password = ""


$('#user-sign-up').on('click', function(){
var user_email = $('#user-email').val().trim();
var user_password = $('#password-input').val().trim();
var confirm_password = $('#confirm-password-input').val().trim();

console.log(user_email);
console.log(user_password);
console.log(confirm_password);

debugger;
if(user_password === confirm_password){
  firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // ...
    });
}
})
// Variables
// var database = firebase.database()
// var venueid = ''

// $.ajax({
//   url: 'https://www.eventbriteapi.com/v3/events/search/',
//   method: 'GET',
//   data: {
//   	token: '75JDM6P6R2M2PFYEECJ3',
//   	categories: '103',
//   	sort_by: '-distance',
//   	'location.address': 'San Francisco'
//   }
// }).done(function(response){
// 	console.log('--------Test 1---------')
// 	console.log(response)
// 	for (var i = 0; i < response.events.length; i++){
// 		var namePrint = response.events[i].name.text
// 		// venueid = response.events[i].venue_id
// 		console.log(namePrint)
// 	  };
// 	console.log('---------------------------')
// })
