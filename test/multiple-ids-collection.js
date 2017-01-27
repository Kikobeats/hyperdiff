'use strict'

require('should')
const diff = require('../lib')

describe('hyperdiff » multiple ids', function () {
  it('common', function () {
    const orig = [{id: 1, letter: 'a'}]
    const dist = [{id: 1, letter: 'a'}]
    const output = diff(orig, dist, ['id', 'letter'])
    output.added.length.should.be.equal(0)
    output.removed.length.should.be.equal(0)
    output.common.length.should.be.equal(1)
  })

  it('removed', function () {
    const orig = [{id: 1, letter: 'a'}, {id: 1, letter: 'b'}]
    const dist = [{id: 1, letter: 'a'}]
    const output = diff(orig, dist, ['id', 'letter'])
    output.added.length.should.be.equal(0)
    output.removed.length.should.be.equal(1)
    output.common.length.should.be.equal(1)
  })

  it('added', function () {
    const orig = [{id: 1, letter: 'a'}]
    const dist = [{id: 1, letter: 'a'}, {id: 1, letter: 'b'}]
    const output = diff(orig, dist, ['id', 'letter'])
    output.added.length.should.be.equal(1)
    output.removed.length.should.be.equal(0)
    output.common.length.should.be.equal(1)
  })

  it('complex case', function () {
    const orig = [
      {id: 1, foo: 'bar'},
      {id: 1, foo: 'barz'},
      {id: 1, foo: 'baaz'}
    ]

    const dist = [
      {id: 1, foo: 'bar'},
      {id: 1, foo: 'baarz'},
      {id: 1, foo: 'bax'}
    ]

    const output = diff(orig, dist, ['id', 'foo'])
    output.added.should.be.eql([{ id: 1, foo: 'baarz' }, { id: 1, foo: 'bax' }])
    output.removed.should.be.eql([{ id: 1, foo: 'barz' }, { id: 1, foo: 'baaz' }])
    output.common.should.be.eql([{ id: 1, foo: 'bar' }])
  })
})
