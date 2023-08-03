import React, { FC } from 'react'

type FileIconProps = {
  color?: string
}

const FileIcon: FC<FileIconProps> = (props) => {
  const { color = '#11817C' } = props

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_1944)">
        <g clipPath="url(#clip1_1_1944)">
          <path d="M5 7V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V9.28145C19 8.40415 19 7.9655 18.827 7.57705C18.654 7.1886 18.328 6.89516 17.6759 6.30827L15.1409 4.02682C14.577 3.51929 14.295 3.26552 13.9491 3.13276C13.6031 3 13.2237 3 12.4651 3H9C7.11438 3 6.17157 3 5.58579 3.58579C5 4.17157 5 5.11438 5 7Z" stroke={color} strokeWidth="2" />
          <path d="M13 3V5C13 6.88562 13 7.82843 13.5858 8.41421C14.1716 9 15.1144 9 17 9H19" stroke={color} strokeWidth="2" />
        </g>
        <path d="M9 17.5H12M9 12.5H15M9 7.5H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1_1944">
          <rect width="24" height="24" fill={color} />
        </clipPath>
        <clipPath id="clip1_1_1944">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}

export default FileIcon
