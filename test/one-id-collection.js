'use strict'

require('should')
const diff = require('../lib')

describe('hyperdiff » one id', function () {
  it('common', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = [{id: 1, letter: 'b', name: 'elena'}]
    const output = diff(orig, dist, ['id'])
    output.added.length.should.be.equal(0)
    output.removed.length.should.be.equal(0)
    output.common.length.should.be.equal(1)
  })

  it('removed', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = []
    const output = diff(orig, dist, ['id'])
    output.added.length.should.be.equal(0)
    output.removed.length.should.be.equal(1)
    output.common.length.should.be.equal(0)
  })

  it('added', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = []
    const output = diff(dist, orig, ['id'])
    output.added.length.should.be.equal(1)
    output.removed.length.should.be.equal(0)
    output.common.length.should.be.equal(0)
  })
})
