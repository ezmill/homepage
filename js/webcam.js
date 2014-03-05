var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, success, failure);
}
 
function success(stream) {
    video.src = window.URL.createObjectURL(stream);

}
 
function failure(e) {
    console.log("nope lol")
}

function setup(stream){
	canvas.width = 640;
	canvas.height = 480;
	video.src = window.URL.createObjectURL(stream);
	ctx.drawImage(video, canvas.width, canvas.height);
}