angular.module('UBestInvest').filter('startFrom', function() {

    function slicer(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }

    return {
        slicer: slicer
    };
});
