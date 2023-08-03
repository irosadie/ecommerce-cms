import React, { FC } from 'react'

type BurgerIconProps = {
  color?: string
}

const BurgerIcon: FC<BurgerIconProps> = (props) => {
  const { color = '#11817C' } = props

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_27951)">
        <path d="M5 12H19M5 7H19M5 17H19" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_1_27951">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default BurgerIcon
