var primesTo = function(n){
  var primes = [2];
  for(var i = 3; i < n; i+=2){
    var prime = true;
    for(var j in primes){
      if(i % primes[j] == 0){
        prime = false;
        break;
      }
    }
    if(prime){
      primes.push(i);
    }
  }
  return primes;
};

var differences = function(arr){
  var diffs = [];
  for(var i=1; i<arr.length; i++){
    diffs.push(arr[i]-arr[i-1]);
  }
  return diffs;
};


var average = function(arr){
  var sum = 0;
  for(var i in arr){
    sum += arr[i];
  }
  return sum/arr.length;
};


//compares two functions for the first n values (staritng at 0)
var compare = function(f1,f2,n){
  for(var i = 0; i < n; i++){
    console.log(f1(i) + ":" + f2(i));
  }
};

//compare(primesTo,function(n){ return differences(primesTo(n))},100);

var Series = function(){
  //series is an object representing a set of values
  //it is initialized with a create() call
  //where f is the function and n is the number of values (starting at 0)
  this.data = [];
  this.create = function( f, n ){
    for(var i = 0; i < n; i++){
      this.data.push(f(i));
    }
  };
  //bind relevant functions here
};
var a = new Series();
a.create(primesTo,20);
console.log(a.data);
