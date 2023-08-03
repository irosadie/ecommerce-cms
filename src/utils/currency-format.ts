type CurrencyFormatProps = {
  amount: number
  separator?: string
  prefix?: string
}
export const currencyFormat = ({ amount, separator = '.', prefix = '' }:CurrencyFormatProps) => {
  const formattedAngka = amount.toLocaleString().replaceAll(',', separator)

  return `${prefix}${formattedAngka}`
}

export const decodeCurrency = (currencyFormat: string, prefix = '') => {
  return parseFloat(currencyFormat.replaceAll(prefix, '').replaceAll('.', '')||'0')
}



