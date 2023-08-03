
import React, { FC } from 'react'

type NarrowLeftIconProps = {
  color?: string
}

const NarrowLeftIcon: FC<NarrowLeftIconProps> = (props) => {

  const { color = '#000' } = props

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_1391)">
        <g clipPath="url(#clip1_1_1391)">
          <path d="M11.5 4L7.91421 7.58579C7.24755 8.25245 6.91421 8.58579 6.91421 9C6.91421 9.41421 7.24755 9.74755 7.91421 10.4142L11.5 14" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_1_1391">
          <rect width="18" height="18" fill={color} />
        </clipPath>
        <clipPath id="clip1_1_1391">
          <rect width="18" height="18" fill={color} transform="translate(0 18) rotate(-90)" />
        </clipPath>
      </defs>
    </svg>

  )
}

export default NarrowLeftIcon
