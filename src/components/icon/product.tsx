import React, { FC } from 'react'

type ProductIconProps = {
  color?: string
}

const ProductIcon: FC<ProductIconProps> = ({ color = '#11817C' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_783)">
        <path d="M4 9V17C4 18.8856 4 19.8284 4.58579 20.4142C5.17157 21 6.11438 21 8 21H16C17.8856 21 18.8284 21 19.4142 20.4142C20 19.8284 20 18.8856 20 17V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 9L18 9C18.9319 9 19.3978 9 19.7654 8.84776C20.2554 8.64477 20.6448 8.25542 20.8478 7.76537C21 7.39782 21 6.93188 21 6C21 5.06812 21 4.60218 20.8478 4.23463C20.6448 3.74458 20.2554 3.35523 19.7654 3.15224C19.3978 3 18.9319 3 18 3L11.1 3L6 3C5.06812 3 4.60217 3 4.23463 3.15224C3.74458 3.35523 3.35523 3.74458 3.15224 4.23463C3 4.60218 3 5.06812 3 6C3 6.93188 3 7.39782 3.15224 7.76537C3.35523 8.25542 3.74458 8.64477 4.23463 8.84776C4.60218 9 5.06812 9 6 9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 13L15 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1_783">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>

  )
}

export default ProductIcon
