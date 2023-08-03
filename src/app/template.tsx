'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, Fragment, ReactNode } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RecoilRoot } from 'recoil'
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type RootTemplateProps = {
  children: ReactNode
}

const RootTemplate: FC<RootTemplateProps> = ({ children }) => {

  const queryClient = new QueryClient()

  const theme: CustomFlowbiteTheme = {
    pagination: {
      pages: {
        base: 'flex bg-white',
        previous: {
          base: 'text-sm ml-0 rounded-l border border-gray-300 bg-white py-[6.9px] px-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex'
        },
        showIcon: 'text-main-25',
        next: {
          base: 'text-sm rounded-r border border-gray-300 py-[6.9px] bg-white px-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex',
        },
        selector: {
          base: 'w-9 flex justify-center text-sm border border-gray-300 py-2 px-2.5 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white inline-flex',
          active: 'border border-pageactive text-white bg-pageactive hover:bg-pageactive hover:text-white inline-flex',

        }
      }
    }
  }

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <Flowbite className='' theme={{ theme }}>
          <RecoilRoot>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </RecoilRoot>
          <ReactQueryDevtools initialIsOpen={false} />
        </Flowbite>
      </QueryClientProvider>
    </Fragment>
  )
}

export default RootTemplate
