angular.module('TambeTech',['ui.router','ngResource']).config(

    function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/main_menu.html'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'views/about.html'
    })
    .state('weather', {
        url: '/weather',
        templateUrl: 'views/weather.html',
        controller: 'WeatherCtrl'
    })
    .state('finance', {
        url: '/finance',
        templateUrl: 'views/finance.html',
        controller: 'StockListCtrl'
    });
});
