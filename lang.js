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

var evalPostfix = function( mathString, variables ){
  var stack = [];
  var result;
  var operands = ['+','-','*','/','^'];
  var steps = document.getElementById('steps');
  steps.innerHTML = '';
  for(var i = 0; i < mathString.length; i++){
    var curr = mathString[i];
    if(operands.indexOf(curr) > -1){
      var var2 = stack.pop();
      var var1 = stack.pop(); //pop the second operand first
      if( curr == '^' ){
        result = Math.pow( var1, var2 );
      }
      else{
        result = eval(var1 + curr + var2);
      }
      console.log(var1 + curr + var2 + '=' + result);
      var step = document.createElement('li');
      var maxLength = 5;
      step.innerHTML = String(var1) + curr + String(var2) + '=' + String(result);
      steps.appendChild(step);
      stack.push(result);
    }
    else if( variables.hasOwnProperty( curr ) ){
      stack.push( variables[curr] );
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
    //operators are evaluated from least priority to greatest
    //left indicates whether the operator should group left or right
    //ie 3 / 2 / 2 -> (3/2) / 2
    //but 2^3^4 -> 2^(3^4)
    '+' : {
      'priority' : 2,
      'left' : true
    },
    '-' : {
      'priority' : 2,
      'left' : true
    },
    '*' : {
      'priority' : 1,
      'left' : true
    },
    '/' : {
      'priority' : 1,
      'left' : true
    },
    '^' : {
      'priority' : 0,
      'left' : false
    }
  }
  var curr;
  var prev;
  for( var i = 0; i < str.length; i++ ){
    prev = curr;
    curr = str.charAt(i);
    if( operators.hasOwnProperty(curr) ){
      while( operatorStack.length > 0 ){
        if( operatorStack[operatorStack.length - 1] == "(" ){
          //if we run into a paren, break since it isn't an operator
          break;
        }
        if( operators[curr].priority >= operators[operatorStack[operatorStack.length-1]].priority
            && operators[curr].left){
          output.push(operatorStack.pop());
        }
        else if( operators[curr].priority > operators[operatorStack[operatorStack.length-1]].priority
            && !operators[curr].left) {
              //i know how bad this is, i'll clean it up later
              //but it seems to work for now
          output.push(operatorStack.pop());
        }
        else {
          break;
        }
      //while the priority of the last element in the stack is lower than the current priority, pop it
      }
      operatorStack.push( curr );
    }
    else if( curr == "(" ){
      //even though parens aren't operators, add them to the stack
      //so we know which operators to send to output later
      operatorStack.push( curr );
    }
    else if( curr == ")" ){
      if( operatorStack.length == 0 ){
        //make sure operator stack isn't empty first
        break;
      }
      //for right parens, loop through the stack and add each
      //operator to the output until we find a left paren
      while( operatorStack.length > 0 ){
        if( operatorStack[operatorStack.length-1] == "(" ){
          //get rid of the left paren if we find it
          operatorStack.pop();
          break;
        }
        else {
          output.push( operatorStack.pop() );
        }
      }
    }
    else {
	    //if the char isn't an operator or paren, then it's a number and should be added to output
      if( !isNaN(Number.parseInt(prev)) ){
        output[output.length - 1] += curr;
      }
      else{
        output.push( curr );
      }
    }
  }
  while(operatorStack.length > 0){
    output.push( operatorStack.pop() );
  }
  return output;
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
    return Math.pow( num, this.exponent ) * this.coefficient / this.divisor;
  };
};

var evalFunction = function( expr, variables ){
  return evalPostfix( toPostfix(expr), variables );
};

Array.prototype.at = function( num ){
  var sum = 0;
  for( var i = 0; i < this.length; i++ ){
    if( this[i].variable == 'x' ){
      sum += this[i].at(num);
    }
    else if( this[i].variable == 1 ){
      sum += this[i].coefficient;
    }
  }
  return sum;
};
