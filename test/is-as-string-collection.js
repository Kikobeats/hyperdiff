'use strict'

const should = require('should')
const diff = require('../lib')

describe('hyperdiff » one id', function () {
  it('common', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = [{id: 1, letter: 'b', name: 'elena'}]
    const output = diff(orig, dist, 'id')

    should(output.added).be.eql([])
    should(output.removed).be.eql([])
    should(output.common).be.eql([{id: 1, letter: 'a', name: 'kiko'}])
  })

  it('removed', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = []
    const output = diff(orig, dist, 'id')

    should(output.added).be.eql([])
    should(output.common).be.eql([])
    should(output.removed).be.eql([{id: 1, letter: 'a', name: 'kiko'}])
  })

  it('added', function () {
    const orig = [{id: 1, letter: 'a', name: 'kiko'}]
    const dist = []
    const output = diff(dist, orig, 'id')

    should(output.added).be.eql([{id: 1, letter: 'a', name: 'kiko'}])
    should(output.common).be.eql([])
    should(output.removed).be.eql([])
  })
})
