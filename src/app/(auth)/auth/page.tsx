/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RootAuth = () => {

  const router = useRouter()

  useEffect(() => {
    router.push('/auth/products')
    return
  }, [])
}

export default RootAuth
