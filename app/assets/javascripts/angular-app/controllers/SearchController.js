app.controller('SearchController', ['$scope', 'JobSearch','MeetupSearch', 'meetupApiKey', function($scope, JobSearch, MeetupSearch, meetupApiKey){

  $scope.zipcode               = "80202";
  $scope.developerSearchWords  = ['web+developer', "front-end", "front+end", "back-end", "engineer", "full+stack", "developer"];

  $scope.titleDataPoints       = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, angular: 0, react: 0, reactjs: 0, php: 0, java: 0};
  $scope.descriptionDataPoints = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backbone: 0};

// Job Search

  $scope.zipSearch = false;

  $scope.submitSearch = function() {     // Is there a way to refactor out the chain of promises?
    $scope.searchField = false;
    for (var i = 0; i < $scope.developerSearchWords.length; i++) {
      $scope.zipSearch = true;
      JobSearch.search($scope.zipcode, $scope.developerSearchWords[i])  // Perform query for each title search word
      .success(function(data){
        titleParse(data);
        descriptionParse(data);
      }).catch(function(err) {
        console.log("Page didn't load correctly");
      }).finally(function(){
        generateTitleChart();
      });
    }
  };


  $scope.landingPage = true;   // Show the intro page
  $scope.searchField = false;  // hide the zip search field

  $scope.hideIntroPage = function() {  // Hide landing page
    $scope.landingPage = false;
    $scope.searchField = true;
  };

  var descriptionParse = function(data) {   // Occurrance of keywords in job descriptions
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;
      var split = itemDescription.toLowerCase()
        .replace(/\W/g, " ")
        .split(/\s+/);

      for (var x = 0; x < split.length; x++) {
        $scope.descriptionDataPoints[split[x]]++;
      }
    }
  };

  var titleParse = function(data) {    // Occurrance of keywords in job titles
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemTitle = items[i].title;  // Grab Descriptions
      var split = itemTitle.toLowerCase()    // Normalize Them
      .replace(/\W/g, " ")
      .split(/\s+/);

      for (var x = 0; x < split.length; x++) {     //Count occurrance of key words
        $scope.titleDataPoints[split[x]]++;
      }
    }
  };

  function removeTags (string) {
    return string.replace(/<\/?[^>]+(>|$)/g, "");
  }
// Meetup Search
  var searchMeetup = function(searchWord) {
    MeetupSearch.search($scope.zipcode,  meetupApiKey, searchWord)
    .success(function(data){
      // console.log(data);
      console.log('successful response: ', data);
      $scope.meetupEvents = data.data;
    })
    .catch(function(err) {
      console.log("Page didn't load correctly");
    });
  };

  // var RedditSearch = function(searchWord) {
  //   RedditSearch.seach
  // };
// Title  chart
 
  var generateTitleChart = function() {

    var chart = c3.generate({
      data: {
        bindto: '.chart',
          // iris data from R
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'pie',
          // onclick: function (d, i) { console.log("onclick", d, i); },
          // onclick: function (d, i) { console.log(d.id); },
          onclick: function (d) { 
            // $scope.languageBreakdown = true;
            // showLanguageBreakdown();
            $scope.detailsFor = d.id;
            generateDescriptionChart(d.id);
          },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

  // $scope.titleDataPoints = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, react: 0, reactjs: 0};
    setTimeout(function () {
      chart.load({
        columns: [
          ["Javascript",  $scope.titleDataPoints.javascript + $scope.titleDataPoints.angularjs + $scope.titleDataPoints.angular],
          ["Ruby",        $scope.titleDataPoints.ruby],
          ["Python",      $scope.titleDataPoints.python],
          ["Go",          $scope.titleDataPoints.go],
          ["PHP",         $scope.titleDataPoints.php],
          ["Java",        $scope.titleDataPoints.java],
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


  var generateDescriptionChart = function(language) {

    
    var datasets = {
      Javascript: 
        [
          ["AngularJS",   $scope.descriptionDataPoints.angular + $scope.descriptionDataPoints.angularjs],
          ["ReactJS",     $scope.descriptionDataPoints.react + $scope.descriptionDataPoints.reactjs],
          ["Node",        $scope.descriptionDataPoints.node + $scope.descriptionDataPoints.nodejs],
          ["Backbone",    $scope.descriptionDataPoints.backbone],
        ]
    };

    var chart = c3.generate({
      data: {
        bindto: '.chart',
          // iris data from R
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'donut',
          // onclick: function (d, i) { console.log("onclick", d, i); },
          // onclick: function (d, i) { console.log(d.id, i); },
          onclick: function (d, i) { searchMeetup(d.id); },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
          title: $scope.detailsFor + " Breakdown"
        }
      });

  // $scope.descriptionDataPoints = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backbone: 0};
    setTimeout(function () {
    chart.transform('donut');
      chart.load({
        columns: datasets[language]
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

