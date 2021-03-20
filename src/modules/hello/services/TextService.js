export default class TextService {
  constructor({ httpClient, errorParser }) {
    this.httpClient = httpClient
    this.errorParser = errorParser
  }

  getText() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Some text")
      }, 1000)
    })

    // try {
    //   await this.httpClient.post("user/login", { email, password })
    // } catch (error) {
    //   throw this.errorParser.parse(error)
    // }
  }
}
