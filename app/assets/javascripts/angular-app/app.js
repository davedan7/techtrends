var app = angular.module('jobsApp', ['htmlFilter']);

// app.config, inject route provider,   .when (controller, template)

angular.module('htmlFilter', []).
  filter('stripHtmlTags', function() {
    return function(text) {
      return String(text).replace(/<\/?[^>]+(>|$)/g, "");
    };
  }
);