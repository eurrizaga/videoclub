(function(){
  var app = angular.module('services', []);
  //Servicios
  var getUser = function(){
    return 'user';
  };

  app.value('user', getUser());
  
  app.factory('appData', function($http){
    var data = {
        movies: [], 
        genres: [], 
        users:[]
      }
    return{
      isLogged: function(){
        if (sessionStorage.user){
          return true;
        }
        else{
          return false;
        }
      },
      getUsers: function(){
        //sessionStorage.data = "";
        if (localStorage.VCusers){
          data.users = JSON.parse(localStorage.VCusers);
        }
        else{
          $http.get('data/users.json')
            .success(function(result){
              data.users = result;
              this.persistUsers();
            })
            .error(function(){
              console.log('error loading users');
              return false;
            });
        }
      },
      getMovies: function(){
        // load movies
        if (localStorage.VCmovies){
          data.movies = JSON.parse(localStorage.VCmovies);
          return data.movies;
        }
        else{
          $http.get('data/movies.json')
            .success(function(result){
              data.movies = result;
              this.persistMovies();
              return data.movies;
            })
            .error(function(){
              console.log('error loading movies');
            });
        }
      },
      getGenres: function(){
        //load genres
        if (localStorage.VCgenres){
          data.genres = JSON.parse(localStorage.VCgenres);
          return data.genres;
        }
        else{
          $http.get('data/genres.json')
            .success(function(result){
              data.genres = result;
              this.persistGenres();
              return data.genres;
            })
            .error(function(){
              console.log('error loading genres');
            });
        }
      },
      findByUsername: function(username){
        return data.users.filter(function(obj) { return obj.username === username; });
      },
      addUser: function(name, user, pass){
        var newUser = {
          "id": data.users.length,
          "username": user,
          "password": pass,
          "name": name,
          "history": [],
          "admin": 0
        }
        data.users.push(newUser);
        this.persistUsers();
        return true;
        /*
        $http.post('data/users.json', data.users)
          .then(function(data) {
            return true;
          },
          function (data,status,headers,config) {
            console.log(data + status + config);
            return false;
          }
        );
        */
      },
      addMovie: function(name, year, quantity, genre, rating, trailer, img, info){
        var newMovie = {
          "id": (data.movies[data.movies.length - 1].id + 1),
          "name": name,
          "genre": genre,
          "img": img,
          "info": info,
          "year": year,
          "trailer": trailer,
          "rating": rating,
          "cast": [],
          "quantity": quantity
        };
        data.movies.push(newMovie);
        this.persistMovies();
        return true;
      },
      findMovieByNameYear: function(name, year){
        return data.users.filter(function(obj) { return (obj.name === name && obj.year === year); });
      },
      deleteMovie: function(movie){
        var index = data.movies.indexOf(movie);
        data.movies.splice(index, 1);
        
      },
      addRent: function(user, rent){
        var index = data.users.map(function(x) {return x.id; }).indexOf(user.id);
        
        data.users[index].history.push(rent);
        this.persistUsers();
        sessionStorage.user = JSON.stringify(data.users[index]);
      },
      persistUsers: function(){
        localStorage.VCusers = JSON.stringify(data.users); 
      },
      persistMovies: function(){
        localStorage.VCmovies = JSON.stringify(data.movies); 
      },
      persistGenres: function(){
        localStorage.VCgenres = JSON.stringify(data.genres); 
      }

    };

  });

})();