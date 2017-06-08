toneloke = (function() {
  
  function each(list, iteratee) {
    for (var prop in list) {
      iteratee(list[prop], prop, list)
    }
    return list
  }

  function map(list, iteratee) {
    var results = []
    for (var prop in list) {
      results[prop] = iteratee(list[prop], prop, list)
    }
    return results
  }

  function reduce(list, iteratee, memo) {
    let copy = list
    memo = memo || copy.shift()
    for (var prop in list) {
      memo = iteratee(memo, list[prop]) 
    }
    return memo
  }

  function find(list, predicate) {
    for (let prop in list) {
      if (predicate(list[prop]) === true) { return list[prop] }
    }
  }

  function filter(list, predicate) {
    var results = []
    for (let prop in list) {
      if (predicate(list[prop]) === true) { results.push(list[prop]) }
    }
    return results
  }

  function sortBy(list, iteratee) {
    if (list.length <= 1 ) {
      return list 
    }

    var pivot =  list.shift()
    var leftSort = filter(list, iteratee) <= pivot
    var rightSort =  filter(list, iteratee) > pivot 

    sortBy(leftSort, iteratee) + [pivot] + sortBy(rightSort, iteratee)

  }

  

  return {
    each,
    map,
    reduce,
    find,
    filter,
    sortBy
  }

})()

toneloke.each( {one: 1, two: 2, three: 3}, n => console.log(n * n) )
console.log("----------------------------------")
console.log(toneloke.map( [1,2,3], n => n * n) )
console.log("----------------------------------")
console.log(toneloke.reduce([1, 2, 3], function(memo, n) { return memo + n}))
console.log("----------------------------------")
console.log(toneloke.find([1, 2, 3], n => n % 8 === 0))
console.log("----------------------------------")
console.log(toneloke.filter([1, 2, 3, 4, 5, 6, 7, 8], n => n % 2 === 0))
console.log("----------------------------------")
console.log(toneloke.sortBy([1,3,5,23,5, -4], n => n * n))
