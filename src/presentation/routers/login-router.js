const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    const { body } = httpRequest || {}
    if (!body || !httpRequest) return HttpResponse.serverError()
    if (!body.password && !body.email) return HttpResponse.badRequest('Email e Senha')
    if (!body.email) return HttpResponse.badRequest('Email')
    if (!body.password) return HttpResponse.badRequest('Senha')
    this.authUseCase.auth(body.email, body.password)
    return HttpResponse.authenticated()
  }
}

module.exports = LoginRouter
