'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, Fragment, ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'

type RootTemplateProps = {
  children: ReactNode
}

const RootTemplate: FC<RootTemplateProps> = ({ children }) => {

  const queryClient = new QueryClient()

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          {children}
        </RecoilRoot>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Fragment>
  )
}

export default RootTemplate
