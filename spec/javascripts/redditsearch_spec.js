describe('Service: myService', function() {

  beforeEach(module('myServiceModule'));

  var myService;
  var httpBackend;
  beforeEach(inject(function($httpBackend, _myService_) {
    httpBackend = $httpBackend;
    myService = _myService_;
  }));

});