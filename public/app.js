/* global angular, $ */
var app = angular.module('shortlyApp', ['ngRoute', 'shortlyControllers']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/links.html',
      controller: 'LinkController'
    })
    .when('/create', {
      templateUrl: 'partials/shorten.html',
      controller: 'ShortenController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);


var shortlyControllers = angular.module('shortlyControllers', []);

shortlyControllers.controller('LinkController', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/links'
  }).success(function(data) {
    console.log("Spinny cat says: U r made gud request.");
    $scope.links = data;
  }).error(function(data, status) {
    console.log("THERE'S BEEN A HUGE PROBLEM: NOT ENOUGH CAT GIFS!!!11!");
  });

  $scope.searchTypes = [['created_at', 'Newest'], ['hottest', 'Last Visited'], ['visits', 'Most Visited']];
});

shortlyControllers.controller('ShortenController', function($scope, $http) {
  $scope.postLink = function() {
    var json = JSON.stringify({url: $scope.url});
    console.log(json);
    $http({
      method: 'POST',
      url: '/links',
      contentType: 'application/json',
      data: json
    }).success(function(data) {
      // append the link below the deal
      console.log("Link added successfully.");
      // var link = document.createElement('div');
      // link.setAttribute
    }).error(function(data) {
      console.log("There was an error adding the link.");
    });
  };
});
