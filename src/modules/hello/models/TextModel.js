export default class TextModel {
  constructor({ id, content }) {
    this.id = id
    this.content = content
  }

  get() {
    return this.content
  }
}
