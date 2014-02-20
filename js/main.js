(function () {

  var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      positionsX = [],
      positionsY = [];
  // positionsX.length = 100;
  // positionsY.length = 100;
  canvas.width = 1280;
  canvas.height = 500;
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
  }

  canvas.addEventListener('mousemove',function(evt){
    var mousePos = getMousePos(canvas,evt);
    var x = mousePos.x;
    var y = mousePos.y;
    drawLines(x,y);


  }, false);
  function drawLines(x,y){
    positionsX.push(x);
    positionsY.push(y);
    for (var i = 0; i < positionsX.length; i++) {
      var dist = distance(positionsX[i], positionsY[i], x,y);
      var r = Math.random()*100;
      if(dist < 40 && r < 40){
        ctx.beginPath()
        ctx.moveTo(positionsX[i],positionsY[i]);
        ctx.lineTo(x,y)
        ctx.strokeStyle = 'rgba(255,255,255, 0.3)';
        ctx.stroke();
      }
    };
    // var incrementer = Math.random()*Math.PI;
  

  }

  function distance(x1, y1, x2, y2){
    var distance = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)))
    return distance;
  }

}())