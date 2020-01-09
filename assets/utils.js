/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject (item) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep (target, ...sources) {
  if (!sources.length) { return target }
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) { Object.assign(target, { [key]: {} }) }
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

/**
 * Traverse an object.
 * @param object
 * @yields [key, value]
 */
export function* traverse (object, stack = []) {
  for (const key in object) {
    stack.push(key)
    if (typeof object[key] === 'object') {
      yield * traverse(object[key], stack)
    } else {
      // yield key - value pair
      const keyString = stack[0] + stack.slice(1).map(s => `[${s}]`).join('')
      const value = object[key]
      if (value !== undefined) { yield [keyString, value] }
      stack.pop()
    }
  }
  stack.pop()
}
