$(document).ready(function(){

    $(".navbar-default .navbar-nav > li > a").mouseup(function() {
        $(this).blur();
    });

    $(".navbar-default .navbar-toggle").mouseup(function() {
        $(this).blur();
    });
});
