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

var evalPostfix = function( mathString ){
  var stack = [];
  var result;
  var operands = ['+','-','*','/'];
  var steps = document.getElementById('steps');
  steps.innerHTML = '';
  for(var i = 0; i < mathString.length; i++){
    var curr = mathString.charAt(i);
    if(operands.indexOf(curr) > -1){
      var var2 = stack.pop();
      var var1 = stack.pop(); //pop the second operand first
      result = eval(var1 + curr + var2);
      console.log(var1 + curr + var2 + '=' + result);
      var step = document.createElement('li');
      step.innerHTML = var1 + curr + var2 + '=' + result;
      steps.appendChild(step);
      stack.push(result);
    }
    else{
      stack.push(curr);
    }
  }
  return stack[0];
};

var toPostfix = function( str ){
  //shunting yard algorithm
  var operatorStack = [];
  var output = [];
  var operators = {
    '+' : {
      'priority' : 2
    },
    '-' : {
      'priority' : 2
    },
    '*' : {
      'priority' : 1
    },
    '/' : {
      'priority' : 1
    }
  }
  for(var i = 0; i < str.length; i++){
    var curr = str.charAt(i);
    if(operators.hasOwnProperty(curr)){
      if(operatorStack.length <= 0){
	      operatorStack.push(curr);
	      continue;
      }
      while( operatorStack.length > 0 ){
        if( operators[curr].priority > operators[operatorStack[operatorStack.length-1]].priority ){
          output.push(operatorStack.pop());
        }
        else {
          break;
        }
      //while the priority of the last element in the stack is lower than the current priority, pop it
      }
      operatorStack.push(curr);
    }
    else {
	    //if the char isn't an operator, then it's a number and should be added to output
	    output.push(curr);
    }
  }
  while(operatorStack.length > 0){
    output.push(operatorStack.pop());
  }
  return output.join('');
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
