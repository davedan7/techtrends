var callbackformeetup  = function (data) {
  data.data.forEach(logElements);
  // console.log(data);
}; 

function logElements (element, index, array) {
  console.log(element.name);
  console.log(element.link);
}


app.service('MeetupSearch', function($http){

  this.search = function(zip, key, searchWord){
    // var parsedTerm = searchWord.split(" ").join("+");
    var url = "https://api.meetup.com/find/groups?key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&upcoming_events=true&text=" + searchWord + "&callback=callbackformeetup" ;

    // return $http.jsonp("https://api.meetup.com/find/groups?key=52147258472159b1938714519435029&sign=true&photo-host=public&zip=80202&upcoming_events=true&text=ruby&callback=callbackformeetup");
    return $http.jsonp(url);
    };

});
// "https://api.meetup.com/find/groups?key=52147258472159b1938714519435029&sign=true&photo-host=public&zip=80202&upcoming_events=true&text=ruby&callback=callbackformeetup"