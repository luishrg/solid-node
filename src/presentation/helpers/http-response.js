const { InvalidParamError } = require('./errors')

class HttpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new InvalidParamError(paramName)
    }
  }

  static serverError () {
    return { statusCode: 500 }
  }

  static serverSuccess () {
    return { statusCode: 200 }
  }

  static unauthorized (paramName) {
    return {
      statusCode: 401,
      body: new InvalidParamError(paramName)
    }
  }
}

module.exports = HttpResponse
