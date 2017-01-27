'use strict'

require('should')
const diff = require('../lib')

describe('hyperdiff » plain collections', function () {
  it('numbers', function () {
    const orig = [1, 2, 3, 4, 5, 6]
    const dist = [1, 2, 4, 5, 6, 0, 9, 10]
    const output = diff(orig, dist)
    const size = output.added.length + output.removed.length + output.common.length
    size.should.be.equal(orig.length + dist.length)
    output.added.length.should.be.equal(3)
    output.removed.length.should.be.equal(1)
    output.common.length.should.be.equal(5)
  })

  it('strings', function () {
    const orig = ['a', 'b', 'c']
    const dist = ['c', 'd', 'e']
    const output = diff(orig, dist)
    const size = output.added.length + output.removed.length + output.common.length
    size.should.be.equal(orig.length + dist.length)
    output.added.length.should.be.equal(2)
    output.removed.length.should.be.equal(2)
    output.common.length.should.be.equal(1)
  })

  it('mixin', function () {
    const orig = ['a', 'b', 1]
    const dist = [1, 'd', 'e']
    const output = diff(orig, dist)
    const size = output.added.length + output.removed.length + output.common.length
    size.should.be.equal(orig.length + dist.length)
    output.added.length.should.be.equal(2)
    output.removed.length.should.be.equal(2)
    output.common.length.should.be.equal(1)
  })
})
