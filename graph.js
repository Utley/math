var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-50;
canvas.height= window.innerHeight-50; //account for default padding/margin

var makeGraph = function(expr){
  drawGrid();
  var offsetX = canvas.width/2;
  var offsetY = canvas.height/2;
  ctx.lineWidth = 1;
  var step = .05;
  var min = -10;
  var max = 10;
  var range = max - min;
  var scale = canvas.width / range;
  var variables = {
    'x': min
  };
  ctx.moveTo(scale*min+offsetX,scale * (canvas.height-evalFunction(expr,variables)-offsetY) );
  for(var i = min; i < max; i += step){
    ctx.strokeStyle="black";
    ctx.lineWidth = "2";
    var y = evalFunction( expr, variables );
    variables.x = i;
    var canvasX = scale*i+offsetX;
    var canvasY = canvas.height - scale*y - offsetY;
    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvasX,canvasY);
  }
};
var drawGrid = function(){
  var dist = 1;
  var width = canvas.width;
  var height = canvas.height;
  var min = -10;
  var max = 10;
  var range = max - min;
  var scaleX = width / range;
  var scaleY = height / 10;
  //for every integer x value
  for(var i = 0; i < range; i++){
    ctx.beginPath();
    ctx.moveTo( scaleX * i, 0);
    ctx.lineTo( scaleX * i, height );
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
  for(var i = 0; i < range; i++){
    ctx.beginPath();
    ctx.moveTo( 0, scaleY * i);
    ctx.lineTo( width, scaleY * i );
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
};
