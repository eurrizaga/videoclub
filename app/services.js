(function(){
  var app = angular.module('services', []);
  //Servicios
  var getUser = function(){
    return 'user';
  };

  app.value('user', getUser());
  
  app.factory('appData', function(){
    var data = {
        movies: [], 
        genres: [], 
        users:[]
      }
    return{
      setMovies: function(movies){
        data.movies = movies;
      },
      setGenres: function(genres){
        data.genres = genres;
      },
      getMovies: function(){
        return data.movies;
      },
      getGenres: function(){
        return data.genres;
      },
    };

  });
})();