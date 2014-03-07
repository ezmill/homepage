var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext('2d');
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
 
if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, success, failure);
}
 
function success(stream) {
    video.src = window.URL.createObjectURL(stream);
    webkitRequestAnimationFrame(paintOnCanvas);

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
//constructor thing  http://www.phpied.com/canvas-pixels-3-getusermedia/
function CanvasImage(canvas, src) {
  // load image in canvas
  var context = canvas.getContext('2d');
  var i = new Image();
  var that = this;
  i.onload = function(){
    canvas.width = i.width;
    canvas.height = i.height;
    context.drawImage(i, 0, 0, i.width, i.height);
 
    // remember the original pixels
    that.original = that.getData();
  };
  i.src = src;
  
  // cache these
  this.context = context;
  this.image = i;
}

function paintOnCanvas() {
  var transformador = transformadores[0];
  transformador.context.drawImage(
    $('video'), 0, 0, 
    transformador.image.width, transformador.image.height
  );
  var data = transformador.getData();
    transformador.original = data;
    transformador.transform(manipuladors[0].cb);

  webkitRequestAnimationFrame(paintOnCanvas);
}

var manipuladors = [
  {
    name: 'negative',
    cb: function(r, g, b) {
      return [255 - r, 255 - g, 255 - b, 255];
    }
  }
];

function CanvasImage(canvas, src) {
  // load image in canvas
  var context = canvas.getContext('2d');
  var i = new Image();
  var that = this;
  i.onload = function(){
    canvas.width = i.width;
    canvas.height = i.height;
    context.drawImage(i, 0, 0, i.width, i.height);

    // remember the original pixels
    that.original = that.getData();
  };
  i.src = src;
  
  // cache these
  this.context = context;
  this.image = i;
}

CanvasImage.prototype.getData = function() {
  return this.context.getImageData(0, 0, this.image.width, this.image.height);
};

CanvasImage.prototype.setData = function(data) {
  return this.context.putImageData(data, 0, 0);
};

CanvasImage.prototype.reset = function() {
  this.setData(this.original);
}

CanvasImage.prototype.transform = function(fn, factor) {
  var olddata = this.original;
  var oldpx = olddata.data;
  var newdata = this.context.createImageData(olddata);
  var newpx = newdata.data
  var res = [];
  var len = newpx.length;
  for (var i = 0; i < len; i += 4) {
   res = fn.call(this, oldpx[i], oldpx[i+1], oldpx[i+2], oldpx[i+3], factor, i);
   newpx[i]   = res[0]; // r
   newpx[i+1] = res[1]; // g
   newpx[i+2] = res[2]; // b
   newpx[i+3] = res[3]; // a
  }
  this.setData(newdata);
};



