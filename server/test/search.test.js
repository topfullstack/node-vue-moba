const assert = require('assert')
const {
  MAX_QUERY_LENGTH,
  buildSearchFilter,
  escapeRegExp,
} = require('../utils/search')

function test(name, fn) {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    console.error(`✗ ${name}`)
    throw error
  }
}

test('returns no filter when the query is empty', () => {
  assert.deepStrictEqual(buildSearchFilter('Hero', ''), {})
  assert.deepStrictEqual(buildSearchFilter('Hero', '   '), {})
  assert.deepStrictEqual(buildSearchFilter('Hero'), {})
})

test('searches only the configured field for a category', () => {
  const filter = buildSearchFilter('Category', '  战士  ')

  assert.deepStrictEqual(Object.keys(filter), ['$or'])
  assert.strictEqual(filter.$or.length, 1)
  assert.deepStrictEqual(Object.keys(filter.$or[0]), ['name'])
  assert.strictEqual(filter.$or[0].name.source, '战士')
  assert.strictEqual(filter.$or[0].name.flags, 'i')
})

test('searches both hero name and title', () => {
  const filter = buildSearchFilter('Hero', '亚瑟')

  assert.strictEqual(filter.$or.length, 2)
  assert.deepStrictEqual(filter.$or.map(condition => Object.keys(condition)[0]), [
    'name',
    'title',
  ])
  assert.strictEqual(filter.$or[0].name.source, '亚瑟')
  assert.strictEqual(filter.$or[1].title.source, '亚瑟')
})

test('treats regex metacharacters as literal text', () => {
  assert.strictEqual(escapeRegExp('a.*(b)[c]?'), 'a\\.\\*\\(b\\)\\[c\\]\\?')

  const filter = buildSearchFilter('Article', 'a.*(b)[c]?')
  assert.strictEqual(filter.$or[0].title.source, 'a\\.\\*\\(b\\)\\[c\\]\\?')
})

test('does not expose fields for an unconfigured model', () => {
  assert.deepStrictEqual(buildSearchFilter('Unknown', 'secret'), {})
})

test('rejects a non-string query value', () => {
  assert.throws(
    () => buildSearchFilter('Hero', ['亚瑟', '安琪拉']),
    error => error.statusCode === 422 && /文本/.test(error.message)
  )
})

test('rejects a query longer than the configured maximum', () => {
  assert.throws(
    () => buildSearchFilter('Hero', 'a'.repeat(MAX_QUERY_LENGTH + 1)),
    error => error.statusCode === 422 && /100/.test(error.message)
  )
})

console.log('All search tests passed')
