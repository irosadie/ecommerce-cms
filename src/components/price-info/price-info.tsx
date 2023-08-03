import React, { FC, Fragment } from 'react'

type PriceInfoProps = {
  realPrice: string,
  priceCrossedOut?: string,
}
const PriceInfo: FC<PriceInfoProps> = ({ realPrice, priceCrossedOut }) => {
  return (
    <Fragment>
      <div className='text-sm font-semibold grid'>
        <span>{realPrice}</span>
        {priceCrossedOut ? <span className='font-normal text-xs'><s>{priceCrossedOut}</s></span> : null}
      </div>
    </Fragment>
  )
}

export default PriceInfo
