
import React, { FC } from 'react'

type NarrowRightIconProps = {
  color?: string
}

const NarrowRightIcon: FC<NarrowRightIconProps> = (props) => {

  const { color = '#000' } = props

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_1399)">
        <g clipPath="url(#clip1_1_1399)">
          <path d="M6.5 14L10.0858 10.4142C10.7525 9.74755 11.0858 9.41421 11.0858 9C11.0858 8.58579 10.7525 8.25245 10.0858 7.58579L6.5 4" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1399">
          <rect width="18" height="18" fill={color} />
        </clipPath>
        <clipPath id="clip1_1_1399">
          <rect width="18" height="18" fill={color} transform="matrix(0 1 -1 0 18 0)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default NarrowRightIcon
