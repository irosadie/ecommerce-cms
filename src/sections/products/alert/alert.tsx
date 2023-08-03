import React, { FC } from 'react'
import { Alert } from 'flowbite-react'
import Link from 'next/link'
import { EXTERNAL_LINK } from '$/constants'

type AlertSectionProps = {
  onDismiss?: () => void
}

const AlertSection: FC<AlertSectionProps> = ({ onDismiss }) => {
  return (
    <Alert
      color='failure'
      onDismiss={onDismiss}
      rounded
    >
      <span className="font-bold">Info! </span>
      I have mistake submit my test result in dealls website.
      I confused with the form, I think I can send both of files and url,
      and I thought, the url is the result of my project. so, I put this alert for mention you the document test.
      You can download <Link className='font-bold' href={EXTERNAL_LINK.DOCS}>document here</Link> or also via navbar
    </Alert>
  )
}

export default AlertSection
