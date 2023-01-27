import VMasker from 'vanilla-masker'

export function getCnpjMask(cnpj: string) {
  if (cnpj.length <= 12) {
    return VMasker.toPattern(cnpj, '999.999.999-99')
  } else {
    return VMasker.toPattern(cnpj, '99.999.999/9999-99')
  }
}
