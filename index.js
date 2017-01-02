'use strict'

const { difference, reduce, findIndex, pullAt } = require('lodash')
const isPresent = (itemIndex) => itemIndex !== -1

function hyperdiff (orig, dist, fn) {
  const results = reduce(dist, function (acc, item) {
    const itemIndex = findIndex(orig, item, fn)

    if (isPresent(itemIndex)) acc.common.push(item)
    else acc.added.push(item)

    pullAt(orig, itemIndex)

    return acc
  }, {
    added: [],
    common: []
  })

  results.removed = difference(orig, results.common)
  return results
}

module.exports = hyperdiff
