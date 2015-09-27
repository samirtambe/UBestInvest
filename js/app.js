angular.module('TambeTech',['ui.router']).config(

    function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home',{
        url:'/home',
        templateUrl:'views/home.html',
        controller:'HomeCtrl'
    })
        .state('about',{
        url:'/about',
        templateUrl:'views/about.html'
    })
        .state('weather',{
        url:'/weather',
        templateUrl:'views/weather.html',
        controller:'WeatherCtrl'
    })
    .state('finance',{
        url:'/finance',
        templateUrl:'views/finance.html',
        controller:'StockViewCtrl'
    });
});
