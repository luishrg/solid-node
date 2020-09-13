const HttpResponse = require('../helpers/http-response')

class LoginRouter {
  route (httpRequest) {
    const { body } = httpRequest || {}
    if (!body || !httpRequest) return HttpResponse.serverError()
    if (!body.password && !body.email) return HttpResponse.badRequest('Email e Senha')
    if (!body.email) return HttpResponse.badRequest('Email')
    if (!body.password) return HttpResponse.badRequest('Senha')
    return HttpResponse.serverSuccess()
  }
}

module.exports = LoginRouter
