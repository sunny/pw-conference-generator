import patterns from "./patterns.yml"

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-conference-generate]")

  button.addEventListener("click", generateName);
  generateName();
});

const generateName = () => {
  const nameTarget = document.querySelector("[data-conference-name]");
  const text = new RandomText(patterns).toString();
  nameTarget.innerText = `«\xa0${text}\xa0»`
}

class RandomText {
  constructor(patterns) {
    this.patterns = copy(patterns);
  }

  toString() {
    const text = this.pick("start");
    const result = this.applyReplacements(text);
    return capitalize(fixWhitespace(fixTypos(result)));
  }

  applyReplacements(text) {
    let replaced = false

    // required <tags>
    text = text.replace(/<(.*?)>/, (match, tag) => {
      replaced = true
      return this.pick(tag)
    })

    // optional [tags]
    text = text.replace(/\[(.*?)\]/, (match, tag) => {
      replaced = true;
      return (Math.random() < 0.3) ? this.pick(tag) : "";
    })

    return replaced ? this.applyReplacements(text) : text;
  }

  pick(tag) {
    if (!this.patterns[tag]) throw new Error("No such tag: " + tag)

    const index = Math.floor(Math.random() * this.patterns[tag].length);
    return this.patterns[tag].splice(index, 1).toString();
  }
}

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const fixWhitespace = (text) => {
  return text
    .replace(/ +/, " ")
    .replace(/ +([…,])/, "$1")
    .replace(/ +([:?])/, "\xa0$1")
    .trim();
}

const fixTypos = (text) => {
  return text
    .replace(/ à le /, " au ")
    .replace(/ de le /, " du ")
    .replace(/ de un /, " d’un ")
    .replace(/ à les /, " aux ")
    .replace(/ de les /, " des ")
    .replace(/ de des /, " des ");
}

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const copy = (object) => {
  return JSON.parse(JSON.stringify(object))
}
