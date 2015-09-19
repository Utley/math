var parse = function( str ){
  var terms = str.split(/[\+,\-]/);
  for(var i in terms){
    if(terms[i].indexOf('x') > -1){
      return new Function('tmp','return '+terms[i].charAt(terms[i].indexOf('x')-1)+'*arguments[0];');
    }
  }
};


var func = new function(){


};
