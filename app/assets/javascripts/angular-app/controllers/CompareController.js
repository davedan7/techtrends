app.controller('CompareController', ['$scope', 'JobSearch', function($scope, JobSearch) {

  $scope.zipcode1               = "80202";
  $scope.zipcode2               = "30066";
  $scope.developerSearchWords  = [ 'web+developer', "front-end", "front+end", "back-end", "engineer", "full+stack", "developer"];

  $scope.titleDataPoints1       = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, angular: 0, react: 0, reactjs: 0, php: 0, java: 0};
  $scope.titleDataPoints2       = {javascript: 0, ruby: 0, python: 0, go: 0, angularjs: 0, angular: 0, react: 0, reactjs: 0, php: 0, java: 0};

  $scope.descriptionDataPoints1 = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backbone: 0};
  $scope.descriptionDataPoints2 = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backbone: 0};

  $scope.zipSearch = false;
  $scope.languageBreakdown = false;

// Job Search

  $scope.submitCompareSearch = function() {     // Is there a way to refactor out the chain of promises?
    $scope.zipSearch = true;
    for (var i = 0; i < $scope.developerSearchWords.length; i++) {
      JobSearch.search($scope.zipcode1, $scope.developerSearchWords[i])  // Perform query for each title search word
      .success(function(data){
        title1Parse(data);
        firstDescriptionParse(data);
      }).catch(function(err) {
        console.log("Page didn't load correctly");
      }).finally(function(){

        generateFirstTitleChart();
        // generateSecondTitleChart()
        // console.log($scope.rawData);
        // generateFirstTitleChart();
      });
    }

    for (var j = 0; j < $scope.developerSearchWords.length; j++) {
      JobSearch.search($scope.zipcode2, $scope.developerSearchWords[j])  // Perform query for each title search word
      .success(function(data){
        title2Parse(data);
        secondDescriptionParse(data);
      }).catch(function(err) {
        console.log("Page didn't load correctly");
      }).finally(function(){
        
        generateSecondTitleChart();
        // generateFirstTitleChart();
      });
  }
};


  var firstDescriptionParse = function(data) {   // Occurrance of keywords in job descriptions
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;
      var split = itemDescription.toLowerCase()
        .replace(/\W/g, " ")
        .split(/\s+/);

      for (var x = 0; x < split.length; x++) {
        $scope.descriptionDataPoints1[split[x]]++;
      }
    }
  };

  var secondDescriptionParse = function(data) {   // Occurrance of keywords in job descriptions
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemDescription = items[i].description;
      var split = itemDescription.toLowerCase()
        .replace(/\W/g, " ")
        .split(/\s+/);

      for (var x = 0; x < split.length; x++) {
        $scope.descriptionDataPoints2[split[x]]++;
      }
    }
  };

  var title1Parse = function(data) {    // Occurrance of keywords in job titles
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemTitle = items[i].title;  // Grab Descriptions
      var split = itemTitle.toLowerCase()    // Normalize Them
      .replace(/\W/g, " ")
      .split(/\s+/);

      for (var x = 0; x < split.length; x++) {     //Count occurrance of key words
        $scope.titleDataPoints1[split[x]]++;
      }
    }
  };

  var title2Parse = function(data) {    // Occurrance of keywords in job titles
    var items = data.value.items;

    for (var i = 0, len = items.length - 1; i <= len ; i++) {
      var itemTitle = items[i].title;  // Grab Descriptions
      var split = itemTitle.toLowerCase()    // Normalize Them
      .replace(/\W/g, " ")
      .split(/\s+/);

      for (var x = 0; x < split.length; x++) {     //Count occurrance of key words
        $scope.titleDataPoints2[split[x]]++;
      }
    }
  };

  function showLanguageBreakdown() {
    $scope.languageBreakdown = true;
  }


// First Title  chart
 
  var generateFirstTitleChart = function() {

    var chart1 = c3.generate({
      data: {
        bindto: '.chart1',
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
            // generateDescriptionChart1(d.id);
          },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

    setTimeout(function () {
      chart1.load({
        columns: [
          ["Javascript",  $scope.titleDataPoints1.javascript + $scope.titleDataPoints1.angularjs + $scope.titleDataPoints1.angular],
          ["Ruby",        $scope.titleDataPoints1.ruby],
          ["Python",       $scope.titleDataPoints1.python],
          ["Go",        $scope.titleDataPoints1.go],
          ["PHP",        $scope.titleDataPoints1.php],
          ["Java",        $scope.titleDataPoints1.java],
        ]
      });
    }, 1500);

    setTimeout(function () {
      chart1.unload({
        ids: 'data1'
      });
      chart1.unload({
        ids: 'data2'
      });
    }, 2500);
  };

// Secnod Title Chart1
  var generateSecondTitleChart = function() {

    var chart2 = c3.generate({
      data: {
        bindto: '.chart2',
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
            // generateDescriptionChart(d.id);
          },
        }
      });

    setTimeout(function () {
      chart2.load({
        columns: [
          ["Javascript",  $scope.titleDataPoints2.javascript + $scope.titleDataPoints2.angularjs + $scope.titleDataPoints2.angular],
          ["Ruby",        $scope.titleDataPoints2.ruby],
          ["Python",       $scope.titleDataPoints2.python],
          ["Go",        $scope.titleDataPoints2.go],
          ["PHP",        $scope.titleDataPoints2.php],
          ["Java",        $scope.titleDataPoints2.java],
        ]
      });
    }, 1500);

    setTimeout(function () {
      chart2.unload({
        ids: 'data1'
      });
      chart2.unload({
        ids: 'data2'
      });
    }, 2500);
  };


// First Description Chart
  var generateDescriptionChart1 = function(language) {
    
    // showLanguageBreakdown();

    var datasets = {
      Javascript: 
        [
          ["AngularJS",   $scope.descriptionDataPoints1.angular + $scope.descriptionDataPoints1.angularjs],
          ["ReactJS",     $scope.descriptionDataPoints1.react + $scope.descriptionDataPoints1.reactjs],
          ["Node",        $scope.descriptionDataPoints1.node + $scope.descriptionDataPoints1.nodejs],
          ["Backbone",    $scope.descriptionDataPoints1.backbone],
        ]
    };

    var chart1 = c3.generate({
      data: {
        bindto: '.chart1',
          // iris data from R
          columns: [
            ['data1', 30],
            ['data2', 120],
          ],
          type : 'pie',
          // onclick: function (d, i) { console.log("onclick", d, i); },
          onclick: function (d, i) { console.log(d.id, i); },
          // onclick: function (d, i) { searchMeetup(d.id); },
          // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        }
      });

  // $scope.descriptionDataPoints = {javascript: 0, ruby: 0, rails: 0, angular: 0, angularjs: 0, node: 0, jquery: 0, json: 0, react: 0, reactjs: 0, nodejs: 0, backbone: 0};
    setTimeout(function () {
      chart1.load({
        columns: datasets[language]
      });
    }, 1500);

    setTimeout(function () {
      chart1.unload({
        ids: 'data1'
      });
      chart1.unload({
        ids: 'data2'
      });
    }, 2500);
  };

}]);
