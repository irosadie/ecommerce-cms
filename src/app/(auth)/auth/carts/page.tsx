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

        <Card className='pb-8'>
          <div className='grid gap-y-2 tablet:flex justify-between border-b mb-4 p-4'>
            <div>
              <h2 className='font-medium text-lg'>Detail of Cart</h2>
            </div>
            <div className=''>
              <Select
                id="search"
                className='w-60'
                options={dataSelect}
                onChange={(val) => handleOnCartChange({ value: val?.value })}
                value={dataSelect && dataSelect.filter(item => item.value === id)}
              />
            </div>
          </div>
          <ul className='grid grid-col-1 tablet:grid-cols-2 gap-x-8 gap-y-3 text-sm p-4'>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Username</span>
                <p><span className='hidden tablet:inline'>:</span> @{user?.username}</p>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Full Name</span>
                <p><span className='hidden tablet:inline'>:</span> {`${user?.firstName} ${user?.maidenName} ${user?.lastName}`}</p>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Total</span>
                <p>: {count} Items</p>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Quantity Item</span>
                <span>: <Badge>{quantity}</Badge></span>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Amount</span>
                <span>: <s>{currencyFormat({ amount, prefix: '$' })}</s></span>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Discount (Avarage)</span>
                <span className='font-bold'>: {discount}%</span>
              </div>
            </li>
            <li>
              <div className='grid tablet:flex gap-y-2'>
                <span className='font-semibold tablet:w-1/2'>Discounted Amount</span>
                <span className='font-bold'>: {currencyFormat({ amount: discountedAmount, prefix: '$' })}</span>
              </div>
            </li>
          </ul>
        </Card>

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
