angular.module('TambeTech',['ui.router']).config(

    function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url:'/home',
            views: {
                '': {
                    templateUrl:'views/home.html'
                },
            'news@home': {
                templateUrl: 'views/news.html'
            },
            'markets@home': {
                templateUrl: 'views/markets.html'
                //,
                //controller: 'MarketCtrl'
            }
        }
    }).state('about',{
        url:'/about',
        templateUrl:'views/about.html'

    }).state('weather',{
        url:'/weather',
        templateUrl:'views/weather.html',
        controller:'WeatherCtrl'
    }).state('finance',{
        url:'/finance',
        templateUrl:'views/finance.html',
        controller:'StockViewCtrl'
    });
});
