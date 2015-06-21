
app.service('JobSearch', function($http){
  var rootUrl = "https://pipes.yahoo.com/pipes/pipe.run?_id=9cb44301dcece96db1d28de6959bd25c&_render=json&locationinput1=";  // Yahoo pipes address for query

  this.search = function(zip, searchTerm){
    // var techWords = ["developer", "web", "front-end", "front", "engineer"];
    var parsedTerm   = searchTerm.split(" ").join("+");
    // var promiseOne   = $http.get(rootUrl + zip + '&textinput2=' + 'web+developer');
    // var promiseOne   = $http({method: 'GET', url: rootUrl + zip + '&textinput2=' + 'web+developer'});
    // var promiseTwo   = $http({method: 'GET', url: rootUrl + zip + '&textinput2=' + 'developer'});
    // var promiseThree   = $http({method: 'GET', url: rootUrl + zip + '&textinput2=' + 'front+end'});
    // var promiseTwo   = $http.get(rootUrl + zip + '&textinput2=' + 'developer');
    // var promiseThree = $http.get(rootUrl + zip + '&textinput2=' + 'front+end');

    // $q.all([promiseOne, promiseTwo, promiseThree]).then(function(data) {
    //   console.log(data[0], data[1], data[2]);
    // });
    return $http.get(rootUrl + zip + '&textinput2=' + parsedTerm);
  };
});
{ }
