const url = require("url");
const fullscreen = require("fullscreen");
//const winUtils = require("window-utils");

var backArray=[];
var forwardArray=[];
var currentUrl=null;

$(document).ready(function() {
    function navigate() {
				if (currentUrl != null)	addToHistory(currentUrl)
        // invoked when the user hits the go button or hits enter in url box
        var input = $.trim($("#locationBar").val());
        // let's try to turn user input into a well formed url using the
        // 'url' library's guess function.
        input = url.guess(input);

        // now trigger navigation
        $("#contentFrame").attr("src", input);
				currentUrl=input;
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

function addToHistory(url){
		console.log("**********ADD TO History")
	backArray.push(url);
	cleanForwardHistory();
}

function historyBack(){
	if(backArray.length != 0){
		console.log("**********hello HistoryBack")
		var url = backArray.pop();
		console.log(url);
		forwardArray.push(url);
		$("#contentFrame").attr("src", url);
	//	return url;
	}
}

function historyForward(){
	if(forwardArray.length != 0){
		console.log("**********hello HistoryForward")
		var url = forwardArray.pop();
		console.log(url);
		console.log("********************");
		console.log(forwardArray);
		backArray.push(url);
		$("#contentFrame").attr("src", url);
	}
}

function cleanForwardHistory(){
		console.log("**********clean up forward")
	forwardArray = [];
}

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

