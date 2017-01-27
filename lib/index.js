'use strict'

const difference = require('lodash.difference')
const pullAt = require('lodash.pullat')

const isPresent = (itemIndex) => itemIndex !== -1

function GET_INITIAL_STATE () {
  return { added: [], common: [] }
}

function hasItemWithProps (collection, item, props) {
  return props.every(prop => item[prop] === collection[prop])
}

function indexOf (collection, item, props) {
  return collection.indexOf(item)
}

function findIndexWithProps (collection, item, props) {
  return collection.findIndex(function (origItem) {
    return hasItemWithProps(origItem, item, props)
  })
}

function hyperdiff (oldCollection, newCollection, props) {
  const findIndex = props ? findIndexWithProps : indexOf
  const results = newCollection.reduce(function (acc, distItem) {
    const itemIndex = findIndex(oldCollection, distItem, props)
    if (isPresent(itemIndex)) acc.common.push(distItem)
    else acc.added.push(distItem)
    pullAt(oldCollection, itemIndex)
    return acc
  }, GET_INITIAL_STATE())

  results.removed = difference(oldCollection, results.common)
  return results
}

module.exports = hyperdiff
