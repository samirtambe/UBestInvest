angular.module('UBestInvest').controller('ResearchCtrl',
    ['$scope', 'HttpSvc', 'DateSvc', 'SpinnerSvc', 'GraphSvc',
     function($scope, HttpSvc, DateSvc, SpinnerSvc, GraphSvc) {

    $scope.showErrModal = false;

    $scope.errorModalDetails = undefined;

    $scope.pair = undefined;

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {

        pair: {symbol : undefined, name : undefined },
        todayDate : new Date(),
        howLongAgo: undefined,
        duration: $scope.durations[0],
        startDate: '',
        endDate: ''
    };

    $(".btn").mouseup(function() {
         $(this).blur();
    });

    $scope.reqParams.todayDate = new Date($scope.reqParams.todayDate.getTime() - (24 * 60 * 60 * 1000));

    $scope.getGraph = function(validForm) {

        if (validForm == true) {

            var spinner = SpinnerSvc.getSpinner();//starts spinning

            $scope.reqParams.howLongAgo = DateSvc.calcBeginDate($scope);

            var tframe = DateSvc.formatDateShort($scope);

            $scope.reqParams.startDate = tframe.start;

            $scope.reqParams.endDate = tframe.end;


            var parentDiv = document.getElementById('stockChartDiv');

            try {
                var childSVG = document.getElementById('theSVG');

                parentDiv.removeChild(childSVG);
            }
            catch(error) {}


            HttpSvc.getStockData($scope.reqParams).then(function(dataset) {

                $scope.graphData = dataset.data;

// Grab part of name string before the parenthesis and trim off any extra spaces
                $scope.reqParams.pair.name = ((dataset.name.split('('))[0]).trim();

                GraphSvc.createGraph('stocks', $scope.graphData);

            }).catch(function(errObj) {

                console.log("ResearchCtrl CATCH:" +
                            "\n\tHTTP: " + errObj.httpStatus +
                            "\n\tQUANDL Code: " + errObj.apiErrCode +
                            "\n\tQUANDL Message: " + errObj.apiErrMsg +
                            "\n\tModal Message: " + errObj.details);

                $scope.errorModalDetails = errObj.details;
                $scope.showErrModal = true;
                spinner.stop();

            }).finally(function() {

                $scope.reqParams.todayDate = new Date();
                $scope.reqParams.howLongAgo = new Date();
                $scope.reqParams.startDate = '';
                $scope.reqParams.endDate = '';
                spinner.stop();

            });
        }// if formValid
    };
}]);






angular.module('UBestInvest').controller('BizNewsCtrl', ['$scope', 'HttpSvc', 'SpinnerSvc',
    function($scope, HttpSvc, SpinnerSvc) {

    var spinner = SpinnerSvc.getSpinner();

    $scope.currentPage = 0;

    $scope.pageSize = 6;

    HttpSvc.getNewsBusiness().then(function(data) {

        $scope.bizarticles = data;

    }).catch(function() {

        console.log("BizNewsCtrl Catch:" + error);
        spinner.stop();

    }).finally(function() {

        $scope.numberOfPages = function() {
            return Math.ceil($scope.bizarticles.length/$scope.pageSize);
        };

        spinner.stop();
    });
}]);


angular.module('UBestInvest').controller('MarketCtrl',
    ['$scope', 'DateSvc', 'HttpSvc', 'SpinnerSvc',
        function($scope, DateSvc, HttpSvc, SpinnerSvc) {

    $scope.durations = ['1 Week','1 Month','3 Months','6 Months','1 Year','5 Years'];

    $scope.reqParams = {
        todayDate : new Date(),
        howLongAgo: undefined,
        duration: $scope.durations[0],
        startDate: '',
        endDate: ''
    };

    $scope.reqParams.todayDate = new Date($scope.reqParams.todayDate.getTime() - (24 * 60 * 60 * 1000));

    $scope.reqParams.howLongAgo = DateSvc.calcBeginDate($scope);


    var tframe = DateSvc.formatDateShort($scope);

    $scope.reqParams.startDate = tframe.start;

    $scope.reqParams.endDate = tframe.end;



    $scope.populateNewsGraphs = function(graphType) {

        var spinner = SpinnerSvc.getSpinner();

        HttpSvc.getNewsGraphData(graphType, $scope.reqParams).then(function(data) {

            $scope.graphData = data;

        }).catch(function(error) {

            console.log("Catch - [ "+graphType+" ]: " + error);
            spinner.stop();

        }).finally(function() {

            $scope.reqParams.todayDate = new Date();
            $scope.reqParams.howLongAgo = new Date();
            $scope.reqParams.startDate = '';
            $scope.reqParams.endDate = '';

            spinner.stop();
        });
    }
}]);

angular.module('UBestInvest').controller('LearnCtrl',
    ['$scope', '$firebaseArray','HttpSvc', 'SpinnerSvc',
     function ($scope, $firebaseArray, HttpSvc, SpinnerSvc) {

         var spinner = SpinnerSvc.getSpinner();

         try {
             var vocabRef = new Firebase('https://ubestinvest.firebaseio.com/dict');

             $scope.vocab = $firebaseArray(vocabRef);
         }
         catch (e) {
             spinner.stop();
             console.log (e);
         }
         finally {
             spinner.stop();
         }
}]);



angular.module('UBestInvest').controller('NewsBoxCtrl', ['$scope', 'HttpSvc', 'SpinnerSvc',
    function($scope, HttpSvc, SpinnerSvc) {

    var spinner = undefined,
        numOfArticles = undefined;

    $scope.currentPage = 0;

    $scope.pageSize = 6;

    $scope.populateNewsBox = function(newsType) {

        spinner = SpinnerSvc.getSpinner();

        $scope.headline = newsType.substr(4);

        HttpSvc.getNews(newsType).then(function(data) {

            switch(newsType) {

                case 'newsNational':
                    $scope.newsNational = data;
                    numOfArticles = $scope.newsNational.length;
                    break;

                case 'newsWorld':
                    $scope.newsWorld = data;
                    numOfArticles = $scope.newsWorld.length;
                    break;

                case 'newsBusiness':
                    $scope.newsBusiness = data;
                    numOfArticles = $scope.newsBusiness.length;
                    break;

                case 'newsRealEstate':
                    $scope.newsRealEstate = data;
                    numOfArticles = $scope.newsRealEstate.length;
                    break;

                case 'newsTech':
                    $scope.newsTech = data;
                    numOfArticles = $scope.newsTech.length;
                    break;

                case 'newsSports':
                    $scope.newsSports = data;
                    numOfArticles = $scope.newsSports.length;
                    break;
            }

        }).catch(function() {

            console.log("NewsBoxCtrl Catch:" + error);
            spinner.stop();

        }).finally(function() {

            $scope.numberOfPages = function() {return Math.ceil(numOfArticles/$scope.pageSize);};

            spinner.stop();
        });
    }
}]);
