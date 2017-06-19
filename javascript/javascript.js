// Variables
  var database = firebase.database()
  var venueid = ''
  var userid
// On-Click Listeners
  // New Trip Submit
    $('#newtripsubmit').on('click', function(event){
      var time = Date.now()
      event.preventDefault()
      var newTripDesc = $('#newtripdescrip').val()
      tripName = $('#newtripname').val().trim()
      console.log('Trip name = ' + tripName + '. Trip Description = ' + newTripDesc)
      database.ref('users/' + userid + '/trips/' + tripName).set({
        tripname: tripName,
        tripdesc: newTripDesc,
        tripcounter: 0,
        created: time
        })
      $('#newtripmodal').hide()
    })

  // New Destination Submit
    $('#newdestsubmit').on('click', function(event){
      event.preventDefault()
      var newDest = $('#newdestname').val().trim()
      var newDestLoc = $('#newdestloc').val().trim()
      var newDestArr = $('#newdestarr').val().trim()
      var newDestDept = $('#newdestdept').val().trim()
      var newDestComm = $('#newdestcomm').val().trim()
      var currentTripCounter
      database.ref('users/' + userid + '/' + tripName).once('value').then(function(snapshot){
        console.log(snapshot.val().tripcounter)
        currentTripCounter = snapshot.val().tripcounter
      })
      database.ref('users/' + userid + '/' + tripName + '/dests/' + currentTripCounter).set({
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
    }
  });

// My Trips
  $(document).on('ready', function(){
    userid = localStorage.getItem('userid')
    if(window.location.pathname === '/travelplanner/mytrips.html' || window.location.pathname === "/C:/Users/Nate/Desktop/code/travelplannerfork/mytrips.html"){
      var tripframe = $('<div class="tripitem">')
      var tripsref = database.ref('users/' + userid + '/trips').orderByChild("created")
      console.log('On mytrips page')
      console.log('userid = ' + userid)
      tripsref.once('value', function(response){
        // if(response != null){
          var temp1 = Object.keys(response)
          var triptemp = response.val()
          debugger;
          console.log(temp1.length)
          for(var i = 0; i < temp1.length; i++){
            // console.log(triptemp[i] + "Index: " + i)
          }
        // }
      })
    } else {
      console.log('run nothing, not on mytrips page')
    }
  })

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