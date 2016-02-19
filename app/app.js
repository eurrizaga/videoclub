'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'services',
  'directives',
  'myApp.main',
  'myApp.register',
  'myApp.version',
  'myApp.editmovie',
  'myApp.profile'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
  
}]);

app.controller('ParentController', function($scope, appData){
  $scope.logged = false;
  $scope.genres = [];
  $scope.movies = [];
  $scope.soon = function(){
    alert('Coming soon!!');
  }
  $scope.login = function(){
    var user_sel = appData.findByUsername($scope.user_input);
    if (user_sel.length > 0){
      user_sel = user_sel[0];
      if (user_sel.password === $scope.password_input){
        sessionStorage.user = JSON.stringify(user_sel);
        $scope.logged = true;
        $scope.admin = user_sel.admin;
        $scope.user_input = "";
        $scope.password_input = "";
      }
      else{
        alert("Incorrect Password");
      }
    }
    else{
      alert("User does not exist");
    }
  }
  $scope.logout = function(){
    sessionStorage.clear();
    $scope.logged = false;  
  }

  $scope.isAdmin = function(){
    if (sessionStorage.user)
      return ($scope.getCurrentUser().admin);
    else
      return false;
  }
  $scope.getCurrentUser = function(){
    return JSON.parse(sessionStorage.user);
  }
  var loadData = function(){
    // set genres
    $scope.genres = appData.getGenres();
    $scope.movies = appData.getMovies();
    appData.getUsers();
    $scope.logged = appData.isLogged();
  }
  loadData();
});




