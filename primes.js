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

var isPrime = function( num ){
  var hasPrimeFactor = true;
  var smallerPrimes = primesTo(num/2);
  for(var i in smallerPrimes){
    if(num % smallerPrimes[i] == 0){
      hasPrimeFactor = false;
    }
  }
  return hasPrimeFactor;
};
console.log(isPrime(5));
