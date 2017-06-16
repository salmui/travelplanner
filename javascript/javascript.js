// Variables
  var database = firebase.database()
  var venueid = ''
  var tripName = 'Midwest'

$('#newtripsubmit').on('click', function(event){
    event.preventDefault()
    var newTripDesc = $('#newtripdescrip').val()
    tripName = $('#newtripname').val().trim()
    console.log('Trip name = ' + tripName + '. Trip Description = ' + newTripDesc)
    database.ref('testUser/' + tripName).set({
        tripname: tripName,
        tripdesc: newTripDesc,
        tripcounter: 0
        })
})
$('#newdestsubmit').on('click', function(event){
    event.preventDefault()
    var newDest = $('#newdestname').val().trim()
    var newDestLoc = $('#newdestloc').val().trim()
    var newDestArr = $('#newdestarr').val().trim()
    var newDestDept = $('#newdestdept').val().trim()
    var newDestComm = $('#newdestcomm').val().trim()
    var currentTripCounter
    database.ref('testUser/' + tripName).once('value').then(function(snapshot){
        console.log(snapshot.val().tripcounter)
        currentTripCounter = snapshot.val().tripcounter
    })
    database.ref('testUser/' + tripName + '/dests/' + currentTripCounter).set({
        destName: newDest,
        destLoc: newDestLoc,
        destArr: newDestArr,
        destDept: newDestDept,
        destComm: newDestComm
    })
    database.ref('testUser/' + tripName).update({
        tripcounter: currentTripCounter + 1
    })
})


// $('#user_submit').on('click', function(){
//     var user_email =
//     var user_password =
//     var confirm_password =
//     debugger;
//     if(user_password === confirm_password){
//         firebase.auth().createUserWithEmailAndPassword(user_email, user_password).catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // ...
//             });
//     }
// })

// firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // ...
// });

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