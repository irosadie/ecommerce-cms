import React from 'react'
import { CartIcon, ProductIcon } from '$/components/icon'

const MENU = [
  {
    key: 1,
    label: 'Products',
    path: '/auth/products',
    activeIcon: <ProductIcon color='#fff' />,
    deactiveIcon: <ProductIcon />,
  },
  {
    key: 2,
    label: 'Carts',
    path: '/auth/carts',
    activeIcon: <CartIcon color='#fff' />,
    deactiveIcon: <CartIcon />,
  },
]

export default MENU
