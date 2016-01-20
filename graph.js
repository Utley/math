var canvas = document.getElementById("graph");
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth-50;
canvas.height= window.innerHeight-50; //account for default padding/margin

var graph = function( mcanvas ){
  this.offsetX = mcanvas.width / 2;
  this.offsetY = mcanvas.height / 2;
  this.width = mcanvas.width;
  this.height = mcanvas.height;
  this.step = .05;
  this.min = -10;
  this.max = 10;
  this.range = this.max - this.min;
  this.scaleX = canvas.width / this.range;
  this.scaleY = canvas.width / this.range; //technically wrong but it makes the graph look ok
  this.render = function(expr){
    ctx.lineWidth = 1;
    var variables = {
      'x': this.min
    };
    var initX = this.scaleX * this.min + this.offsetX;
    var initY = mcanvas.height - this.scaleY * evalFunction(expr, variables) - this.offsetY;
    ctx.moveTo( initX, initY );
    for(var i = this.min; i <= this.max; i += this.step){
      ctx.strokeStyle="black";
      ctx.lineWidth = "2";
      variables.x = i;
      var y = evalFunction( expr, variables );
      var canvasX = this.scaleX * i + this.offsetX;
      var canvasY = canvas.height - this.scaleY*y - this.offsetY;
      ctx.lineTo(canvasX, canvasY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(canvasX,canvasY);
    }
  };
  this.drawGrid = function(){
    ctx.lineWidth = 1;
    ctx.moveTo( 0, this.offsetY );
    for(var i = 0; i <= this.range/2; i++){
      ctx.beginPath();
      ctx.moveTo( 0, this.offsetY - this.scaleY * i );
      ctx.lineTo( this.width, this.offsetY - this.scaleY * i );
      ctx.moveTo( 0, this.offsetY + this.scaleY * i );
      ctx.lineTo( this.width, this.offsetY + this.scaleY * i);
      ctx.strokeStyle = "grey";
      ctx.stroke();
    }
    //vertical lines
    for(var i = 0; i <= this.range/2; i++){
      ctx.beginPath();
      ctx.moveTo( this.offsetX - this.scaleX * i, 0 );
      ctx.lineTo( this.offsetX - this.scaleX * i, this.height)
      ctx.moveTo( this.offsetX + this.scaleX * i, 0 );
      ctx.lineTo( this.offsetX + this.scaleX * i, this.height );
      ctx.strokeStyle = "grey";
      ctx.stroke();
    }
  };
};
