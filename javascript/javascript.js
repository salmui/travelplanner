// Variables
var database = firebase.database()
var venueid = ''

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
