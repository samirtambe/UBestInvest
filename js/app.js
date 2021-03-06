angular.module('UBestInvest',['ui.router','firebase'])
    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html'

    }).state('about', {
        url:'/about',
        templateUrl:'views/about.html'

    }).state('news', {
        url: '/news',
        templateUrl: 'views/news.html',
        controller: 'BizNewsCtrl'

    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'

    }).state('terms', {
        url: '/terms',
        templateUrl: 'views/terms.html'

    }).state('learn',{
        url: '/learn',
        templateUrl: 'views/learn.html',
        controller: 'LearnCtrl'
    });
});
