export * from './todoValidator'

export const validate = (params, validator) => {
  return new Promise((resolve, reject) => {
    const errors = Object.entries(params)
      .filter(
        ([param, value]) =>
          !validator[param] || !validator[param].validate(value)
      )
      .map(
        ([param, value]) =>
          validator[param].errorMessage || `${param} is not an existing field`
      )
    if (errors.length > 0) {
      reject(errors)
      return
    }
    const missingFields = Object.entries(validator)
      .filter(([field, fieldParams]) => fieldParams.required)
      .map(([field, fieldParams]) => field)
      .filter(field => !Object.keys(params).includes(field))
      .map(field => `${field} is missing`)
    if (missingFields.length > 0) {
      reject(missingFields)
      return
    }
    resolve(params)
  })
}
