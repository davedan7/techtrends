var app = angular.module('jobsApp', ['htmlFilter']);

angular.module('htmlFilter', []).
  filter('stripHtmlTags', function() {
    return function(text) {
      return String(text).replace(/<\/?[^>]+(>|$)/g, "");
    };
  }
);