'use strict';

var app = angular.module('myApp.profile', [
  'ngRoute',
  'services',
  'directives'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileControlller'
  })
;
}])

.controller('ProfileControlller', function($scope, $location, appData) {
  $scope.currentUser = JSON.parse(sessionStorage.user);
  $scope.passwordConfirm = $scope.currentUser.password;
  $scope.saveChanges = function(){
     
  };


});