class MissingParamError extends Error {
  constructor (paramName) {
    super(`Informação faltando: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

module.exports = {
  MissingParamError
}
