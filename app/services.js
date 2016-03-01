(function(){
  var app = angular.module('services', []);
  //Servicios
  var getUser = function(){
    return 'user';
  };

  app.value('user', getUser());
  
  app.factory('userData', function($http){
    var data = [];
    return{
      //USER
      isLogged: function(){
        if (sessionStorage.user){
          return true;
        }
        else{
          return false;
        }
      },
      getUsers: function(){
        if (localStorage.VCusers){
          data = JSON.parse(localStorage.VCusers);
        }
        else{
          $http.get('data/users.json')
            .success(function(result){
              data = result;
              localStorage.VCusers = JSON.stringify(data); 
            })
            .error(function(){
              console.log('error loading users');
              return false;
            });
        }
      },

      findByUsername: function(username){
        return data.filter(function(obj) { return obj.username === username; });
      },
      addUser: function(name, user, pass){
        var newUser = {
          "id": data.length,
          "username": user,
          "password": pass,
          "name": name,
          "history": [],
          "admin": 0
        }
        data.push(newUser);
        this.persistUsers();
        return true;
      },
      addRent: function(user, rent){
        var index = data.map(function(x) {return x.id; }).indexOf(user.id);
        
        data[index].history.push(rent);
        this.persistUsers();
        sessionStorage.user = JSON.stringify(data[index]);
      },
      updateUserProfile: function(user){
        var index = data.map(function(x) {return x.id; }).indexOf(user.id);
        data[index] = user;
        sessionStorage.user = JSON.stringify(user);
        this.persistUsers();
      },
      persistUsers: function(){
        localStorage.VCusers = JSON.stringify(data); 
      }
      
    };
  });
  app.factory('movieData', function($http){
    var data = [];
    return{
      getMovies: function(){
        // load movies
        if (localStorage.VCmovies){
          data = JSON.parse(localStorage.VCmovies);
          return data;
        }
        else{
          $http.get('data/movies.json')
            .success(function(result){
              data = result;
              localStorage.VCmovies = JSON.stringify(data); 
              return data;
            })
            .error(function(){
              console.log('error loading movies');
            });
        }
      },
      addMovie: function(name, year, quantity, genre, rating, trailer, img, info){
        var newMovie = {
          "id": (data[data.length - 1].id + 1),
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
        data.push(newMovie);
        this.persistMovies();
        return true;
      },
      findMovieByNameYear: function(name, year){
        return data.filter(function(obj) { return (obj.name === name && obj.year === year); });
      },
      deleteMovie: function(movie){
        var index = data.indexOf(movie);
        data.splice(index, 1);
        this.persistMovies();
        
      },
      editMovie: function(selectedIndex, name, year, quantity, genre, rating, trailer, img, info){
        var index = data.map(function(x) {return x.id; }).indexOf(selectedIndex);
        var newMovie = {
          "id": selectedIndex,
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
        data[index] = newMovie;
        this.persistMovies();
        return true;
      },
       persistMovies: function(){
        localStorage.VCmovies = JSON.stringify(data); 
      }
    }
  });

  app.factory('genreData', function($http){
    var data = [];
    return{
      persistGenres: function(){
        localStorage.VCgenres = JSON.stringify(data); 
      },

      getGenres: function(){
        //load genres
        if (localStorage.VCgenres){
          data = JSON.parse(localStorage.VCgenres);
          return data;
        }
        else{
          $http.get('data/genres.json')
            .success(function(result){
              data = result;
              localStorage.VCgenres = JSON.stringify(data); 
              return data;
            })
            .error(function(){
              console.log('error loading genres');
            });
        }
      }

      
    }
  });
})();