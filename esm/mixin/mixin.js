export default (target, source) => {
  Object.getOwnPropertyNames(source.prototype).forEach(property => {
    if (!(property in target.prototype)) {
      Object.defineProperty(target.prototype, property, Object.getOwnPropertyDescriptor(source.prototype, property));
    }
  })
}
