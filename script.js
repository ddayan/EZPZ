const url = require("url");

function navigate() {
    // invoked when the user hits the go button or hits enter in url box
    var input = $.trim($("#locationBar").val());
    // let's try to turn user input into a well formed url using the
    // 'url' library's guess function.
    input = url.guess(input);

    // now trigger navigation
    $("#contentFrame").attr("src", input);
}

