import React, { FC } from 'react'

type TableIconProps = {
  color?: string
}

const TableIcon: FC<TableIconProps> = ({ color = '#63748b' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_2350)">
        <path d="M11 4H6.5C4.61438 4 3.67157 4 3.08579 4.58579C2.5 5.17157 2.5 6.11438 2.5 8V10C2.5 11.8856 2.5 12.8284 3.08579 13.4142C3.67157 14 4.61438 14 6.5 14H11C12.8856 14 13.8284 14 14.4142 13.4142C15 12.8284 15 11.8856 15 10V8C15 6.11438 15 5.17157 14.4142 4.58579C13.8284 4 12.8856 4 11 4Z" stroke={color} />
        <path d="M9 4V14M15 10.5H3M15 7.5H3" stroke={color} strokeWidth="1" strokeLinecap="round" />
      </g>
      <defs>
        <clipPath id="clip0_1_2350">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default TableIcon
