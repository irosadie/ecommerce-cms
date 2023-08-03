import React, { FC, Fragment, ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode,
}

const Wrapper: FC<WrapperProps> = ({ children }) => {

  return (
    <Fragment>
      <div className='m-4 laptop:m-6'>
        <div className='space-y-8 max-w-full'>
          {children}
        </div>
      </div>
    </Fragment >
  )
}

export default Wrapper
