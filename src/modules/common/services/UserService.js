export default class UserService {
  constructor(httpClient, errorParser) {
    this.httpClient = httpClient
    this.errorParser = errorParser
  }

  async login(email, password) {
    try {
      await this.httpClient.post("user/login", { email, password })
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }

  async logout() {
    try {
      await this.httpClient.post("user/logout")
    } catch (error) {
      throw this.errorParser.parse(error)
    }
  }
}
