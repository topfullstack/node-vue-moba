const MAX_QUERY_LENGTH = 100

const SEARCHABLE_FIELDS = Object.freeze({
  Category: ['name'],
  Item: ['name'],
  Hero: ['name', 'title'],
  Article: ['title'],
  Ad: ['name'],
  AdminUser: ['username'],
})

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function validationError(message) {
  const error = new Error(message)
  error.statusCode = 422
  return error
}

function buildSearchFilter(modelName, rawQuery) {
  if (rawQuery === undefined || rawQuery === null || rawQuery === '') {
    return {}
  }

  if (typeof rawQuery !== 'string') {
    throw validationError('搜索关键词必须是文本')
  }

  const query = rawQuery.trim()
  if (!query) {
    return {}
  }

  if (query.length > MAX_QUERY_LENGTH) {
    throw validationError(`搜索关键词不能超过 ${MAX_QUERY_LENGTH} 个字符`)
  }

  const fields = SEARCHABLE_FIELDS[modelName]
  if (!fields) {
    return {}
  }

  const pattern = new RegExp(escapeRegExp(query), 'i')
  return {
    $or: fields.map(field => ({ [field]: pattern })),
  }
}

module.exports = {
  MAX_QUERY_LENGTH,
  buildSearchFilter,
  escapeRegExp,
}
