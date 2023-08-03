'use client'
import { FC, Fragment, ReactNode } from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient } from 'react-query'

type RootTemplateProps = {
  children: ReactNode
}

const RootTemplate: FC<RootTemplateProps> = ({ children }) => {

  const queryClient = new QueryClient()

  return (
    <Fragment>
      {/* <QueryClientProvider client={queryClient}> */}
      {children}
      {/* </QueryClientProvider> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </Fragment>
  )
}

export default RootTemplate