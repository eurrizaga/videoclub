'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    controller: 'MainController'
  });
}])

.controller('MainController', function($scope, $controller, $http, movieData, userData) {
  $controller('ParentController', {$scope: $scope});

  $scope.selectedMovie = false;
  $scope.trailerUrl = "";
  $scope.selectedGenre = '';
  $scope.rentList = [];
  $scope.rentPrice = 2.99;
  $scope.searchName = '';
  
  $scope.getGenre = function(){
    return $scope.selectedGenre;
  };

  $scope.setGenre = function(value){
    $scope.selectedMovie = false;
    $scope.searchName = '';
    if (value !== '')
      $scope.selectedGenre = value.name;
    else
      $scope.selectedGenre = value;
  };
  
  $scope.getTrailer = function(movie){
    var url = movie.trailer.replace("/watch?v=", "/embed/");
    console.log(url);
    return url;
  };

  $scope.selectMovie = function(movie){
    $scope.currentMovie = movie;
    $scope.selectedMovie = true;
    $scope.trailerUrl = $scope.getTrailer(movie);
    $scope.searchName = '';
  };

  $scope.addMovie = function(){
    if (sessionStorage.user){
      if ($scope.selectedMovie === true){
        $scope.rentList.push({
          'id': $scope.rentList.length,
          'name': $scope.currentMovie.name,
          'quantity': 1
          }
        );
      }
      $scope.goBack();
    }
    else{
      alert("Please Login before Renting");
    }
  };
  $scope.goBack = function(){
    $scope.selectedMovie = false;
  };
  $scope.getPrice = function(){
    return $scope.rentList.length * $scope.rentPrice;
  };
  $scope.getSearchName = function(){
    return {name: $scope.searchName};
  };
  
  $scope.newSearch = function(){
    $scope.searchName = $scope.searchText;
    $scope.selectedMovie = false;
  };
  $scope.rentMovies = function(){
    if (userData.isLogged()){
      if ($scope.rentList.length > 0){
        var date = new Date();
        var newRent = {
          'date': date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
          'due': date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
          'movies': $scope.rentList,
          'price': $scope.getPrice()
        };
        userData.addRent($scope.getCurrentUser(), newRent);
        $scope.rentList = [];
        $scope.goBack();
      }
      else{
        alert("No movies selected");
      }
    }
    else{
      alert("Please Login before Renting");
    }
  };
});

