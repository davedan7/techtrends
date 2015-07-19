app.controller('SearchController', ['$scope', 'JobSearch','MeetupSearch', 'meetupApiKey', function($scope, JobSearch, MeetupSearch, meetupApiKey){

  // $scope.zipcode;               = "80202";
  $scope.developerSearchWords  = ["front-end", "front+end", "back-end","back+end", "engineer", "full+stack", "developer"];

  $scope.titleDataPoints       = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, angular: 0, react: 0, reactjs: 0, php: 0, scala: 0, clojure: 0};
  $scope.descriptionDataPoints = {javascript: 0, ember: 0, emberjs: 0, meteor: 0, meteorjs: 0, ruby: 0, rails: 0, django: 0, flask: 0, pyramid: 0, lotus: 0, sinatra: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backgonejs: 0, backbone: 0, scalatra: 0, lift: 0, akaa: 0, compojure: 0, pedestal: 0, hoplon: 0, ring: 0, playnice: 0 };

// Job Search

  $scope.zipSearch = false;
  $scope.showChart = false;
  $scope.showMeetups = false;
  $scope.breakdownLanguage = "";

  $scope.submitSearch = function() { // Is there a way to refactor out the chain of promises?
    $scope.searchField = false;
    for (var i = 0; i < $scope.developerSearchWords.length; i++) {
      $scope.zipSearch = true;
      JobSearch.search($scope.zipcode, $scope.developerSearchWords[i])  // Perform query for each title search word
      .success(function(data){
        console.log(data);
        titleParse(data);
        descriptionParse(data);
      }).catch(function(err) {
        console.log("Page didn't load correctly");
      }).finally(function(){
        $scope.showChart = true;
        generateTitleChart();
      });
    }
  };


  // Reset the view and search datapoints to their original value
  $scope.resetSearch = function() {  // There has to be a better way to do this than resetting each point individually
    $scope.searchField           = true;
    $scope.landingPage           = false;
    $scope.chartHelper           = false;
    $scope.showChart             = false;
    $scope.zipSearch             = false;
    $scope.showChart             = false;
    $scope.showMeetups           = false;
    $scope.zipcode               = "";
    $scope.titleDataPoints       = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, angular: 0, react: 0, reactjs: 0, php: 0, scala: 0, clojure: 0};
    $scope.descriptionDataPoints = {javascript: 0, ember: 0, emberjs: 0, meteor: 0, meteorjs: 0, ruby: 0, rails: 0, django: 0, flask: 0, pyramid: 0, lotus: 0, sinatra: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backgonejs: 0, backbone: 0, scalatra: 0, lift: 0, akaa: 0, compojure: 0, pedestal: 0, hoplon: 0, ring: 0, playnice: 0 };
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
      var split     = itemTitle.toLowerCase()    // Normalize Them
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

// Title  chart

  var toggleChartHelper = function() {
    $scope.chartHelper = !$scope.chartHelper;
  };

  var generateTitleChart = function() {
    toggleChartHelper();

    var chart = c3.generate({
      data: {
        bindto: '.chart',
        columns:
        [
          ['data1', 30],
          ['data2', 120],
        ],

        type : 'pie',
        onclick: function (d) {
          $scope.detailsFor = d.id;
          generateDescriptionChart(d.id);
        },
      }
    });

    setTimeout(function () {
      chart.load({
        columns: [
          ["Javascript",  $scope.titleDataPoints.javascript + $scope.titleDataPoints.angularjs + $scope.titleDataPoints.angular],
          ["Ruby",        $scope.titleDataPoints.ruby],
          ["Python",      $scope.titleDataPoints.python],
          ["Go",          $scope.titleDataPoints.go],
          ["PHP",         $scope.titleDataPoints.php],
          ["Scala",       $scope.titleDataPoints.scala],
          ["Clojure",     $scope.titleDataPoints.clojure],
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
          ["Angular",   $scope.descriptionDataPoints.angular + $scope.descriptionDataPoints.angularjs],
          ["React",     $scope.descriptionDataPoints.react + $scope.descriptionDataPoints.reactjs],
          ["Node",      $scope.descriptionDataPoints.node + $scope.descriptionDataPoints.nodejs],
          ["Ember",     $scope.descriptionDataPoints.ember + $scope.descriptionDataPoints.emberjs],
          ["Backbone",  $scope.descriptionDataPoints.backbone + $scope.descript],
          ["Meteor",    $scope.descriptionDataPoints.meteor + $scope.descriptionDataPoints.meteorjs],
        ],
      Ruby:
        [
          ["Rails",   $scope.descriptionDataPoints.rails],
          ["Lotus",   $scope.descriptionDataPoints.lotus],
          ["Sinatra", $scope.descriptionDataPoints.sinatra],
          ["Volt",    $scope.descriptionDataPoints.volt],
        ],
      Python:
        [
          ["Django",  $scope.descriptionDataPoints.django],
          ["Flask",   $scope.descriptionDataPoints.flask],
          ["Pyramid", $scope.descriptionDataPoints.pyramid],
        ],
      Scala:
        [
          ["Scalatra", $scope.descriptionDataPoints.scalatra],
          ["Lift",     $scope.descriptionDataPoints.lift],
          ["Akaa",     $scope.descriptionDataPoints.akaa],
        ],
      Clojure:
        [
          ["Compojure", $scope.descriptionDataPoints.compojure],
          ["Pedestal",  $scope.descriptionDataPoints.pedestal],
          ["Hoplon",    $scope.descriptionDataPoints.hoplon],
          ["Ring",      $scope.descriptionDataPoints.ring],
          ["Playnice",  $scope.descriptionDataPoints.playnice],
        ],
    };

    var chart = c3.generate({
      data: {
        bindto: '.chart',
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'donut',
          onclick: function (d, i) { 
            searchMeetup(d.id); 
            $scope.showMeetups = true;
            $scope.showChart = false;
            $scope.breakdownLanguage = d.id;
            toggleChartHelper();
          },

        },
        donut: {
          title: $scope.detailsFor + " Breakdown"
        }
      });

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
