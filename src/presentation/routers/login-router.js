const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    const { body } = httpRequest || {}
    if (!body || !httpRequest) return HttpResponse.serverError()
    if (!body.password && !body.email) return HttpResponse.badRequest('Email e Senha')
    if (!body.email) return HttpResponse.badRequest('Email')
    if (!body.password) return HttpResponse.badRequest('Senha')
    await this.authUseCase.auth(body.email, body.password)

    if (this.authUseCase.invalid) return HttpResponse.unauthorized(this.authUseCase.errorMessage)
    return HttpResponse.serverSuccess()
  }
}

module.exports = LoginRouter
