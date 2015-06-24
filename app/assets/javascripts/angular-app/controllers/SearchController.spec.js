  describe('Events', function() {

    it('should emit an event', function() {
      expect(scope.$emit).toHaveBeenCalledWith('my-event');
      expect(scope.$emit.calls.count()).toBe(1);
    });

    it('should do something when some-event is caught', inject(function($rootScope) {
      $rootScope.$broadcast('some-event');
      // Check for state after event is caught.
      expect(MyController.myNumber).toBe(1);
    }));

  });