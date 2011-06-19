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

    function sortFunc(a, b) {
        console.log(b.count + " " + a.count);
        return b.count - a.count;
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

    var visits = [];
    var visit = { url: null, count: null, data: null }
    var k;
    var item;

    for (var i=0; i < localStorage.length; i++) {
        k = localStorage.key(i);
        item = localStorage.getItem(k);
        
        if(k.substr(0, 6) != "thumb:") {
            visit.url = k;
            visit.count = item;
//            visit.data = null;
        } else {
            visit.url = k;
  //          visit.count = null;
            visit.data = item;
        }
        //console.log("visit.url = " + visit.url + " , visit.count = " + visit.count + " , visit.data = " + visit.data);
        visits.push(visit);

        console.log("visits.length = " + visits.length);

    }

    //visits.sort(sortFunc);

    console.log("visits[1].count = " + visits[1].count);

    var thumb;

    i = 0;

    /*for(var j = 0; j < visits.length; j++) {
        if(visits[j].data != null) {
            i++;
            data = visits[j].data;
            //console.log("data = " + data);
            thumb = "#thumb_" + i;
            console.log("thumb = " + thumb);
            $(thumb).attr("src", data);
            if(i == 5) {
                break;
            }
        }
    }*/

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

function screenshot(browserRef) {
    var camera = require("canvas-proxy");
    return camera.snapshot(browserRef);
}

$(document).ready(function() {
	callIframe("http://www.google.co.uk/");
	
});

//<<<<<<< HEAD

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
//>>>>>>> 405c11aafa0eb54663b2a69c9bad28bb8279fabe

var l;
l = 0;

function getThumb() {
    var webpage = $('#contentFrame').get(0);
        l++;
        if(l > 5) {
            l = 1;
        }
        var thumb = "thumb_" + l;
        console.log(thumb);
		var thumbnail = document.getElementById(thumb);
	//	console.log("********************");
	//	console.log(thumbnail.src);
	//	console.log("********************");
		canvasShot(webpage, thumbnail);
        //var screen = screenshot(webpage);
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
    console.log("thumnail.src = " + thumbnail.src);
    localStorage.setItem("thumb:" + webpage.src, screen);
}

