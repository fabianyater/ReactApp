export const schema = {
  id: [{
    required: true,
    pattern: new RegExp(/^([0-9])*$/),
    message: 'Solo números'
  }],
  description: [{ required: true, min: 3, max: 50 }],
  path: [{ required: true, }],
  extension: [{ required: true }]
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