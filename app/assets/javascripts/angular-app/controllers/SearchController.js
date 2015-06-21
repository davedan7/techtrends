app.controller('SearchController', ['$scope', 'JobSearch','MeetupSearch', 'meetupApiKey', function($scope, JobSearch, MeetupSearch, meetupApiKey){

  $scope.zipcode = "80202";
  $scope.searchWords = "web developer";
  $scope.searchDescription = "";
  $scope.dataPoints = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, tdd: 0, mvc: 0, jquery: 0, json: 0};

  $scope.submitSearch = function() {
    JobSearch.search($scope.zipcode, $scope.searchWords)
    .success(function(data){
      $scope.searchResults = phraseParse(data);
      generateChart();
      $scope.searchMeetup();
    });
  };

  $scope.searchMeetup = function() {
    MeetupSearch.search($scope.zipcode, "ruby", meetupApiKey)
    .success(function(data){
      console.log(data);
      $scope.meetupResults = data;
    });
  };

  var phraseParse = function(data) {
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;  // Grab Descriptions
      var split = itemDescription.toLowerCase()    // Normalize Them
      .replace(/\W/g, " ")
      .split(/\s+/);

      for (var x = 0; x < split.length; x++) {     //Count occurrance of key words
        $scope.dataPoints[split[x]]++;
      }
    }
  };


  //new chart
  // function generateChart() {
  var generateChart = function() {

    var chart = c3.generate({
      data: {
        bindto: '.chart',
          // iris data from R
          columns: [
          ['data1', 30],
          ['data2', 120],
          ],
          type : 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

    setTimeout(function () {
      chart.load({
        columns: [
        ["Javascript", $scope.dataPoints.javascript],
        ["Ruby", $scope.dataPoints.ruby],
        ["Rails", $scope.dataPoints.angular],
        ["Node", $scope.dataPoints.angular],
        ["AngularJS", ($scope.dataPoints.angular + $scope.dataPoints.angular)],
        ["TDD", $scope.dataPoints.angular],
        ["MVC", $scope.dataPoints.angular],
        ]
      });
    }, 1500);

    setTimeout(function () {
      chart.unload({
        ids: 'data1'
      });
      chart.unload({
        ids: 'data2'
      });
    }, 2500);
  };

}]);
