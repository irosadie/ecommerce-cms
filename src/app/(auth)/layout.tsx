'use client'

import React, { Fragment, ReactNode, FC, useState } from 'react'
import { Sidebar, Menu, MenuItem, } from 'react-pro-sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { EXTERNAL_LINK, MENU } from '$/constants'
import { useRecoilState } from 'recoil'
import { sidebarCollapsed } from '$/stores'
import { NarrowLeftIcon, NarrowRightIcon } from '$/components/icon'
import { Button } from '$/components/button'

type AuthLayoutProps = {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {

  const [collapsed, setCollapsed] = useRecoilState(sidebarCollapsed)
  const [isShowDrawer, setIsShowDrawer] = useState(false)

  const path = usePathname()

  const handleCollapseClick = () => {
    setCollapsed(v => !v)
  }

  const mainMenu = MENU

  const renderMenu: JSX.Element[] = []

  mainMenu.map((v) => {
    const { path: menuPath, activeIcon, deactiveIcon, label } = v
    const active = path?.includes(menuPath)

    renderMenu.push(
      <MenuItem
        key={v.key}
        component={<Link href={menuPath} />}
        icon={active ? activeIcon : deactiveIcon}
        active={active ?? false}
      ><span>{label}</span></MenuItem>
    )
  })

  return (
    <Fragment>
      <div className='relative tablet:flex'>
        <div className={collapsed && !isShowDrawer ? 'w-[80px]' : 'w-[210px]'}>
          <Sidebar
            collapsed={collapsed && !isShowDrawer}
            backgroundColor='#4AC3BE'
            className={isShowDrawer ? 'z-[41] tablet:block' : 'hidden z-[41] tablet:block'}
            width={collapsed && !isShowDrawer ? '80px' : '210px'}
            rootStyles={{
              position: 'fixed',
              height: '100vh',
            }}
            transitionDuration={0}
          >
            <div className='h-[76px] flex justify-start items-center px-8 text-xl font-bold text-white gap-2'>
              {collapsed && !isShowDrawer ? <span>TB</span> : <span>TOKOBUDEA</span>}
              <div className='block tablet:hidden'><Button intent='primary' icon='times' onClick={() => setIsShowDrawer(v => !v)} dimension='tiny' rounded='standard' /></div>
            </div>

            <Menu
              onClick={() => setIsShowDrawer(false)}
              menuItemStyles={{
                button: ({ level, active }) => {
                  if (level === 0)
                    return {
                      color: active ? '#fff' : '#11817C',
                      backgroundColor: active ? '#FAFAFA25' : undefined,
                      borderLeft: active ? '4px solid #fff' : '4px solid transparent',
                      '&:hover': {
                        backgroundColor: '#FAFAFA25',
                        color: '#fff',
                      },
                    }
                }
              }}>
              <Fragment>{renderMenu.length ? renderMenu : null}</Fragment>
            </Menu>
          </Sidebar>
        </div>
        <div className='bg-[#f7f8fc] relative flex-1'>
          <header className='bg-white h-16 relative'>
            <button onClick={handleCollapseClick} className='bg-white border border-gray-100 h-8 w-8 top-3.5 -ml-3.5 z-[42] rounded-full shadow-md fixed justify-center items-center hidden tablet:flex'>
              {collapsed ? <NarrowRightIcon /> : <NarrowLeftIcon />}
            </button>
            <div className='fixed justify-between bg-white z-40 px-4 shadow-md tablet:relative tablet:z-30 tablet:shadow-none tablet:justify-end flex tablet:px-8 w-full h-16 items-center gap-2 text-sm'>
              <div className='block tablet:hidden'><Button onClick={() => setIsShowDrawer(v => !v)} icon='burger' intent='light' dimension='tiny' rounded='standard' /></div>
              <div className='flex'>
                <Link href={EXTERNAL_LINK.GITHUB} target='_blank'>
                  <Button icon='github' intent='default' dimension='small' rounded='full'>
                    <span className='hidden tablet:block'>show on github</span>
                  </Button>
                </Link>
                <Link href={EXTERNAL_LINK.DOCS} target='_blank'>
                  <Button icon='file' intent='default' dimension='small' rounded='full'>
                    <span className='hidden tablet:block'>docs</span>
                  </Button>
                </Link>
              </div>
            </div>
          </header>
          <main className='w-full relative min-h-screen'>
            {children}
          </main>
          <footer>
            <span className='flex justify-center tablet:justify-end m-6 text-sm text-gray-500'>&copy; 2023 By Imron Rosadi | All Right Reserved</span>
          </footer>
        </div>
      </div >
    </Fragment >
  )
}

export default AuthLayout

