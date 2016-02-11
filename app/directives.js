(function(){
  var app = angular.module('directives', []);
  
  app.directive('controlPanel', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/control-panel.html"
    };
  });
  app.directive('banner', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/banner.html"
    };
  });
  app.directive('navBar', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/nav-bar.html"
    };
  });
  app.directive('movieArea', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/movie-area.html"
    };
  });
  app.directive('movieList', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/movie-list.html"
    };
  });
  app.directive('movieInfo', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/movie-info.html"
    };
  });
  app.directive('cartArea', function(){
    return{
      restrict: 'E',
      templateUrl: "templates/cart-area.html"
    };
  });
})();