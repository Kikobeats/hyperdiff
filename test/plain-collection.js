'use strict'

const should = require('should')
const diff = require('../lib')

describe('hyperdiff » plain collections', function () {
  describe('numbers', function () {
    const orig = [1, 2, 3, 4, 5, 6]
    const dist = [1, 2, 4, 5, 6, 0, 9, 10]
    const output = diff(orig, dist)

    it('added', function () {
      should(output.added).be.eql([0, 9, 10])
    })
    it('removed', function () {
      should(output.removed).be.eql([3])
    })
    it('common', function () {
      should(output.common).be.eql([1, 2, 4, 5, 6])
    })
    it('parameters have original size', function () {
      should(orig).be.eql([1, 2, 3, 4, 5, 6])
      should(dist).be.eql([1, 2, 4, 5, 6, 0, 9, 10])
    })
  })

  describe('strings', function () {
    const orig = ['a', 'b', 'c']
    const dist = ['c', 'd', 'e']
    const output = diff(orig, dist)

    it('added', function () {
      should(output.added).be.eql(['d', 'e'])
    })
    it('removed', function () {
      should(output.removed).be.eql(['a', 'b'])
    })
    it('common', function () {
      should(output.common).be.eql(['c'])
    })
    it('parameters have original size', function () {
      should(orig).be.eql(['a', 'b', 'c'])
      should(dist).be.eql(['c', 'd', 'e'])
    })
  })

  it('mixin', function () {
    const orig = ['a', 'b', 1]
    const dist = [1, 'd', 'e']
    const output = diff(orig, dist)

    it('added', function () {
      should(output.added).be.eql(['d', 'e'])
    })
    it('removed', function () {
      should(output.removed).be.eql(['a', 'b'])
    })
    it('common', function () {
      should(output.common).be.eql([1])
    })
    it('parameters have original size', function () {
      should(orig).be.eql(['a', 'b', 1])
      should(dist).be.eql([1, 'd', 'e'])
    })
  })
})
