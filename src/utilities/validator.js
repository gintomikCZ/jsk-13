export default {

  required (value) {
    return (typeof value === 'number' && !Number.isNaN(value)) || (typeof value === 'string' && value.length > 0)
  },
  minLength (value, par) {
    return typeof value === 'string' && value.length >= par
  },
  greaterThen (value, par) {
    return + value > par
  }

}