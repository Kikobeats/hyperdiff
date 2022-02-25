'use strict'

const { pullAt, cloneDeep } = require('lodash')
const debug = require('debug-logfmt')('hyperdiff')

const isPresent = itemIndex => itemIndex !== -1

function GET_INITIAL_STATE () {
  return { common: [], removed: [] }
}

function hasItemWithProps (collection, item, props) {
  return props.every(prop => item[prop] === collection[prop])
}

function indexOf (collection, item) {
  return collection.indexOf(item)
}

function findIndexWithProps (collection, item, props) {
  return collection.findIndex(function (origItem) {
    return hasItemWithProps(origItem, item, props)
  })
}

function determinateCollections (orig, dist) {
  return { first: orig, second: cloneDeep(dist) }
}

function determinateFindIndex (ids, props) {
  return props ? findIndexWithProps : indexOf
}

function hyperdiff (orig, dist, props) {
  const ids = props ? [].concat(props) : []
  const { first, second } = determinateCollections(orig, dist)
  const findIndex = determinateFindIndex(ids, props)

  debug(
    `preconditions first=${JSON.stringify(first)} second=${JSON.stringify(second)} findIndex=${
      findIndex.name
    }`
  )

  const results = first.reduce(function (acc, item, index) {
    const itemIndex = findIndex(second, item, ids)
    const destination = isPresent(itemIndex) ? 'common' : 'removed'
    acc[destination].push(item)
    pullAt(second, itemIndex)
    debug(`index=${index} value=${JSON.stringify(item)} collection=${destination}`)
    return acc
  }, GET_INITIAL_STATE())

  results.added = second
  debug(
    `added=${JSON.stringify(results.added)} removed=${JSON.stringify(
      results.removed
    )} common=${JSON.stringify(results.common)}`
  )
  return results
}

module.exports = hyperdiff
