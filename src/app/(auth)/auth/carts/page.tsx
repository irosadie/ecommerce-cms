/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useState } from 'react'
import { TableProps } from '$/components/table'
import { PageInfo } from '$/components/page-info'
import { Wrapper } from '$/components/wrapper'
import { Container } from '$/components/container'
import { notFound, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ContentSection } from '$/sections/carts'
import { currencyFormat } from '$/utils'
import { PriceInfo } from '$/components/price-info'
import { Card } from '$/components/card'
import { useDetailCart } from '$/hooks/use-detail-cart'
import { Badge } from '$/components/badge'
import { useUser } from '$/hooks/use-user'
import Select from 'react-select'
import { useCart } from '$/hooks/use-cart'
import { DetailCartSection } from '$/sections/carts/detail'

const THEAD = [
  {
    title: 'ID',
  },
  {
    title: 'Product',
  },
  {
    title: 'Price',
  },
  {
    title: 'Qtty',
  },
  {
    title: 'Amount',
  },
  {
    title: 'Discount (%)',
    className: 'flex-1 text-right',
  },
]

const ProductPage = () => {

  const searchParams = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  const id = searchParams?.get('id')
  const page = searchParams?.get('page')

  const [dataTabel, setDataTabel] = useState<TableProps['data']>()

  const { dataSelect } = useCart()

  const {
    page: currentPage,
    data: products,
    isLoading,
    count,
    amount,
    discountedAmount,
    discount,
    quantity,
    limit,
    userId,
    error,
    fetchPage,
  } = useDetailCart({
    initialPage: Number(page ?? 1),
    cartId: Number(id)
  })

  const { getUser, user } = useUser({ userId })

  useEffect(() => {

    if (dataSelect && dataSelect.length <= 0) {
      notFound()
    }

    if (dataSelect && dataSelect.length > 0 && !id) {
      const params = new URLSearchParams(searchParams?.toString())

      params.delete('page')
      params.set('id', dataSelect[0].value as string)
      return router.replace(`${path}?${params}`)
    }

  }, [dataSelect])

  useEffect(() => {
    if (page || id) {
      fetchPage({
        page: Number(page),
        cartId: Number(id)
      })
    }
  }, [page, id])

  useEffect(() => {

    if (products) {
      setDataTabel([])
      const tData: TableProps['data'] = []

      products.map(async (val) => {

        tData.push({
          data: [
            {
              possition: 'left',
              value: `#${val.id}`,
            },
            {
              possition: 'left',
              className: 'font-semibold',
              value: `${val.title}`,
            },
            {
              possition: 'left',
              className: 'font-semibold',
              value: currencyFormat({ amount: val.price, prefix: '$' }),
            },

            {
              possition: 'left',
              className: 'font-semibold',
              value: `${val.quantity}`,
            },
            {
              possition: 'left',
              className: 'font-medium',
              value: <PriceInfo
                realPrice={currencyFormat({ amount: val.discountedPrice, prefix: '$' })}
                priceCrossedOut={currencyFormat({ amount: val.total, prefix: '$' })}
              />,
            },
            {
              possition: 'right',
              value: `${val.discountPercentage}% `,
            },
          ]
        })
      })
      setDataTabel(tData)
      getUser()
    }
  }, [products])

  const handlePageChanged = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString())

    params.set('page', String(page))
    router.replace(`${path}?${params}`)
  }

  const handleOnCartChange = ({ value }: { value: string | undefined }) => {
    if (value) {
      const params = new URLSearchParams(searchParams?.toString())

      params.delete('page')
      params.set('id', value as string)
      router.replace(`${path}?${params}`)
    }
  }

  useEffect(() => {
    if (error && error.response?.status === 404) {
      return notFound()
    }
  }, [error])

  return (
    <Container>
      <Wrapper>
        <PageInfo
          title='Cart Items'
          breadcrumb={[{ title: 'Home' }, { title: 'Cart Items' }]}
        />

        <DetailCartSection
          selectCartProps={{
            options: dataSelect,
            onChange: (val) => handleOnCartChange({ value: val?.value }),
            value: dataSelect && dataSelect.filter(item => item.value === id)
          }}
          isLoading={!user || isLoading}
          username={user?.username}
          fullname={(`${user?.firstName} ${user?.maidenName} ${user?.lastName}`).replace('  ', ' ')}
          amount={amount}
          discount={discount}
          discountedAmount={discountedAmount}
          quantity={quantity}
          total={count}
        />

        <ContentSection
          tableProps={{
            thead: THEAD,
            data: (dataTabel || []),
            count: count,
            currentPage: currentPage,
            limit: limit,
            isLoading: isLoading,
            onPageChange: handlePageChanged,
          }}
        />
      </Wrapper>
    </Container >
  )
}

export default ProductPage
