export const schema = {
  title: [{ required: true }],
  description: [{ required: true, min: 10, max: 190 }],
  path: [{ required: true, }],
}

export const messages = {
  required: '${label} is required',
  types: {
    email: '${label} is not a valid email',
    number: '${label} is not a valid number',
    regexp: '${labe} Just numbers allow'
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  }
}