'use strict'
const _simpleArrayDiff = require('simple-array-diff')
const { map, range, random } = require('lodash')
const suite = require('fastbench')
const _hyperDiff = require('.')
const _range = range(0, 1000)

function generateRange (_range) {
  return map(_range, () => {
    return { id: random(0, 100) }
  })
}

const array1 = generateRange(_range)
const array2 = generateRange(_range)

function bench (fn) {
  fn(array1, array2, ['id'])
}

const run = suite(
  [
    function simpleArrayDiff (done) {
      bench(_simpleArrayDiff)
      done()
    },
    function hyperDiff (done) {
      bench(_hyperDiff)
      done()
    }
  ],
  1000
)

// run them two times
run(run)
