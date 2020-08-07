class LoginRouter {
  route (httpRequest) {
    const { body } = httpRequest
    const httpResponse = {
      statusCode: 200,
      data: {}
    }
    if (!body || !body.email || !body.password) httpResponse.statusCode = 400
    return httpResponse
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
})
