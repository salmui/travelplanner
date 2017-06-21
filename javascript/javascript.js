// Variables
  var database = firebase.database()
  var venueid = ''
  var userid
  var dataref = database.ref('users/' + userid + '/data')
  var totaltripcounter

// On-Click Functions
  // New Trip Submit
    function newtripsubmit(event){
      var time = Date.now()
      event.preventDefault()
      var newTripDesc = $('#newtripdescrip').val()
      tripName = $('#newtripname').val().trim()
      debugger;
      console.log('Trip name = ' + tripName + '. Trip Description = ' + newTripDesc)
      database.ref('users/' + userid + '/trips/' + tripName).set({
        tripname: tripName,
        tripdesc: newTripDesc,
        tripcounter: 0,
        created: time
        })
      $('#newtripmodal').hide()
    }



  // New Destination Submit
    function newdestsubmit(event){
      event.preventDefault()
      var time = Date.now()
      debugger;
      var tripName = $(this)["0"].offsetParent.offsetParent.attributes[2].value
      var newDestname = $('#newdestname').val().trim()
      var newDestLoc = $('#newdestloc').val().trim()
      var newDestArr = $('#newdestarr').val().trim()
      var newDestDept = $('#newdestdept').val().trim()
      var newDestComm = $('#newdestcomm').val().trim()
      var currentTripCounter
      database.ref('users/' + userid + '/trips/' + tripName).once('value').then(function(snapshot){
        currentTripCounter = snapshot.val().tripcounter
      })
      database.ref('users/' + userid + '/trips/' + tripName + '/dests/' + newDestname).set({
        destName: newDestname,
        destLoc: newDestLoc,
        destArr: newDestArr,
        destDept: newDestDept,
        destComm: newDestComm,
        destcreated: time
      })
      $('#newdestmodal').hide()
    }

  // New User Submit
    function newusersubmit(){
      var userEmail = $('#newuseremail').val().trim()
      var userPassword = $('#newuserpw').val().trim()
      var confirmPassword = $('#newuserconfirm').val().trim()
        if(userPassword === confirmPassword){
          firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
              });
        } else {
          $('.errormsg').show()
        }
    }

// Modal Functionality
  //New User
    function newusersignup(event){
      event.preventDefault()
      console.log('clicked')
      $('#newusermodal').show()
    }
    $('.close').on('click', function(event){
      event.preventDefault()
      $('#newtripmodal').hide()
      $('#newusermodal').hide()
      $('#newdestmodal').hide()
    })

  //New Trip
    function ntmodal(event){
      event.preventDefault()
      $('#newtripmodal')
        .show()
    }
  //New Destination
    function ndmodal(event){
      debugger;
      console.log('clicked')
      event.preventDefault()
      $('#newdestmodal')
        .show()
        .attr("data-name", $(this).attr("data-name"))
    }

// Firebase Listeners
  firebase.auth().onAuthStateChanged((user) => {
    debugger;
    if (user) {
      console.log("---------auth state change-----------");
      userid = user.uid
      localStorage.setItem("userid", user.uid)
    }
  });

// My Trips
  $(document).on('ready', function(){
    userid = localStorage.getItem('userid')
    if(window.location.pathname === '/travelplanner/mytrips.html' || window.location.pathname === "/C:/Users/Nate/Desktop/code/travelplannerfork/mytrips.html"){
      var tripsref = database.ref('users/' + userid + '/trips').orderByChild("created")
      console.log('On mytrips page')
      console.log('userid = ' + userid)
      tripsref.once('value', function(response){
        var triptemp = response.val()
        triptemp = $.map( triptemp, function( value, created ) {
          var containersize = $('.tripcontainer')["0"].children.length
          var name = value.tripname
          var mapObject = value
          var tripframe = $('<div class="tripitem tripitem' + containersize + '">')
          var tname = $('<h1 class="tripname tripname' + containersize + '">')
          var tdescrip = $('<p class="tripdescrip tripdescrip' + containersize + '">')
          var closebtn = $('<span class="glyphicon glyphicon-remove-circle tripclose tripclose' + containersize + '" data-toggle="collapse" data-target="#destinfo">')
          var expandbtn = $('<a class="glyphicon glyphicon-chevron-down tripexpand" data-toggle="collapse" data-target="#destlist' + containersize +'"></a>')
          var destlist = $('<div class="collapse destdrop destdrop' + containersize + '">')
          var newdestbtn = $('<button  class="glyphicon glyphicon-plus opennewdest' + containersize + '"></button>')
          var destref = database.ref('users/' + userid + '/trips/' + name + '/dests').orderByChild("destcreated")
          tripframe
            .attr("id", containersize)
            .appendTo($('.tripcontainer'))
            .append(expandbtn)
            .append(closebtn)
          tname
            .text(mapObject.tripname)
            .appendTo($('#' + containersize))
          tdescrip
            .text(mapObject.tripdesc)
            .appendTo($('#' + containersize))
          destlist
            .attr("id", "destlist" + containersize)
            .appendTo($('.' + 'tripdescrip' + containersize))
          newdestbtn
            .attr("data-number", containersize)
            .attr("data-name", name)
            .addClass("opennewdest")
            .appendTo($('#destlist' + containersize))
          destarray = $.map(value.dests, function (value, name) {
            debugger;
            console.log(name)
            var destframe = $('<div class="destframe' + name + '">')
            destframe
              .appendTo($('#destlist' + containersize))
              .text(name)
          })
        })
      })
    } else {
      console.log('run nothing, not on mytrips page')
    }
  })

// On Click Listeners
  $(document).on('click', '#newusersubmit', newusersubmit);
  $(document).on('click', '#newdestsubmit', newdestsubmit);
  $(document).on('click', '#newtripsubmit', newtripsubmit);
  $(document).on('click', '.newusersignup', newusersignup);
  $(document).on('click', '.openmodnt', ntmodal);
  $(document).on('click', '.opennewdest', ndmodal);


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