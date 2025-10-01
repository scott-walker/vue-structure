interface TextModelData {
  id: number
  content: string
}

export default class TextModel {
  private id: number
  private content: string

  constructor({ id, content }: TextModelData) {
    this.id = id
    this.content = content
  }

  get(): string {
    return this.content
  }
}
