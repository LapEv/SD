const REQUIRED_FIELD = 'Обязательно для заполнения'
interface IWatch {
  list: {
    value: string
  }[]
}

export const loginValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 3) {
      return 'Длина должна состовлять не менее 3 символов'
    }
    if (!value.match('^[-.a-zA-Z0-9_-]+$')) {
      return 'Только латиниские буквы, цифры'
    }
    if (!value.match('[a-zA-Z]+')) {
      return 'Только буквы'
    }
    if (value.length > 20) {
      return 'Длина логина состовлять не более 20 символов'
    }

    return true
  },
}

export const passwordValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value.length < 8) {
      return 'Длина должна состовлять не менее 8 символов'
    }
    if (!value.match('[A-Z0-9]')) {
      return 'Пароль должен сожержать только латинские'
    }
    if (!value.match('[A-Z]+')) {
      return 'Пароль должен сожержать хотя бы одну заглавную букву'
    }
    if (!value.match('[0-9]+')) {
      return 'Пароль должен сожержать хотя бы одну цифру'
    }
    if (value.length > 40) {
      return 'Длина логина состовлять не более 40 символов'
    }
    return true
  },
}

export const nameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[а-яА-Яa-zA-Z]+$')) {
      return 'Только латиниские буквы или кирилицу, цифры'
    }
    if (!value.match('^[А-ЯA-Z]')) {
      return 'Должно начинаться с заглавной буквы'
    }

    return true
  },
}

export const lightTextValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[А-ЯA-Z]')) {
      return 'Должно начинаться с заглавной буквы'
    }
    return true
  },
}

export const NoRequiredValidation = {
  validate: () => {
    return true
  },
}

export const commentINCValidation = {
  validate: (value: string) => {
    if (value && value.length > 1024) {
      return 'Превышен лимит в 1024 символа'
    }
    return true
  },
}

export const RequiredValidation = {
  required: REQUIRED_FIELD,
}

export const textValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[?!, .а-яА-ЯёЁ0-9s]+$')) {
      return 'Только кирилица, цифры'
    }
    if (!value.match('^[А-ЯA-Z]')) {
      return 'Должно начинаться с заглавной буквы'
    }
    return true
  },
}

export const RequiredDaysSLAValidation = {
  required: REQUIRED_FIELD,
  validate: (value: number) => {
    if (value < 0) {
      return 'Не может быть меньше ноля!'
    }
    return true
  },
}

export const textValidationlowercase = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[?!, .а-яА-ЯёЁ0-9s]+$')) {
      return 'Только кирилица, цифры'
    }
    return true
  },
}

export const textValidationlowercaseSymbols = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[?!-_, .а-яА-ЯёЁ0-9s]+$')) {
      return 'Только кирилица, цифры'
    }
    return true
  },
}

export const textValidationENG = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[?!, .a-zA-Z0-9s]+$')) {
      return 'Только латиница, цифры'
    }
    if (!value.match('^[А-ЯA-Z]')) {
      return 'Должно начинаться с заглавной буквы'
    }
    return true
  },
}

export const textValidationENGlowercase = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[?!, .a-zA-Z0-9s]+$')) {
      return 'Только латиница, цифры'
    }
    return true
  },
}

export const phoneValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match(`^[+]?[\\d]+$`)) {
      return 'Только цифры!'
    }
    if (value.substring(0, 1) !== '8' && value.substring(0, 2) !== '+7') {
      return 'Должен начинаться с "8" или "+7"!'
    }
    if (value.substring(0, 1) === '8' && value.length > 11) {
      return 'Слишком много цифр!'
    }
    if (value.substring(0, 1) === '8' && value.length < 11) {
      return 'Слишком мало цифр!'
    }
    if (value.substring(0, 2) === '+7' && value.length > 12) {
      return 'Слишком много цифр!'
    }
    if (value.substring(0, 2) === '+7' && value.length < 12) {
      return 'Слишком мало цифр!'
    }
    return true
  },
}

export const forSpacePartsValidation = {
  validate: (value: string) => {
    if (value && !value.match('^(?!s*$)[., 0-9а-яА-Яa-zA-z]+$')) {
      return 'Можно только буквы, цифры, ".", ",", пробел! '
    }
    return true
  },
}

export const emailValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^[a-zA-z0-9]+[a-zA-Z\\d-_.]*@[a-z\\d-_]+\\.')) {
      return 'Неправильный email'
    }
    return true
  },
}

export const emailValidationNoRequired = {
  validate: (value: string) => {
    if (!value.length) return true
    if (!value.match('^[a-zA-z0-9]+[a-zA-Z\\d-_.]*@[a-z\\d-_]+\\.')) {
      return 'Неправильный email'
    }
    return true
  },
}

export const passwordValidationNew = {
  required: REQUIRED_FIELD,
  validate: (value: string, watch: IWatch) => {
    if (watch.list[0].value === value) {
      return 'Новый пароль не должен быть таким же, как старый'
    }
    if (value.length < 8) {
      return 'Длина должна состовлять не менее 8 символов'
    }
    if (!value.match('[A-Z]+')) {
      return 'Пароль должен сожержать хотя бы одну заглавную букву'
    }
    if (!value.match('[0-9]+')) {
      return 'Пароль должен сожержать хотя бы одну цифру'
    }
    if (value.length > 40) {
      return 'Длина логина состовлять не более 40 символов'
    }

    return true
  },
}

export const passwordValidationConfrim = {
  required: REQUIRED_FIELD,
  validate: (value: string, watch: IWatch) => {
    if (watch.list[1].value !== value) {
      return 'Пароли не совпадают'
    }
    if (value.length < 8) {
      return 'Длина должна состовлять не менее 8 символов'
    }
    if (!value.match('[A-Z]+')) {
      return 'Пароль должен сожержать хотя бы одну заглавную букву'
    }
    if (!value.match('[0-9]+')) {
      return 'Пароль должен сожержать хотя бы одну цифру'
    }
    if (value.length > 40) {
      return 'Длина логина состовлять не более 40 символов'
    }

    return true
  },
}

export const coordinatesValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (
      !value.match(
        '^([-+]?)([0-9]{1,2})([,.])([0-9]{1,6})([,])([ ])([-+]?)([0-9]{1,2})([,.])([0-9]{1,6})',
      )
    ) {
      return 'Не соответсвует формату координат'
    }
    return true
  },
}

export const timeValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (!value.match('^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9](?::[0-5]?[0-9])?$')) {
      return 'Не соответсвует формату времени'
    }
    return true
  },
}

export const fileValidation = (files: FileList) => {
  const requiredTypes = ['image', 'application/pdf']
  const requiredSize = 1024 * 1024 * 2
  const valError = []

  if (files.length > 10) {
    return {
      status: false,
      error: `Не более 10 файлов!`,
    }
  }

  for (const file of files) {
    const checkType = !requiredTypes.find(item => file.type.includes(item))
    if (checkType) {
      valError.push(file.name)
    }
    if (file.size > requiredSize) {
      valError.push(file.name)
    }
  }
  if (valError.length > 0) {
    return {
      status: false,
      error: `Некоторые файлы не поддерживаются (только картинки или pdf) или превышен лимит на размер файла (2Mb)!`,
    }
  }
  return { status: true, error: '' }
}

export const checkCommentINCValidation = (text: string) => {
  if (text && text.length >= 1024) {
    return 'Превышен лимит в 1024 символа'
  }
  return ''
}
