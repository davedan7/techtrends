angular.module('jobsApp.filters', []).
  filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<\/?[^>]+(>|$)/g, "");
    };
  }
);