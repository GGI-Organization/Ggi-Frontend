export class LoginRes {
  constructor(response) {
    const { id, fullname, email, roles, token } = response
    this.id = id
    this.fullname = fullname
    this.email = email
    this.roles = roles
    this.token = token
  }
}

export class DefaultRes {
  constructor(response) {
    const { error, message } = response
    this.error = error
    this.message = message
  }
}