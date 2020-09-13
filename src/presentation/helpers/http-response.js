const { MissingParamError } = require('./errors')

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }

  static serverError () {
    return { statusCode: 500 }
  }

  static serverSuccess () {
    return { statusCode: 200 }
  }
}

module.exports = HttpResponse