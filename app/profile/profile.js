'use strict';

var app = angular.module('myApp.profile', [
  'ngRoute',
  'services'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileController'
  })
;
}])

.controller('ProfileController', function($scope, $location, appData) {
  $scope.currentUser = JSON.parse(sessionStorage.user);
  $scope.passwordConfirm = $scope.currentUser.password;
  $scope.saveChanges = function(){
    if ($scope.passwordConfirm === $scope.currentUser.password){
      appData.updateUserProfile($scope.currentUser);
      $scope.goBack();
    }
    else{
      alert("Passwords don't match");
    }
  };
  $scope.goBack = function(){
    $location.path("/main");
  };
});