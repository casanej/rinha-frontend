export const trampoline = (fn: Function) => (...args: any) => {
  let result = fn(...args)
  while (typeof result === 'function') {
    result = result()
  }
  return result
}