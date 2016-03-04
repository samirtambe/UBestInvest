angular.module('UBestInvest').filter('startFrom', function() {

    return function(input, start) {

        start = +start; //parse to int

        return input.slice(start);
    }
});

angular.module('UBestInvest').filter('shorten', function() {

    return function (text, length) {
        if (isNaN(length)) {
            length = 50;
        }

        // 3 is the length of "..."
        if (text.length <= length || text.length - 3 <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - 3) + "...";
        }
    }
});
