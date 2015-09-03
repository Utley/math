var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height= 800;

var getPoints = function(f){
  if(typeof f != "function"){
    return;
  }
  var minX = -20;
  var maxX = 20;
  var inc = 1;
  var points = [];
  for(var i=minX; i<=maxX; i+=inc){
    points.push([i,f(i)]);
  }
  return points;
};
var makeGraph = function(arr){
  var offset = canvas.width/2;
  var scale = 4;
  ctx.lineWidth = 1;
  for(var i in arr){
    ctx.lineTo(scale*(arr[i][0])+offset,canvas.height-arr[i][1]);
    ctx.stroke();
  }
};
var a = function(x){
  return x*x;
}

console.log(getPoints(a));
makeGraph(getPoints(a));
