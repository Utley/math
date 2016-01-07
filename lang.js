var parse = function( expressionString ){
  var terms = [];
  var tmp = new term();
  var str = '';
  var negative = false;
  console.log('hi');
  for(var i = 0; i < expressionString.length; i++){
    var curr = expressionString.charAt(i);
    if(curr == '+'){
        tmp.coefficient = Number(str);
        if(negative){
          tmp.coefficient *= -1;
        }
        terms.push(tmp.clone());
        str = '';
        tmp = new term();
        negative = false;
    }
    else if(curr == '-'){
      tmp.coefficient = Number(str);
      terms.push(tmp.clone());
      tmp = new term();
      str = '';
      str += curr;
      negative = true;
    }
    else if(curr.match(/[a-zA-Z]/)){
      tmp.variable = curr;
    }
    else{
        str += curr;
    }
    if( i == expressionString.length-1 ){
      tmp.coefficient = Number(str);
      terms.push(tmp.clone());
    }
  }

  if(terms.length > 1){
    return terms;
  }
  else{
    return tmp;
  }
};

var term = function(){
  this.coefficient = 1;
  this.exponent = 1;
  this.variable = 1;
  this.divisor = 1;
  this.clone = function(){
    var tmp = new term();
    tmp.coefficient = this.coefficient;
    tmp.exponent = this.exponent;
    tmp.variable = this.variable;
    tmp.divisor = this.divisor;
    return tmp;
  };
  this.at = function( num ){
    return Math.pow(num,this.exponent) * this.coefficient / this.divisor;
  };
};
Array.prototype.at = function( num ){
  var sum = 0;
  for(var i = 0; i < this.length; i++){
    if(this[i].variable == 'x'){
      sum += this[i].at(num);
    }
    else if(this[i].variable == 1){
      sum += this[i].coefficient;
    }
  }
  return sum;
};
