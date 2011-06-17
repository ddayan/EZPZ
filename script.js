const url = require("url");
const fullscreen = require("fullscreen");
//const winUtils = require("window-utils");

$(document).ready(function() {
    function navigate() {
        // invoked when the user hits the go button or hits enter in url box
        var input = $.trim($("#locationBar").val());
        // let's try to turn user input into a well formed url using the
        // 'url' library's guess function.
        input = url.guess(input);

        // now trigger navigation
        $("#contentFrame").attr("src", input);
    }

    fullscreen.enable();
    //winUtils.windowIterator().next().maximize();

    $("#location").submit(function() {
        navigate();
        return false;
    });

    $("#browse").click(function() {
        $("#startPage").hide();
        $("#browserHeader").show();
        $("#browserContentArea").show();
        $("#browserFooter").show();
    });

    $("#home").click(function() {
        $("#startPage").show();
        $("#browserHeader").hide();
        $("#browserContentArea").hide();
        $("#browserFooter").hide();
    });

});

