const Joi = require('joi')

const LoginRouter = require('./login-router')
const { InvalidParamError } = require('../helpers/errors')

function makeSut () {
  class AuthUseCaseSpy {
    async auth (email, password) {
      try {
        const schema = Joi.object({
          email: Joi.string().email().error(() => new Error('email')),
          password: Joi.string().min(0).max(10).error(() => new Error('senha'))
        })

        await schema.validateAsync({ email, password })
        this.email = email
        this.password = password
        this.invalid = false
      } catch (error) {
        this.errorMessage = error.message
        this.invalid = true
      }
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return { sut, authUseCaseSpy }
}

describe('Login Router', () => {
  test('Deve retornar 400 quando não possuir email', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('Email'))
  })

  test('Deve retornar 400 quando não possuir senha', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('Senha'))
  })

  test('Deve retornar 500 caso não receba a requisição', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Deve chamar AuthUseCase com parâmetros corretos', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'email@email.com',
        password: 'password'
      }
    }
    await sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })

  test('Deve chamar AuthUseCase e retornar erro no email com status code 401', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
    expect(httpResponse.statusCode).toBe(401)
  })

  test('Deve chamar AuthUseCase e retornar erro na senha com status code 401', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email@email.com',
        password: 'to_long_password'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.body).toEqual(new InvalidParamError('senha'))
    expect(httpResponse.statusCode).toBe(401)
  })
})
