'use strict';

var app = angular.module('myApp.register', [
  'ngRoute',
  'services',
  'directives'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  })
;
}])

.controller('RegisterCtrl', function($scope, $location, $controller, appData) {
	$controller('ParentController', {$scope: $scope});
  $scope.addUser = function(){
		if ($scope.new_password_input === $scope.new_password2_input){
      var user_sel = appData.findByUsername($scope.new_user_input);
      if (user_sel.length === 0){
        var result = appData.addUser($scope.new_name_input, $scope.new_user_input, $scope.new_password_input);
        if (result)
          $scope.goBack();
        else
          alert('Error');
      }
      else{
        alert('User already exists');
      }
    }
    else{
      alert('Passwords dont match');
    }
	};
	$scope.goBack = function(){
		$location.path("/main");
	};
});