/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  var throwError = function (message) {
    throw new Error(message);
  };
  
  // COLLECTIONS
  // ===========
   
  //   In this section, we'll have a look at functions that operate on collections
  //   of values; in JavaScript, a 'collection' is something that can contain a
  //   number of values--either an array or an object.
   

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (typeof n === 'undefined') {
      return array.shift();
    } else {
      return array.slice(0, n);
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (typeof n === 'undefined') {
      return array.pop();
    } else {
      return array.reverse().slice(0, n).reverse();
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var index = 0; index < collection.length; index++) {
        var value = collection[index];
        iterator(value, index, collection);
      }
    } else if (typeof collection.length === 'undefined') {
      for (var key in collection) {
        var value = collection[key];
        iterator(value, key, collection);
        }
    } else {
      throw new Error("sorry, _each() only accepts either an array or an object");
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    !Array.isArray(array) && throwError("_.indexOf() only accepts arrays");
    for (var i = 0; i < array.length; i++) {
      if (array[i] == target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var matches = [];
    _.each(collection, function(value) {
      iterator(value) && matches.push(value);
    });
    return matches;
  };

  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.select() here, without simply
  // copying code in and modifying it
  _.reject = function(collection, iterator) {
    return _.filter(collection, function (value) {
      if (iterator(value) == []) {
        return value;
      }
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArray = [];
    _.each(array.sort(), function(value, index, array) {
        value !== array[parseInt(index)+1] && uniqArray.push(value);
    });
    return uniqArray;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator){
    var results = [];
    _.each(collection, function(value, key) {
      results.push(iterator(value, key, collection));
    });
    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if (typeof(methodName) === 'function') {
      return _.map(list, function(value) {
        return methodName.apply(value, args);
      });
    } else {
      return _.map(list, function(value) {
        return [value][methodName].apply(value, args);
      });
    }
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    if (typeof initialValue === 'undefined') {
      initialValue = 0;
    }
    _.each(collection, function(value,key,collection) {
      initialValue = iterator(initialValue, value);
    });
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if(wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var func;
    if (iterator) {
      func = iterator;
    } else {
      func = function(i) { return i; };
    }
    return _.reduce(collection, function(previousWasTrue, item) {
      if (previousWasTrue) {
        return Boolean(func(item));
      }
      return false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var func;
    if (iterator) {
      func = iterator;
    } else {
      func = function(i) { return i; };
    }
    return !(_.every(collection, function(value) {
      return !func(value);
    }, true));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
// None  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj)
  {
    for (var i = 1; i < arguments.length; i++)
    {
      var keysArray = Object.keys(arguments[i]);
      for (var x = 0; x < keysArray.length; x++)
      {
        var key = Object.keys(arguments[i])[x];
        obj[key] = (arguments[i])[key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj)
  {
    for (var i = 1; i < arguments.length; i++)
    {
      var keysArray = Object.keys(arguments[i]);
      for (var x = 0; x < keysArray.length; x++)
      {
        var key = Object.keys(arguments[i])[x];
        if (obj[key] === undefined) 
        {
          obj[key] = (arguments[i])[key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var alreadyCalled = {};
    var present = _.indexOf(alreadyCalled, func);
    if (present !== -1) {
      return alreadyCalled[present];
    } else {
      alreadyCalled.blah = func;
      return alreadyCalled.blah;
    }
    
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait)
  {
    var argArray = Array.prototype.slice.call(arguments, 2);
    setTimeout(function ()
    {
      func.apply(this, argArray);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) 
  {
    var cloneArray = array.slice();
    var returnArray = [];
    function getRandomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    while (cloneArray.length > 0) 
    {
      var index = getRandomInt(0, cloneArray.length);
      returnArray.push(cloneArray.splice(index, 1))
    }
    return returnArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
