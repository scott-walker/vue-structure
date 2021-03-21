export default class TextService {
  constructor(httpClient, errorParser) {
    this.httpClient = httpClient
    this.errorParser = errorParser
  }

  getText() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("Some text")
      }, 1000)
    })
  }
}
