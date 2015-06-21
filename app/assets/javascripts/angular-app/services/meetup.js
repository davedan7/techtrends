function callbackformeetup (data) {
  console.log(data);
}

app.service('MeetupSearch', function($http){

  this.search = function(zip, searchWord, key){
    var parsedTerm = searchWord.split(" ").join("+");

    var url = "https://api.meetup.com/find/groups?key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&upcoming_events=true&text=" + parsedTerm + "&callback=callbackformeetup" ;
    return $http.jsonp(url);

    };

});
