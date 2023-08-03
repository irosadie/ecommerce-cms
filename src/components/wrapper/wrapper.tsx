import React, { FC, Fragment, ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode,
}

const Wrapper: FC<WrapperProps> = ({ children }) => {

  return (
    <Fragment>
      <div className='m-6'>
        <div className='space-y-8'>
          {children}
        </div>
      </div>
    </Fragment >
  )
}

export default Wrapper
