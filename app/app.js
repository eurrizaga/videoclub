'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'myApp.view2',
  'myApp.version',
  'services',
  'directives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/main'});
}]);

app.controller('MainController', function($scope, $http, appData){
  $scope.genres = [];
  $scope.movies = [];

  var loadData = function(){
    // set genres
    $http.get('data/genres.json')
        .success(function(data){
          appData.setGenres(data);
          $scope.genres = appData.getGenres();
        })
        .error(function(){
          console.log('error loading genres');
        });
    // set movies
    $http.get('data/movies.json')
        .success(function(data){
          appData.setMovies(data);
          $scope.movies = appData.getMovies();
        })
        .error(function(){
          console.log('error loading movies');
        });
    $http.get('data/users.json')
        .success(function(data){
          appData.setUsers(data);
        })
        .error(function(){
          console.log('error loading users');
        });
  }
  loadData();

  $scope.selectedGenre = '';
  $scope.getGenre = function(){
    return $scope.selectedGenre;
  }
  $scope.setGenre = function(value){
    $scope.selectedMovie = false;
    $scope.searchName = '';
    if (value !== '')
      $scope.selectedGenre = value.name;
    else
      $scope.selectedGenre = value;
    
  }
  $scope.selectedMovie = false;
  $scope.trailerUrl = "";

  $scope.getTrailer = function(movie){
    var url = movie.trailer.replace("/watch?v=", "/embed/");
    console.log(url);
    return url;
  }

  $scope.selectMovie = function(movie){
    $scope.currentMovie = movie;
    $scope.selectedMovie = true;
    $scope.trailerUrl = $scope.getTrailer(movie);
    $scope.searchName = '';
  }

  $scope.rentList = [];
  $scope.addMovie = function(){
    if ($scope.selectedMovie === true){
      $scope.rentList.push({
        'id': $scope.rentList.length,
        'name': $scope.currentMovie.name,
        'quantity': 1
        }
      );
    }
  }
  $scope.goBack = function(){
    $scope.selectedMovie = false;
  }
  $scope.rentPrice = 2.99;
  $scope.getPrice = function(){
    return $scope.rentList.length * $scope.rentPrice;
  }

  $scope.searchName = '';
  $scope.getSearchName = function(){
    return {name: $scope.searchName};
  }
  
  $scope.newSearch = function(){
    $scope.searchName = $scope.searchText;
    
  }
  $scope.soon = function(){
    alert('Coming soon!!');
  }
  
  $scope.logged = false;
  $scope.loginAction = function(){
    var user_sel = appData.findByUsername($scope.user_input);
    if (user_sel.length > 0){
      user_sel = user_sel[0];
      if (user_sel.password === $scope.password_input){
        sessionStorage.user = JSON.stringify(user_sel);
        $rootScope.userActive = user_sel;
        $rootScope.logged = true;
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
  

});


