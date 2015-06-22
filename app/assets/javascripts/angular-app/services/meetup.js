
app.service('MeetupSearch', function($http){

  this.search = function(zip, key, searchWord){
    var url = "https://api.meetup.com/find/groups?key=" + key + "&sign=true&photo-host=public&zip=" + zip + "&upcoming_events=true&text=" + searchWord + "&callback=JSON_CALLBACK" ;

    return $http.jsonp(url);
    };

});