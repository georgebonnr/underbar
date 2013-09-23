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
    if (n === undefined) return array[0]
    return array.slice(0, n)
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) return array[array.length-1]
    if (n > array.length) return array
    return array.slice(array.length-n)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
      if (Array.isArray(collection)) {
        for (var i=0; i < collection.length; i++) {
          iterator(collection[i], i, collection)
        }
      } else if (typeof collection.length === 'undefined') {
        for (var i in collection) {
          iterator(collection[i], i, collection)
        }
      }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    var index = -1
    _.each(array, function(val, key) {
      if (val == target) {
        if (index == -1) index = key
      }
    })
    return index
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var returnArr = []
    _.each(collection, function (val, key) {
      if (iterator(val)) returnArr.push(val)
    })
    return returnArr
  };

  // Return all elements of an array that don't pass a truth test.
  // TIP: see if you can re-use _.select() here, without simply
  // copying code in and modifying it
  _.reject = function(collection, iterator) {
    var returnArr = []
    _.each(collection, function (val) {
      if (!iterator(val)) returnArr.push(val)
    })
    return returnArr
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArr = []
    _.each(array, function(val) {
      if (_.indexOf(uniqArr, val) == -1) uniqArr.push(val)
    })
    return uniqArr
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator){
    var returnArr = []
    _.each(collection, function (val) {
      returnArr.push(iterator(val))
    })
    return returnArr
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
      return _.map(list, function (val) {
        return methodName.apply(val, args)
      }) 
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
    var aggregator = initialValue || 0
    _.each(collection, function(val) {
      aggregator = iterator(aggregator, val)
    })
    return aggregator
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
    var iterator = iterator || function (val) {return val}
    return _.reduce(collection, function(isTrue, item) {
      if(!isTrue) {
        return false;
      }
      return !!iterator(item);
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var iterator = iterator || function (val) {return val}
    return !(_.every(collection, function(val) {
      return !iterator(val);
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
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i=1; i<arguments.length; i++) {
      _.each(arguments[i], function (val, key, collection) {
        obj[key] = val
      }) 
    }
    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i=1; i<arguments.length; i++) {
      _.each(arguments[i], function (val, key, collection) {
        if (!obj.hasOwnProperty(key)) obj[key] = val
      }) 
    }
    return obj
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
    var storage = {}
    if (!storage.hasOwnProperty(arguments)) {
      storage[arguments] = func
    }
    return storage[arguments]
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2)
    setTimeout(function () {
      func.apply(this, args)  
    }, wait)
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    var clone = array.slice()
    var temp,
        index,
        counter = clone.length
    while (counter--) {
      var index = (Math.random() * (counter + 1)) | 0;
      temp = clone[index]
      clone[index] = clone[counter]
      clone[counter] = temp
    }
    return clone
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
    var comp1, comp2, temp
    for (var i=0; i<collection.length; i++) {
      for (var j=i+1; j<collection.length; j++) {
        if (typeof iterator === 'string') {
          comp1 = collection[i][iterator]
          comp2 = collection[j][iterator]
        } else {
          comp1 = iterator(collection[i])
          comp2 = iterator(collection[j])
        }
        if ( (comp1 == undefined) || (comp2!= undefined && (!(comp1 <= comp2)))) {
          temp = collection[i]
          collection[i] = collection[j]
          collection[j] = temp
        }
      }
    }
    return collection
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments)
    var returnArr = []
    for (var i=0; i<args[0].length; i++) {
      var zip = []
      zip.push(args[0][i])
      for (var j=1; j<args.length; j++) {
        zip.push(args[j][i])
      }
      returnArr.push(zip)
    }
    return returnArr
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var newArr = []
    var flat = function(arr) {
      _.each(arr, function(val) {
        if (Array.isArray(val)) {
          flat(val)
        } else {
          newArr.push(val)
        }
      });
    }
    flat(nestedArray)
    return newArr
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments)
    // var flattened = _.flatten(args)
    // then sort array.  then go thru with for loop or _.each.  If value at a certain index equals the value at an index+3, then pass that value to new array once.
    var intersect = []
    _.each(args[0], function (val) {
      for (var i=1; i<args.length; i++) {
        if ( _.contains(args[i], val) ) intersect.push(val)
      }
    })
    return intersect
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments)
    return _.reject(array, function(val) {
      var others = false
      for (var i=1; i<args.length; i++) {
       if ( _.contains(args[i], val)) {
        others = true
       }
      }
      return others
    })
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
