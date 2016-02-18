'use strict';

describe('myApp.register module', function() {
  var scope, $location, $controller, appData, services;
  var createController;
  
  
  beforeEach(module('myApp.register'));
  

  beforeEach(inject(function ($rootScope, $controller, _$location_) {
    
    $location = _$location_;
    scope = $rootScope.$new();

    createController = function() {
      return $controller('RegisterCtrl', {
        '$scope': scope,
        'services': services
      });
    };
  }));

  describe('register controller', function(){

    it('should ....', function($controller) {
      var controller = createController();
    });

  });

});