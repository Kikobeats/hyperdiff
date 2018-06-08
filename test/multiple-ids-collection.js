'use strict'

const should = require('should')
const diff = require('../lib')

describe('hyperdiff » multiple numeric ids', function () {
  it('common', function () {
    const orig = [{id: 1, letter: 'a'}]
    const dist = [{id: 1, letter: 'a'}]
    const output = diff(orig, dist, ['id', 'letter'])

    should(output.added).be.eql([])
    should(output.removed).be.eql([])
    should(output.common).be.eql([{id: 1, letter: 'a'}])
  })

  it('removed', function () {
    const orig = [{id: 1, letter: 'a'}, {id: 1, letter: 'b'}]
    const dist = [{id: 1, letter: 'a'}]
    const output = diff(orig, dist, ['id', 'letter'])

    should(output.added).be.eql([])
    should(output.removed).be.eql([{id: 1, letter: 'b'}])
    should(output.common).be.eql([{id: 1, letter: 'a'}])
  })

  it('added', function () {
    const orig = [{id: 1, letter: 'a'}]
    const dist = [{id: 1, letter: 'a'}, {id: 1, letter: 'b'}]
    const output = diff(orig, dist, ['id', 'letter'])

    should(output.added).be.eql([{id: 1, letter: 'b'}])
    should(output.removed).be.eql([])
    should(output.common).be.eql([{id: 1, letter: 'a'}])
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
