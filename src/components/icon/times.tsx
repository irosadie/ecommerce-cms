import React, { FC } from 'react'

type TimesIconProps = {
  color?: string
}

const TimesIcon: FC<TimesIconProps> = (props) => {
  const { color = '#fff' } = props

  return (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_832)">
        <path d="M4 4L14 14M14 4L4 14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1_832">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>

  )
}

export default TimesIcon
