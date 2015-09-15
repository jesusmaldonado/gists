var debounce = function debounce(potentialRequest) {
  //private variables
  var fnToApply, executeResult, currentRequest, debounceInstance;
  currentRequest = potentialRequest;
  if (debounceInstance === "undefined") {
    return debounceInstance;
  }
  //private function
  function executeResult(){
    //add a private property to this function
    debounce.lastRequest = currentRequest;
    currentRequest.then(function(data) {
      if (currentRequest === debounce.lastRequest) {
        fnToApply(data);
      }
    });
  };

  return debounceInstance = {
    //return public interface
    currentRequest: currentRequest,
    then: function (fn) {
      fnToApply = fn;
      executeResult();
    }
  };
};


// TEST
var firstDefer = $.Deferred();
var firstPromise = firstDefer.promise();
firstPromise.info = "firstPromise";

var b1 = function b(data){console.log(data);};
var b2 = function b(data){console.log(data + "2");};
var b3 = function b(data){console.log(data + "3");};


var secondDefer = $.Deferred();
var secondPromise = secondDefer.promise();
secondPromise.info = "secondPromise";

var thirdDefer = $.Deferred();
var thirdPromise = thirdDefer.promise();
thirdPromise.info = "thirdPromise";



var c = debounce(firstPromise, 10);
c.then(b1);

var d, e;

setTimeout(function(){ firstDefer.resolve("firstP");}, 2000);

setTimeout(function(){
  d = debounce(secondPromise, 20);
  d.then(b2);
  setTimeout(function(){ secondDefer.resolve("resolves second");}, 200);
}, 400);
setTimeout(function() {
  e = debounce(thirdPromise, 30);
  e.then(b3);
  setTimeout(function(){thirdDefer.resolve("thirdP");}, 30);
}, 800);
