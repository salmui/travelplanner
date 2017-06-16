// Variables
  var database = firebase.database()
  var venueid = ''







// base eventbrite API
  $.ajax({
    url: 'https://www.eventbriteapi.com/v3/events/search/',
    method: 'GET',
    data: {
      token: '75JDM6P6R2M2PFYEECJ3',
      categories: '103',
      sort_by: '-distance',
      'location.address': 'San Francisco'
    }
  }).done(function(response){
      console.log(response)
      for (var i = 0; i < 10; i++){
          var namePrint = response.events[i].name.text
          var idPrint = response.events[i].venue_id
          console.log(namePrint + '---' + idPrint + '---' + i)
            $.ajax({
              url: 'https://www.eventbriteapi.com/v3/venues/' + idPrint + '/',
              method: 'GET',
              data: {
                token: '75JDM6P6R2M2PFYEECJ3'
              }
            }).done(function(response){
              var venueName = response.name
              console.log('--------Event ' + i + ' -----------')
              // console.log('Event Name = ' + namePrint)
              // console.log('venue_id = ' + idPrint)
              // console.log('Venue Name = ' + venueName)
            })

        };
  })

//eventbrite venue API
  $.ajax({
    url: 'https://www.eventbriteapi.com/v3/venues/19770605/',
    method: 'GET',
    data: {
      token: '75JDM6P6R2M2PFYEECJ3'
    }
  }).done(function(response){
    console.log(response)
  })