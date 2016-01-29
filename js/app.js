angular.module('UBestInvest',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller:
    }).state('about',{
        url:'/about',
        templateUrl:'views/about.html'
    }).state('news', {
         url: '/news',
         views: {
            '': {
                templateUrl: 'views/news.html'
            },
            'left@news':{
                templateUrl: 'leftnews.html',
                controller: 'leftNewsCtrl'
            },
            'right@news':{
                templateUrl: 'views/markets.html'
            }
         }
    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'
    });
});
/*
// OLD APP.JS
angular.module('UBestInvest',['ui.router']).config(

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
            }
        }
    }).state('about',{
        url:'/about',
        templateUrl:'views/about.html'

    }).state('weather',{
        url:'/weather',
        templateUrl:'views/weather.html',
        controller:'WeatherCtrl'
    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'
    });
});
*/
