var opacity = 0.1;
var color = 'rgba(255,255,255, ' + opacity + ')';
var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    positionsX = [],
    positionsY = [],
    val = 50;

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
function resize_canvas(){
    if (canvas.width  < window.innerWidth || canvas.width  > window.innerWidth){
        canvas.width  = window.innerWidth;
    }
    if (canvas.height < window.innerHeight || canvas.height > window.innerHeight ){
        canvas.height = window.innerHeight;
    }
}
$(window).resize(resize_canvas);
(function () {

  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
  }

  canvas.addEventListener('mousemove',function(evt){
    evt.preventDefault();
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
      if(dist < val && r < val){
      //1-dist/val;
        ctx.beginPath()
        ctx.moveTo(positionsX[i],positionsY[i]);
        ctx.lineTo(x,y)
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };
  }

  function distance(x1, y1, x2, y2){
    var distance = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)))
    return distance;
  }
}())

var flag=true;
$(document).ready(function(){
  $('p').hide();
  $('#box').hide();
  $('a').click(function(){
    
    if(flag){
    $('#box').show();
    $('#box').animate({
      // "display": "block"
      border:"solid 2px",
      height: "+=400",
      width: "+=800"
    },"fast" )
    flag = false;
  }




    if($(this).text() === "WORK"){
      $('p').hide();
      $('#work-p').show();
    }
    if($(this).text() === "BLOG"){
      $('p').hide();
      $('#blog-p').show();
    }
    if($(this).text() === "ABOUT"){
      $('p').hide();
      $('#about-p').show();
      console.log("yes")
    }
    // $("#box").toggle();
  });
  $('canvas, #box').click(function(){
    
    if(!flag){
    $('p').hide();
    $('#box').animate({
      // "display": "block"
      // border:"none",
      height: "-=400",
      width: "-=800"
    },"fast" )
    flag = true;
    }
  }).css();


});
  
// var colors = ['rgba(255,255,255, ','rgba(255,0,0, ','rgba(0,255,0, ','rgba(0,0,255, ' ];
//   console.log(colors[0]);
//   $('#box div').each(function(index){
//      var col = colors[index];
//       $(this).click(function(){
//         $(this).addClass('clicked')
//         color =  col + opacity + ')';
//       })
//   })
var colorDivs = $("#colors div");
  $('.white').click(function(evt){
      colorDivs.each(function(){
        $(this).removeClass("clicked");
      });
      $(this).addClass('clicked');
      color = 'rgba(255,255,255, ' + opacity + ')';
  });
  $('.red').click(function(evt){
      colorDivs.each(function(){
        $(this).removeClass("clicked");
      });
      $(this).addClass('clicked');
      color = 'rgba(255,0,0, ' + opacity + ')';
  });
  $('.green').click(function(evt){
      colorDivs.each(function(){
        $(this).removeClass("clicked");
      });
      $(this).addClass('clicked');
      color = 'rgba(0,255,0, ' + opacity + ')';
  });
  $('.blue').click(function(evt){
      colorDivs.each(function(){
        $(this).removeClass("clicked");
      });
      $(this).addClass('clicked');
      color = 'rgba(0,0,255, ' + opacity + ')';
  });


