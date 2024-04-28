import RandomText from "./random-text.js?version"

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("[data-conference-generate]")
  button.addEventListener("click", generateName)

  window.addEventListener("popstate", init)
  init()
})

const init = () => {
  const code = (new URL(document.location)).searchParams.get("c")
  if (code) {
    fillName(decode(code))
  } else {
    fillName(new RandomText().toString())
  }
}

const generateName = () => {
  const text = new RandomText().toString()
  fillName(text)

  const url = new URL(document.location)
  url.searchParams.set("c", encode(text))
  window.history.pushState({}, "", url.href)
}

const fillName = (text) => {
  text = `«\xa0${text}\xa0»`

  const name = document.querySelector("[data-conference-name]")
  name.innerText = text

  const title = document.querySelector("title")
  title.innerText = `${text} — ${title.dataset.title}`
}

// https://attacomsian.com/blog/javascript-base64-encode-decode
function encode(text) {
  // First we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  return btoa(
    encodeURIComponent(text)
      .replace(/%([0-9A-F]{2})/g, (_match, b) => String.fromCharCode('0x' + b))
  ).replace(/=+$/, '')
}

function decode(text) {
  // Going backwards: from bytetexteam, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(text)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}
