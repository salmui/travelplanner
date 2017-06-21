
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

  var database = firebase.database()
  var venueid = ''
  var userid
// On-Click Listeners
  // New Trip Submit
    $('#newtripsubmit').on('click', function(event){
      event.preventDefault()
      var newTripDesc = $('#newtripdescrip').val()
      tripName = $('#newtripname').val().trim()
      console.log('Trip name = ' + tripName + '. Trip Description = ' + newTripDesc)
      database.ref(userid + '/trips/' + tripName).set({
        tripname: tripName,
        tripdesc: newTripDesc,
        tripcounter: 0
        })
      $('#newtripmodal').hide()
    })
  //New Destination Submit
    $('#newdestsubmit').on('click', function(event){
      event.preventDefault()
      var newDest = $('#newdestname').val().trim()
      var newDestLoc = $('#newdestloc').val().trim()
      var newDestArr = $('#newdestarr').val().trim()
      var newDestDept = $('#newdestdept').val().trim()
      var newDestComm = $('#newdestcomm').val().trim()
      var currentTripCounter
      database.ref(userid + '/' + tripName).once('value').then(function(snapshot){
        console.log(snapshot.val().tripcounter)
        currentTripCounter = snapshot.val().tripcounter
      })
      database.ref(userid + '/' + tripName + '/dests/' + currentTripCounter).set({
        destName: newDest,
        destLoc: newDestLoc,
        destArr: newDestArr,
        destDept: newDestDept,
        destComm: newDestComm
      })
    })

  // New User Submit
    $('#newusersubmit').on('click', function(){
        var userEmail = $('#newuseremail').val().trim()
        var userPassword = $('#newuserpw').val().trim()
        var confirmPassword = $('#newuserconfirm').val().trim()
        debugger;
          if(userPassword === confirmPassword){
            firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
              // Handle Errors here.
              debugger;
              var errorCode = error.code;
              var errorMessage = error.message;
              // ...
                });
          } else {
            $('.errormsg').show()
          }
    })

    // Returning User Submit
      $('#returningusersubmit').on('click', function(){
          var returninguserEmail = $('#returninguseremail').val().trim()
          var returninguserPassword = $('#returninguserpw').val().trim()
          debugger;
            if(userPassword === confirmPassword){
              firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
            } else {
              $('.errormsg').show()
            }
      })
  // Modal Functionality
    //New User
      $('.newusersignup').on('click', function(event){
        event.preventDefault()
        console.log('clicked')
        $('#newusermodal').show()
      })
      $('.close').on('click', function(event){
        event.preventDefault()
        $('#newtripmodal').hide()
        $('#newusermodal').hide()
        $('#newdestmodal').hide()
      })

      //Returning User
        $('.returninguserlogin').on('click', function(event){
          event.preventDefault()
          console.log('clicked')
          $('#returninguser').show()
        })
        $('.close').on('click', function(event){
          event.preventDefault()
          $('#returninguser').hide()
        })

    //New Trip
      $('.openmodnt').on('click', function(event){
        event.preventDefault()
        $('#newtripmodal').show()
      })
    //New Destination
      $('.opennewdest').on('click', function(event){
        event.preventDefault()
        $('#newdestmodal').show()
      })

// Firebase Listeners
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid);
      userid = user.uid
      localStorage.setItem("userid", user.uid)
      database.ref(userid + '/')
    }
  });

// My Trips
$(document).on('ready', function(){
  userid = localStorage.getItem('userid')
  if(window.location.pathname === '/travelplanner/mytrips.html' || window.location.pathname === "/C:/Users/Nate/Desktop/code/travelplannerfork/mytrips.html"){
    console.log('On mytrips page')
    console.log('userid = ' + userid)
    database.ref(userid + '/trips').on('value', function(response){
      var temp1 = Object.keys(response)
      console.log(temp1.length)
      var triplist = $('<div class="tripitem">')
      var triplistname = $('<div class="tripname">')
      var triplistdescrip = $('<div class="tripdescrip">')
      var triplistopen = $('<span class="tripopen">')
      var newlistdest = $('<button class="newdest">')
      for(var i = 0; i < response.length; i++){
        console.log(response.length + ' : response length')
        triplist
          .appendTo($('.trips'))
          .append(triplistname)
          .append(triplistdescrip)
          .append(triplistopen)
          .append(newlistdest)
          .addAttr("data-number", i)
      }
    })
  } else {
    console.log('run nothing, not on mytrips page')
  }
})

$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

//
// // Upload files to a database
// $target_path = "uploads/";
//
// $target_path = $target_path . basename( $_FILES['uploadedfile']['name']);
//
// if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
//     echo "The file ".  basename( $_FILES['uploadedfile']['name']).
//     " has been uploaded";
// } else{
//     echo "There was an error uploading the file, please try again!";
// }

// base eventbrite API
  // $.ajax({
  //   url: 'https://www.eventbriteapi.com/v3/events/search/',
  //   method: 'GET',
  //   data: {
  //     token: '75JDM6P6R2M2PFYEECJ3',
  //     categories: '103',
  //     sort_by: '-distance',
  //     'location.address': 'San Francisco, CA'
  //   }
  // }).done(function(response){
  //     console.log(response)
  //     for (var i = 0; i < response.length; i++){
  //         var namePrint = response.events[i].name.text
  //         var idPrint = response.events[i].venue_id
  //           $.ajax({
  //             url: 'https://www.eventbriteapi.com/v3/venues/' + idPrint + '/',
  //             method: 'GET',
  //             data: {
  //               token: '75JDM6P6R2M2PFYEECJ3'
  //             }
  //           }).done(function(response){
  //             var venueName = response.name
  //             // console.log('--------Event ' + i + ' -----------')
  //             console.log('Event Name = ' + namePrint)
  //             console.log('venue_id = ' + idPrint)
  //             console.log('Venue Name = ' + venueName)
  //           })

  //       };
  // })

//eventbrite venue API
  // $.ajax({
  //   url: 'https://www.eventbriteapi.com/v3/venues/19770605/',
  //   method: 'GET',
  //   data: {
  //     token: '75JDM6P6R2M2PFYEECJ3'
  //   }
  // }).done(function(response){
  //   console.log(response)
  // })
