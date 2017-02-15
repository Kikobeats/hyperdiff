'use strict'

const cloneDeep = require('lodash.clonedeep')
const debug = require('debug')('hyperdiff')
const pullAt = require('lodash.pullat')

const isPresent = (itemIndex) => itemIndex !== -1

function GET_INITIAL_STATE () {
  return { common: [], removed: [] }
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

function determinateCollections (orig, dist) {
  return {first: orig, second: cloneDeep(dist)}
}

function determinateFindIndex (props) {
  return props ? findIndexWithProps : indexOf
}

function hyperdiff (orig, dist, props) {
  const {first, second} = determinateCollections(orig, dist)
  const findIndex = determinateFindIndex(props)
  debug('preconditions first=%j second=%j findIndex=%s', first, second, findIndex.name)

  const results = first.reduce(function (acc, item, index) {
    const itemIndex = findIndex(second, item, props)
    const destination = isPresent(itemIndex) ? 'common' : 'removed'
    acc[destination].push(item)
    pullAt(second, itemIndex)
    debug('index=%s value=%s collection=%s', index, item, destination)
    return acc
  }, GET_INITIAL_STATE())

  results.added = second
  debug('added=%j removed=%j common%j', results.added, results.removed, results.common)
  return results
}

module.exports = hyperdiff
