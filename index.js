'use strict'

const FLAGS = {
  REMOVED: '1',
  COMMON: '0',
  ADDED: '2'
}

function hyperdiff (orig, dist, id) {
  const _deltaMap = {}
  const _objHolder = {}

  orig.forEach(function (item) {
    const key = get(item, id)
    _objHolder[key] = item
    _deltaMap[key] = FLAGS.REMOVED
  })

  dist.forEach(function (item) {
    const key = get(item, id)
    _objHolder[key] = item
    const flag = _deltaMap[key]

    if (flag === FLAGS.REMOVED) _deltaMap[key] = FLAGS.COMMON
    else _deltaMap[key] = FLAGS.ADDED
  })

  const delta = { added: [], removed: [], common: [] }

  Object.keys(_deltaMap).forEach(function (id) {
    const value = _deltaMap[id]
    let store
    if (value === FLAGS.REMOVED) store = delta.removed
    else if (value === FLAGS.ADDED) store = delta.added
    else if (value === FLAGS.COMMON) store = delta.common
    store.push(_objHolder[id])
  })

  return delta
}

function get (item, id) {
  if (!id) return item
  return typeof id !== 'function' ? item[id] : id(item)
}

module.exports = hyperdiff
