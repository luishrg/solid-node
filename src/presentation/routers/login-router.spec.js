const LoginRouter = require('./login-router')
const { MissingParamError } = require('../helpers/errors')

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
