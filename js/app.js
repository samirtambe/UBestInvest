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
                templateUrl: 'views/leftnews.html'//,
                //controller: 'leftNewsCtrl'
            },
            'right@news':{
                templateUrl: 'views/markets.html'
                // uses directive, no need to refer to a controller here
            }
         }
    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});
