export function parseHSL (hslString) {
  const regex = /hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)/
  let matches = hslString.match(regex)
  if (!matches || matches.length < 2) return null
  return {
    h: parseInt(matches[1]),
    s: parseInt(matches[2]) / 100,
    l: parseInt(matches[3]) / 100,
    a: 1,
  }
}

export function hslToString (hslObj) {
  let h = Math.round(hslObj.h)
  let s = Math.round(hslObj.s * 100)
  let l = Math.round(hslObj.l * 100)
  return `hsl(${h}, ${s}%, ${l}%)`
}