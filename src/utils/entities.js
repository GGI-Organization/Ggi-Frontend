export class LoginRes {
  constructor(response) {
    const { id, username, email, roles, token } = response
    this.id = id
    this.username = username
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