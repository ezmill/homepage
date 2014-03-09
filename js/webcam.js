var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
var width = 640;
var height = 480;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, success, failure);
}
 
function success(stream) {
    //video.src = window.URL.createObjectURL(stream);
    setup(stream);
    captureEvent();
    window.requestAnimationFrame(draw);
}
 
function failure(e) {
    console.log("nope lol")
}

var frames = [];
var barWidth = 3;

function setup(stream){
	canvas.width = width;
	canvas.height = height;
	video.src = window.URL.createObjectURL(stream);
}

function draw(){
  video.onloadeddata = function(e) {
    ctx.drawImage(video, 0, 0);  
    videoPixels = ctx.getImageData(0,0,width,height)
    videoPixelData = videoPixels.data;
    imagePixels = ctx.createImageData(width,height);
    imagePixelData = imagePixels.data;
    for (var i = 0; i<videoPixelData.length; i++){
      videoPixelData[i] = imagePixelData[i];
    }

    frames.push(img);
    
    if (frames.size() > width/4) {
      frames.shift();
    }
  };
  var currentImage = 0;
  //loadPixels();
  for (var y = 0; y < height; y+=barWidth) {
    if(currentImage < frames.length){
       var img = frames[currentImage];
      if (img != null){
        //img.loadPixels();
        for(var x = 0; x < width; x+=barWidth){
          for(var i = 0; i < barWidth; i++){
              videoPixelData[x + (y + i) * width] = imagePixelData[x + (y + i) * width];
          }
        }
      } 
        currentImage++;
    } else {
        break;
    }  
  }
  window.requestAnimationFrame(draw);
}


//constructor thing  http://www.phpied.com/canvas-pixels-3-getusermedia/

