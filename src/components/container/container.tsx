import React, { FC, Fragment, ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode,
}

const Container: FC<ContainerProps> = ({ children }) => {

  return (
    <Fragment>
      <div>
        {children}
      </div>
    </Fragment >
  )
}

export default Container
