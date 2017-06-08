toneloke = (function () {

  function each (list, iteratee, context) {
    for (var prop in list) {
      if (context !== undefined) {
        iteratee.call(context,list[prop])
      } else {
      iteratee(list[prop], prop, list)
      }
    }
    return list
  }

  function map (list, iteratee, context) {
    var results = []
    for (var prop in list) {
      if (context !== undefined) {
        iteratee.call(context,list[prop])
      } else {
      results[prop] = iteratee(list[prop], prop, list)
      }
    }
    return results
  }

  function reduce (list, iteratee, memo, context) {
    let copy = list
    memo = memo || copy.shift()
    for (var prop in list) {
      if (context !== undefined) {
        memo = iteratee.call(context,list[prop], prop, list)
      } else {
        memo = iteratee(memo, list[prop], prop, list)
      }
    }
    return memo
  }

  function find (list, predicate, context) {
    for (let prop in list) {
      if (context !== undefined) {
        if (predicate.call(context, list[prop]) === true) { 
          return list[prop] 
        }
      } else {
        if (predicate(list[prop]) === true) { 
          return list[prop] 
        }
      }
    }
  }

  function filter (list, predicate, context) {
    var results = []
    for (let prop in list) {
      if (context !== undefined) {
        if (predicate.call(context, list[prop]) === true) { results.push(list[prop]) }
      } else {
        if (predicate(list[prop]) === true) { results.push(list[prop]) }
      }
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

  function sortBy (list, iteratee) {
    copy = list
    return copy.sort(iteratee)
  }

  function size (list) {
    i = 0
    for (prop in list) { i++ }
    return i
  }

///////////////////////////////////////////////////////////////////////////////

  function first (array, n) {
    return n ? array.slice(0, n) : array.slice(0, 1)
  }

  function last (array, n) {
    return n ? array.slice(-n) : array.slice(-1)
  }

  function compact (array) {
    return toneloke.filter(array, el => el != false)
  }

  function flatten (array, shallow) {
    copy = array
    if (shallow) { return [].concat.apply([], copy) }

    return copy.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
    }, [])
  }

  function uniq (array, isSorted, iteratee) {

    return array.reduce(function (acc, curr) {
      if (!acc.includes(curr)) {
        acc.push(curr)
      }
      return acc
    }, [])
  }

//////////////////////////////////////////////////////////////////////////////

  function keys (object) {
    keys = []
    for (prop in object) {
      keys.push(prop)
    }
    return keys
  }

  function values (object) {
    vals = [] 
    for (prop in object) {
      vals.push(object[prop])
    }
    return vals
  }

  ///////////////////////////////////////////////////////////////////////////

  function functions (object) {
    functions = []
    for (func in object) {
      if (typeof object[func] == 'function') { functions.push(func) }
      }
    }
    return functions
  }

  return {
    each,
    map,
    reduce,
    find,
    filter,
    sortBy,
    size,
    first,
    last,
    compact,
    flatten,
    uniq,
    keys,
    values,
    functions
  }
})()

toneloke.each({one: 1, two: 2, three: 3}, n => console.log(n * n))
console.log('------^each---------------------------------------')
console.log(toneloke.map([1, 2, 3], n => n * n))
console.log('------^map----------------------------------------')
console.log(toneloke.reduce([1, 2, 3], function (memo, n) { return memo + n }))
console.log('------^reduce-------------------------------------')
console.log(toneloke.find([1, 2, 3, 4, 5, 6, 7, 8], n => n % 2  === 0 ))
console.log('------^find---------------------------------------')
console.log(toneloke.filter([1, 2, 3, 4, 5, 6, 7, 8], n => n % 2 === 0))
console.log('------^filter)------------------------------------')
console.log(toneloke.sortBy([1, 3, 4, 8, 2], n => n * n))
console.log('------^sortBy(broken)-----------------------------')
console.log(toneloke.size([1, 2, 3]))
console.log(toneloke.size({one: 1, two: 2, three: 3}))
console.log('------^size---------------------------------------')
console.log(toneloke.first([1, 2, 3, 4, 5, 6, 7, 8], 3))
console.log('------^first--------------------------------------')
console.log(toneloke.last([1, 2, 3, 4, 5, 6, 7, 8]))
console.log('------^last---------------------------------------')
console.log(toneloke.compact([0, 1, false, 2, '', 3]))
console.log('------^compact------------------------------------')
console.log(toneloke.flatten([1, [2], [3, [[4]]]]))
console.log('------^flatten------------------------------------')
console.log(toneloke.uniq([1, 2, 1, 4, 1, 3]))
console.log('------^uniq---------------------------------------')
console.log(toneloke.keys({one: 1, two: 2, three: 3}))
console.log(toneloke.values({one: 1, two: 2, three: 3}))
console.log('------^keys&vals----------------------------------')
console.log(toneloke.functions(toneloke))
console.log('------^functions----------------------------------')











