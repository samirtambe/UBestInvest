angular.module('UBestInvest',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    }).state('about', {
        url:'/about',
        templateUrl:'views/about.html'
    }).state('news', {
         url: '/news',
         views: {
            '': {
                templateUrl: 'views/news.html'
            },
            'left@news':{
                templateUrl: 'views/biznews.html',
                controller: 'BizNewsCtrl'
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
