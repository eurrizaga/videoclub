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
              localStorage.VCusers = JSON.stringify(result);
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
              localStorage.VCmovies = JSON.stringify(result);
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
              localStorage.VCgenres = JSON.stringify(result);
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
        localStorage.VCusers = JSON.stringify(data.users);
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
      }

    };

  });

})();