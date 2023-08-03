const afterDiscount = (amount:number, percentage:number) => {
  if (percentage) {
    const discount = (percentage / 100) * amount
    const price = amount - discount

    return parseFloat(price.toFixed(2))
  }
  return amount
}

export default afterDiscount



