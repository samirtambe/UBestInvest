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

                $scope.reqParams.pair.name = dataset.name;

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

    $scope.pageSize = 7;

    HttpSvc.getNewsBusiness(null).then(function(data) {

        $scope.bizarticles = data;

    }).catch(function() {

        console.log("BizNewsCtrl Catch:"+error);
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
    ['$scope', 'HttpSvc', 'SpinnerSvc', function ($scope, HttpSvc, SpinnerSvc) {

        $scope.vocab = [
            {word: 'word0', meaning: 'meaning0'},
            {word: 'word1', meaning: 'meaning1'},
            {word: 'word2', meaning: 'meaning2'},
            {word: 'word3', meaning: 'meaning3'},
            {word: 'word4', meaning: 'meaning4'},
            {word: 'word5', meaning: 'meaning5'},
            {word: 'word6', meaning: 'meaning6'},
        ];

}]);
