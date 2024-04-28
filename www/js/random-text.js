import patterns from "./patterns.js?version"

export default class RandomText {
  constructor() {
    this.patterns = this.#copy(patterns)
  }

  toString() {
    const text = this.#pick("start")
    const result = this.#applyReplacements(text)
    return this.#capitalize(this.#fixWhitespace(this.#fixTypos(result)))
  }

  #applyReplacements(text) {
    let replaced = false

    // required <tags>
    text = text.replace(/<(.*?)>/, (_match, tag) => {
      replaced = true
      return this.#pick(tag)
    })

    // optional [tags]
    text = text.replace(/\[(.*?)\]/, (_match, tag) => {
      replaced = true
      return (Math.random() < 0.5) ? this.#pick(tag) : ""
    })

    return replaced ? this.#applyReplacements(text) : text
  }

  #pick(tag) {
    if (!this.patterns[tag]) throw new Error("No such tag: " + tag)

    const index = Math.floor(Math.random() * this.patterns[tag].length)
    return this.patterns[tag].splice(index, 1).toString()
  }

  #capitalize(text) {
    return text.replace(/(?:^|\. )(.)/g, text => text.toUpperCase())
  }

  #fixWhitespace(text) {
    return text
      .replace(/\s+/g, " ")
      .replace(/ ([.…,])/g, "$1")
      .replace(/ ([:?!])/g, "\xa0$1")
      .trim()
  }

  #fixTypos(text) {
    return ` ${text} `
      .replace(/ à le /g, " au ")
      .replace(/ (de|du) le /g, " du ")
      .replace(/ des vos /g, " de vos ")
      .replace(/ de un /g, " d’un ")
      .replace(/ que (un|une) /g, " qu’$1 ")
      .replace(/ à les /g, " aux ")
      .replace(/ (de|des|du) (des|les) /g, " des ")
      .replace(/ (le|les) (des|les) /g, " les ")
      .replace(/ le (de|le) /g, " le ")
      .replace(/ le mon /g, " mon ")
      .replace(" du HTML5 ", " d’HTML5")
      .replace(" le Firefox ", " Firefox ")
      .replace(" (j’ai dû|je dois) se ", " $1 me ")
      .replace(" (moi devrait|vous devraient) ", " on devrait ")
      .replace(" vous deviennent ", " vous devenez ")
      .replace(" moi avait ", " j’avais ")
      .replace(/ le ([aAeEiIoOuUué])/g, " l’$1")
      .replace(/ de ([aAeEiIoOuUué])/g, " d’$1")
      .replace(/ le l’/g, " l’")
      .replace(/ (: .*): /g, " $1, ")
      .replace(/ certaines (les|vos)/g, " certaines")
      .replace(/ \) /g, ") ")
  }

  #copy(object) {
    return JSON.parse(JSON.stringify(object))
  }
}
