angular.module('UBestInvest',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

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
            'biznews@news':{
                templateUrl: 'views/biznews.html',
                controller: 'BizNewsCtrl'
            },
            'mktcharts@news':{
                templateUrl: 'views/markets.html'
            }
         }
    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'
    }).state('terms', {
        url: '/terms',
        templateUrl: 'views/terms.html'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});
