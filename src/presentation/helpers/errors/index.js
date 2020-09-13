class InvalidParamError extends Error {
  constructor (paramName) {
    super(`Informação faltando ou inválida: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}

module.exports = {
  InvalidParamError
}
