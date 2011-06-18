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
        $("#browser").css("height", "inherit");
        $("#startPage").hide();
        $("#browser").show();
    });

    $("#home").click(function() {
        $("#startPage").show();
        $("#browser").hide();
    });
    
    //$("#contentFrame").load(recordVisit);

});

function callIframe(url, callback) {
    $("#contentFrame").attr('src', url);

    $("#contentFrame").load(function() 
    {
        callback(getThumb());
    });
}

function canvasShot(browserRef, thumbImageRef) { 
  try { 
	console.log("********************");
	//console.log(thumbImageRef.src);
	console.log("********************");
    var camera = require("canvas-proxy");
    //thumbImageRef.width="300";
    //thumbImageRef.height="300";
    thumbImageRef.src=camera.snapshot(browserRef);
	console.log("+++++++++++++++++++++");
	//console.log(thumbImageRef.src);
	console.log("+++++++++++++++++++++");
  } catch (i) { 
    //console.log(i); 
  } 
}


$(document).ready(function() {
	callIframe("http://www.google.com");
	
});



function getThumb() {
    var webpage = $('#contentFrame').get(0);
		var thumbnail = $('#thumb_1').get(0);
	//	console.log("********************");
	//	console.log(thumbnail.src);
	//	console.log("********************");
		canvasShot(webpage, thumbnail);
	//	thumbnail.src = null;
//		$('#thumb_1').src = thumbnail.src;
	//	console.log("+++++++++++++++++++++");
	//	console.log(thumbnail.src);
	//	console.log("+++++++++++++++++++++");
    
    //localstoragestuff
    console.log("webpage.src = " + webpage.src);
    var visits = localStorage.getItem(webpage.src);
    console.log("visits = " + visits);
    if(visits === null) {
        visits = 0;
    }
    visits++;
    localStorage.setItem(webpage.src, visits);
    localStorage.setItem("thumb:" + webpage.src, thumbnail.src);
}

