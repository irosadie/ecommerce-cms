import React, { FC } from 'react'

type FilterIconProps = {
  color?: string
}

const FilterIcon: FC<FilterIconProps> = ({ color = '#63748b' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6C4 6 9.57574 6 13 6M16 4V6M16 8V6M16 6H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18C4 18 6.57574 18 10 18M13 16V18M13 20V18M13 18H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 12C20 12 14.4243 12 11 12M8 14L8 12M8 10L8 12M8 12L4 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default FilterIcon
