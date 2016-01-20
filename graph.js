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
  var scaleX = canvas.width / range;
  var scaleY = canvas.height / range;
  var variables = {
    'x': min
  };
  ctx.moveTo(scaleX*min+offsetX, canvas.height-scaleY*evalFunction(expr,variables)-offsetY );
  for(var i = min; i <= max; i += step){
    ctx.strokeStyle="black";
    ctx.lineWidth = "2";
    variables.x = i;
    var y = evalFunction( expr, variables );
    var canvasX = scaleX*i+offsetX;
    var canvasY = canvas.height - scaleY*y - offsetY;
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
  var rangeX = max - min;
  var rangeY = max - min;
  var scaleX = width / rangeX;
  var scaleY = height / rangeY;
  //horizontal lines
  var offsetX = canvas.width / 2;
  var offsetY = canvas.height / 2;
  ctx.moveTo( 0, offsetY );
  for(var i = 0; i <= rangeY/2; i++){
    ctx.beginPath();
    ctx.moveTo( 0, offsetY - scaleY * i );
    ctx.lineTo( width, offsetY - scaleY * i );
    ctx.moveTo( 0, offsetY + scaleY * i );
    ctx.lineTo( width, offsetY + scaleY * i);
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
  //vertical lines
  for(var i = 0; i <= rangeX/2; i++){
    ctx.beginPath();
    ctx.moveTo( offsetX - scaleX * i, 0 );
    ctx.lineTo( offsetX - scaleX * i, height)
    ctx.moveTo( offsetX + scaleX * i, 0 );
    ctx.lineTo( offsetX + scaleX * i, height );
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
};
