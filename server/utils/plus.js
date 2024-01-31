function dateTime() {
  const date = new Date()
  return new Date(date.valueOf() - date.getTimezoneOffset() * 60000)
}

module.exports = {
  dateTime
}
