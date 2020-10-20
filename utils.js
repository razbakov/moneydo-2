import format from 'date-fns/format'
import saveAs from 'file-saver'
import { dsvFormat } from 'd3'

export const sortBy = (_key) => {
  let key = _key
  let multi = 1

  if (_key[0] === '-') {
    key = _key.slice(1)
    multi = -1
  }

  return (a, b) =>
    a[key] > b[key] ? 1 * multi : b[key] > a[key] ? -1 * multi : 0
}

export const toDatetimeLocal = (date) => {
  return format(date, "yyyy-MM-dd'T'HH:mm", { awareOfUnicodeTokens: true })
}

export const getDateObect = (val) => {
  let date

  if (!val) {
    return null
  }

  if (typeof val.toDate === 'function') {
    date = val.toDate()
  } else {
    date = new Date(val)
  }

  return date
}

export const getDateTime = (val) => {
  if (!val) return ''
  return format(getDateObect(val), "d MMM' at 'H:mm")
}

export const getDate = (val) => {
  if (!val) return ''
  return format(getDateObect(val), 'd MMM')
}

export const getDay = (val) => {
  if (!val) return ''
  return format(getDateObect(val), 'iiii')
}

export const getTime = (val) => {
  if (!val) return ''
  return format(getDateObect(val), 'H:mm')
}

export const openURL = (url) => {
  window.open(url, '_blank')
}

export const saveCSV = (data, filename) => {
  const csvFile = dsvFormat(',').format(data)
  const blob = new Blob([csvFile], {
    type: 'text/csv;charset=utf-8'
  })

  saveAs(blob, filename)
}

export const camelcase = (text) => {
  if (!text) {
    return ''
  }

  const result = text.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

export const sanitize = (input, trim) => {
  const val = input
  const expression = new RegExp(trim, 'gi')
  return val.replace(expression, '').trim()
}
