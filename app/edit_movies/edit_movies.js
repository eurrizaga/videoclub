'use strict';

var app = angular.module('myApp.editmovie', [
  'ngRoute',
  'services',
  'directives'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/editmovie', {
    templateUrl: 'edit_movies/edit_movies.html',
    controller: 'EditMoviesControlller'
  })
;
}])

.controller('EditMoviesControlller', function($scope, $location, movieData) {
	$scope.selected = false;
  
  $scope.addMovie = function(){
		if ($scope.selectedIndex === -1){
      var movie_sel = movieData.findMovieByNameYear($scope.name_input, $scope.year_input);
      if (movie_sel.length === 0){
        var result = movieData.addMovie($scope.name_input, $scope.year_input, $scope.quantity_input, $scope.genre_input, $scope.rating_input, $scope.trailer_input, $scope.img_input, $scope.info_input);
        if (result)
          $scope.goBack();
        else
          alert('Error');
      }
      else{
        alert('Movie already exists');
      }
    }
    else{
      var result = movieData.editMovie($scope.selectedIndex, $scope.name_input, $scope.year_input, $scope.quantity_input, $scope.genre_input, $scope.rating_input, $scope.trailer_input, $scope.img_input, $scope.info_input);
       if (result)
          $scope.goBack();
        else
          alert('Error');
    }
    
	};
	$scope.goBack = function(){
		$scope.selected = false;
	};
  $scope.newMovie = function(){
    $scope.selectedIndex = -1;
    $scope.img_input = "";
    $scope.name_input = "";
    $scope.year_input = "";
    $scope.quantity_input = "";
    $scope.genre_input = "";
    $scope.rating_input = "";
    $scope.trailer_input = "";
    $scope.info_input = "";
    $scope.selected = true;
    $scope.actionName = "CREATE NEW";
  };

  $scope.getImg = function(){
    if ($scope.img_input !== "")
      return $scope.img_input;
    else
      return "img/blank_page.jpg";
  };

  $scope.editMovie = function(movie){
    $scope.selectedIndex = movie.id;
    $scope.img_input = movie.img;
    $scope.name_input = movie.name;
    $scope.year_input = movie.year;
    $scope.quantity_input = movie.quantity;
    $scope.genre_input = movie.genre;
    $scope.rating_input = movie.rating;
    $scope.trailer_input = movie.trailer;
    $scope.info_input = movie.info;
    $scope.selected = true;
    $scope.actionName = "SAVE CHANGES";
  };
  $scope.deleteMovie = function(movie){
    var r = confirm("Are you sure yo want to delete " + movie.name + "?");
    if (r == true) {
        movieData.deleteMovie(movie);
    }
  };

});