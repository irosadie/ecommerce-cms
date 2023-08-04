/* eslint-disable react/display-name */
import { Badge } from '$/components/badge'
import { Card } from '$/components/card'
import { currencyFormat } from '$/utils'
import React, { FC, memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import Select, { ActionMeta, SingleValue } from 'react-select'

type DataSelectProps = { value: string, label: string }

type DetailCartSectionProps = {
  selectCartProps: {
    options?: DataSelectProps[]
    onChange: ((newValue: SingleValue<DataSelectProps>, actionMeta: ActionMeta<DataSelectProps>) => void) | undefined
    value?: DataSelectProps[]
  }
  username?: string
  fullname?: string
  total?: number | string
  quantity?: number | string
  amount?: number
  discount?: number | string
  discountedAmount?: number
  isLoading: boolean
}

const DetailCartSection: FC<DetailCartSectionProps> = (props) => {

  const { selectCartProps, username, fullname, total, quantity, amount, discount, discountedAmount, isLoading } = props

  return (
    <Card className='pb-8'>
      <div className='grid gap-y-2 tablet:flex justify-between border-b mb-4 p-4'>
        <div>
          <h2 className='font-medium text-lg'>Detail of Cart</h2>
        </div>
        <div className=''>
          <Select
            id="search"
            className='w-60'
            {...selectCartProps}
          />
        </div>
      </div>
      <ul className='grid grid-col-1 tablet:grid-cols-2 gap-x-8 gap-y-3 text-sm p-4'>
        <WordingInfo
          label='Username'
          value={`@${username}`}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Full Name'
          value={fullname}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Total'
          value={total as string}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Quantity Item'
          value={<Badge>{quantity as string}</Badge>}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Amount'
          value={<s>{currencyFormat({ amount: amount || 0, prefix: '$' })}</s>}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Discount Avarage'
          value={<span className='font-bold'>{`${discount}%`}</span>}
          isLoading={isLoading}
        />

        <WordingInfo
          label='Discount Amount'
          value={<span className='font-bold'>{currencyFormat({ amount: discountedAmount || 0, prefix: '$' })}</span>}
          isLoading={isLoading}
        />
      </ul>
    </Card>
  )
}

type WordingInfoProps = {
  label?: string,
  value?: string | JSX.Element,
  isLoading: boolean
}

const WordingInfo = memo((props: WordingInfoProps) => {

  const { label, value, isLoading } = props

  const randomWidth = [85, 90, 100, 100]
  const randomIndex = Math.floor(Math.random() * 5)

  return (
    <li>
      {isLoading ? <Skeleton width={`${randomWidth[randomIndex]}%`} height={24} /> : (
        <div className='grid tablet:flex gap-y-2'>
          <span className='font-semibold tablet:w-1/2'>{label || ''}</span>
          <p>
            <span className='hidden tablet:inline mr-2'>:</span>
            {value}
          </p>
        </div>
      )}
    </li>
  )
})


export default memo(DetailCartSection)
