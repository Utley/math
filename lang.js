var parse = function( str ){
  var terms = str.split(/[\+,\-]/);
  var functionString = 'return '+terms[0].substr(0,terms[0].indexOf('x'))+'*arguments[0]';
  for(var i in terms){
    if(terms[i].indexOf('x') > -1){
      return new Function('tmp',functionString);
    }
  }
};

var func = new function(){


};
