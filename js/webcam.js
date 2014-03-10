var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
var width = 640;
var height = 480;
canvas.width = width;
canvas.height = height;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, success, failure);
}
 
function success(stream) {
    video.src = window.URL.createObjectURL(stream);
    video.play();
     //setup(stream);
    window.requestAnimationFrame(draw);
}
 
function failure(e) {
    console.log("nope lol")
}

var frames = [];
var barWidth = 3;

//function setup(stream){

  // video.onloadeddata = function(e) {
  //   ctx.drawImage(video, 0, 0);  
  //   videoPixels = ctx.getImageData(0,0,width,height)
  //   videoPixelData = videoPixels.data;
  //   imagePixels = ctx.createImageData(width,height);
  //   imagePixelData = imagePixels.data;
  //   for (var i = 0; i<videoPixelData.length; i++){
  //     videoPixelData[i] = imagePixelData[i];
  //   }
  //   console.log(imagePixelData)
  //   frames.push(imagePixels);
    
  //   if (frames.length > width/4) {
  //     frames.shift();
  //   }
//  };
//}
var currentImage = 0;
function draw(){

  var frame = readFrame();
  frames.push(frame);
  if(frames.length > width/4){
    frames.shift();
  }

  for (var y = 0; y < height; y+=barWidth) {
    if(currentImage < frames.length){
       var img = frames[currentImage];
      if (img != null){
        img.data;
        for(var x = 0; x < width; x+=barWidth){
          for(var i = 0; i < barWidth; i++){
            console.log(frame.data[x + (y + i) * width]);
              frame.data[x + (y + i) * width] = img.data[x + (y + i) * width];
          }
        }
      } 
        currentImage++;
    } else {
        break;
    }  
  }
  ctx.putImageData(frame,0,0);
  window.requestAnimationFrame(draw);
}

function readFrame() {
    try {
      ctx.drawImage(video, 0, 0, width, height);
    } catch (e) {
      // The video may not be ready, yet.
      return null;
    }

    return ctx.getImageData(0, 0, width, height);
}


//constructor thing  http://www.phpied.com/canvas-pixels-3-getusermedia/

