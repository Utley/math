

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
    //console.log("Checking "+i+"...");
    if(prime){
      //console.log(i+" is prime!");
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

var compare = function(f1,f2,n){
  for(var i = 0; i < n; i++){
    console.log(f1(i) + ":" + f2(i));
  }
};

compare(primesTo,function(n){ return differences(primesTo(n))},100);
