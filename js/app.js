angular.module('UBestInvest',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
        /*,  controller: 'HomeCtrl'  */
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
    }).state('detail', {
        url: '/detail/:id',
        templateUrl: 'views/articleDetail.html',
        controller: 'ArticleDetailCtrl'
    }).state('research',{
        url:'/research',
        templateUrl:'views/finance.html',
        controller:'ResearchCtrl'
    }).state('terms', {
        url: '/terms',
        templateUrl: 'views/terms.html'
    });

});
