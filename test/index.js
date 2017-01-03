'use strict'

const assert = require('assert')
const diff = require('..')

describe('hyperdiff', function () {
  describe('non-objects', function () {
    it('should differentiate between numerical elements', function () {
      const result = diff(
        [1, 2, 3, 4, 5, 6],
        [1, 2, 4, 5, 6, 0, 9, 10]
      )

      assert(result)
      assert(result.added)
      assert(result.removed)
      assert.equal(result.added.length, 3)
      assert.equal(result.removed.length, 1)
    })

    it('should differentiate between string elements', function () {
      const result = diff(
        ['a', 'b', 'c'],
        ['c', 'd', 'e']
      )

      assert(result)
      assert(result.added)
      assert(result.removed)
      assert.equal(result.added.length, 2)
      assert.equal(result.removed.length, 2)
    })

    it('should differentiate between mixed elements', function () {
      const result = diff(
        ['a', 'b', 'c', 1, 3, 5, true],
        ['c', 'd', 'e', 7, 3, 4, 5, false, true]
      )

      assert(result)
      assert(result.added)
      assert(result.removed)
      assert.equal(result.added.length, 5)
      assert.equal(result.removed.length, 3)
    })
  })

  describe('objects', function () {
    it('should differentiate between object elements', function () {
      const result = diff(
        [
          {id: 1, name: 'a'},
          {id: 2, name: 'b'},
          {id: 3, name: 'c'},
          {id: 4, name: 'd'},
          {id: 5, name: 'e'}
        ],
        [
          {id: 1, name: 'a'},
          {id: 2, name: 'b'},
          {id: 7, name: 'e'}
        ],
        'id'
      )

      assert(result)
      assert(result.added)
      assert.equal(result.added.length, 1)
      assert.deepEqual(result.added, [ { id: 7, name: 'e' } ])

      assert(result.removed)
      assert.equal(result.removed.length, 3)
      assert.deepEqual(result.removed, [
        {id: 3, name: 'c'},
        {id: 4, name: 'd'},
        {id: 5, name: 'e'}
      ])
    })

    it('should differentiate between object elements when selector is a function', function () {
      const result = diff(
        [
          {id: 1, name: 'a'},
          {id: 2, name: 'b'},
          {id: 3, name: 'c'},
          {id: 4, name: 'd'},
          {id: 5, name: 'e'}
        ],
        [
          {id: 1, name: 'a'},
          {id: 2, name: 'b'},
          {id: 7, name: 'e'}
        ],
        (x) => x.id
      )

      assert(result)
      assert(result.added)
      assert(result.removed)
      assert.equal(result.added.length, 1)
      assert.equal(result.removed.length, 3)
    })

    it('should differentiate between object elements when selector is a function regardless of object depth', function () {
      const result = diff(
        [
          { id: 1, depthObj: { id: 1 }, name: 'a' },
          { id: 2, depthObj: { id: 2 }, name: 'b' },
          { id: 3, depthObj: { id: 3 }, name: 'c' },
          { id: 4, depthObj: { id: 4 }, name: 'd' },
          { id: 5, depthObj: { id: 5 }, name: 'e' }
        ],
        [
          { id: 1, depthObj: { id: 1 }, name: 'a' },
          { id: 2, depthObj: { id: 2 }, name: 'b' },
          { id: 7, depthObj: { id: 7 }, name: 'e' }
        ],
        (x) => x.depthObj.id
      )

      assert(result)
      assert(result.added)
      assert(result.removed)
      assert.equal(result.added.length, 1)
      assert.equal(result.removed.length, 3)
    })
  })
})
