interface IStringHelper {
  removeAccents: (str: string) => string
  diffChars: (str1: string, str2: string) => string
}

export const StringHelper = (): IStringHelper => {

  /**
   * Remove accents from a string
   * @example
   * removeAccents('éàèù') // returns 'eaeu'
   * @see https://stackoverflow.com/a/37511463/2391795
   * @param {string} str
   * @returns {string}
   */
  const removeAccents = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  /**
   * Get the difference between two strings
   * @example
   * diffChars('azerty', 'azertyuiop') // returns 'uiop'
   * @param {string} str1
   * @param {string} str2
   * @returns {string}
   */
  const diffChars = (str1: string, str2: string): string => {
    return str1.split('').filter((char: string) => !str2.includes(char)).join('')
  }

  return {
    removeAccents,
    diffChars
  }

}
