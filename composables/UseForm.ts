interface IUseForm {
  getErrors: (field?: string) => TErrorMessages | TErrors
  setError: (field: string, error: string) => void
  formIsValid: (form: Record<string, IForm>) => any

  validationRules: {
    required: TValidationRuleWrapper
    requiredSpecial: TValidationRuleWrapper
    lettersDashesSpaces: TValidationRuleWrapper
    isDate: TValidationRuleWrapper
    isPhone: TValidationRuleWrapper
    isEmail: TValidationRuleWrapper
    lettersNumbersDashesSpacesApostrophe: TValidationRuleWrapper
    exactLength: TValidationRuleWrapper
    numbers: TValidationRuleWrapper
    isImage: TValidationRuleWrapper
    extensions: TValidationRuleWrapper
  }
}

export interface IForm {
  value: string
  label: string
  type: string
  required?: boolean
  layout?: string
  radio?: boolean
  options?: Array<{
    value?: any
    label: string
  }>
  check?: boolean
  validationRules?: Array<TValidationRule>
}

type TValidationRuleWrapper = (params?: Record<string, any>) => TValidationRule
type TValidationRule = (name: string, value: any) => boolean | void

type TErrorMessages = Array<string>

type TErrors = Record<string, TErrorMessages>

export const UseForm = (): IUseForm => {

  const errors: Ref<TErrors> = ref({})

  const setError = (field: string, error: string): void => {
    if (!errors.value[field]) {
      errors.value[field] = []
    }
    errors.value[field].push(error)
  }

  const getErrors = (field?: string): TErrors | TErrorMessages => {
    if (field) {
      return errors.value[field]
    }
    return errors.value
  }

  const _validateForm = (form: Record<string, IForm>): void => {
    errors.value = {}
    Object.entries(form).map(([name, { value , validationRules}]) => {
      validationRules?.map((validationRule: TValidationRule) => {
        validationRule(name, value)
      })
    })
  }

  const formIsValid = (form: Record<string, IForm>): boolean => {
    _validateForm(form)
    return Object.keys(errors.value).length === 0
  }

  // ########################################################################################################################
  // VALIDATION RULES #######################################################################################################
  // ########################################################################################################################

  const required = ((params: Record<string, any> = {}) => {
    const {
      message = 'Ce champ est obligatoire'
    } = params
    return (name: string, value: any) => {
      return !!value || setError(name, message)
    }
  })

  const requiredSpecial = ((params: Record<string, any> = {}) => {
    const {
      message = 'Ce champ est obligatoire',
      source
    } = params
    return (name: string, value: any) => {
      return !!source.value || setError(name, message)
    }
  })

  const numbers = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ ne doit contenir que des nombres`
    } = params
    return (name: string, value: any) => {
      return !!value.match(/^[0-9]+$/) || setError(name, message)
    }
  })

  const lettersDashesSpaces = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ n'est pas valide`,
      required = false
    } = params
    return (name: string, value: any) => {
      const matches = required ? !!value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ- ]+$/) : !!value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ- ]*$/)
      return matches || setError(name, message)
    }
  })

  const lettersNumbersDashesSpacesApostrophe = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ n'est pas valide`,
      required = false
    } = params
    return (name: string, value: any) => {
      const matches = required ? !!value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9-' ]+$/) : !!value.match(/^[a-zA-ZÀ-ÖØ-öø-ÿ0-9- ]*$/)
      return matches || setError(name, message)
    }
  })

  const isDate = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ n'est pas valide`
    } = params
    return (name: string, value: any) => {
      return !!value.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) || setError(name, message)
    }
  })

  const isPhone = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ n'est pas valide`
    } = params
    return (name: string, value: any) => {
      return !!value.match(/^0[0-9]{9}$/) || setError(name, message)
    }
  })

  const isEmail = ((params: Record<string, any> = {}) => {
    const {
      message = `Ce champ n'est pas valide`
    } = params
    return (name: string, value: any) => {
      return !!value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) || setError(name, message)
    }
  })

  const exactLength = ((params: Record<string, any> = {}) => {
    const {
      length = 5,
      message = `Ce champ doit contenir exactement {length} caractères`
    } = params
    return (name: string, value: any) => {
      return !!value.match(new RegExp(`^.{${length}}$`)) || setError(name, message.replace('{length}', length))
    }
  })

  const isImage = ((params: Record<string, any> = {}) => {
    const {
      format,
      message = `Le fichier doit être une image`
    } = params
    return (name: string, value: any) => {
      return (!!format.value && format.value === 'image') || setError(name, message)
    }
  })

  const extensions = ((params: Record<string, any> = {}) => {
    const {
      allowed = [ 'jpg', 'jpeg', 'png' ],
      extension,
      message = `Le fichier doit être d'un des formats suivants : ${allowed.join(', ')}`
    } = params
    return (name: string, value: any) => {
      return (!!extension.value && allowed.includes(extension.value)) || setError(name, message)
    }
  })

  // ########################################################################################################################

  return {
    getErrors,
    setError,
    formIsValid,

    validationRules: {
      required,
      requiredSpecial,
      numbers,
      lettersDashesSpaces,
      isDate,
      isPhone,
      isEmail,
      lettersNumbersDashesSpacesApostrophe,
      exactLength,
      isImage,
      extensions
    }
  }

}
