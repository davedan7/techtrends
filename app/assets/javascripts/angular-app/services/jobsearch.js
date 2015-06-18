var rootUrl = "https://pipes.yahoo.com/pipes/pipe.run?_id=9cb44301dcece96db1d28de6959bd25c&_render=json&locationinput1=";  // Yahoo pipes address for query

app.service('JobSearch', function($http){
  this.search = function(zip, searchTerm){
    var parsedTerm = searchTerm.split(" ").join("+");
    return $http.get(rootUrl + zip + '&textinput2=' + parsedTerm);
  };
});