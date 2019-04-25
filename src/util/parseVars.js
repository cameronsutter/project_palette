export default function parseVars (type, obj) {
  return Object.keys(obj).reduce((acc, k) => {
    if (k.includes(type)) acc[k] = obj[k]
    return acc
  }, {})
}
