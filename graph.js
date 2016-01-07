var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-50;
canvas.height= window.innerHeight-50; //account for default padding/margin

var makeGraph = function(expr){
  var offsetX = canvas.width/2;
  var offsetY = canvas.height/2;
  ctx.lineWidth = 1;
  var step = 1;
  var min = -10;
  var max = 10;
  var range = max - min;
  var scale = window.innerWidth / range;
  ctx.moveTo(scale*min+offsetX,canvas.height-expr.at(min)-offsetY);
  for(var i = min; i < max; i += step){
    ctx.strokeStyle="black";
    ctx.lineWidth = "2";
    var y = expr.at(i);
    var canvasX = scale*i+offsetX;
    var canvasY = canvas.height - y - offsetY;
    ctx.lineTo(canvasX, canvasY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvasX,canvasY);
  }
};
