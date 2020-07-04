export const guardFromErrors = (errors) => {
  if (errors) {
    throw new Error(errors.map((error) => error.message).join('\n'))
  }
}

export const extractErrorInfo = (exception) => {
  let message = exception.message

  const { response } = exception
  if (response) {
    const { data } = response

    if (data) {
      const { errors } = data
      message = errors.map((item) => item.message).join('\n')
    }
  }

  return message
}
