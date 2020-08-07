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

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Informação faltando: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

describe('Login Router', () => {
  test('Deve retornar 400 quando não possuir email', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        password: 'password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Email'))
  })

  test('Deve retornar 400 quando não possuir senha', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'email'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('Senha'))
  })

  test('Deve retornar 200 se possuir email e senha', () => {
    const sut = new LoginRouter()
    const httpRequest = {
      body: {
        email: 'email',
        password: 'password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('Deve retornar 500 caso não receba a requisição', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })
})
