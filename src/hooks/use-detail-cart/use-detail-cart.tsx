import { useEffect, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { GetCartResponse } from '$/types'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'

const DEFAULT_LIMIT = 100


type UseDetailCartProps = {
  cartId: number,
  limit?: number
  initialPage?: number
}

const useDetailCart = (arg?: UseDetailCartProps) => {

  const { limit = DEFAULT_LIMIT, initialPage = 1, cartId = 1 } = arg || {}

  const [data, setData] = useState<GetCartResponse['products']>()
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [discountedAmount, setDiscountedAmount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [amount, setAmount] = useState(0)
  const [userId, setUserId] = useState(0)

  const [page, setPage] = useState(0)
  const [error, setError] = useState<AxiosError | null>(null)

  const { fetchNextPage, data: carts, error: useInfiniteError } = useInfiniteQuery<GetCartResponse, AxiosError>({
    queryKey: ['getDetailCarts'],
    enabled: false,
    queryFn: async ({ pageParam }) => {

      const { page: currentPage = initialPage, cartId: cartIdParams = cartId } = pageParam || {}

      const page = currentPage > 0 ? currentPage : 1
      const skip = ((page - 1) * limit)

      setPage(page)

      return await queryData({
        url: ENDPOINT.CART.replace('{:id}', String(cartIdParams)),
        params: {
          skip,
          limit,
        }
      })
    },
    getNextPageParam: (_lastPage, pages) => {
      const nextPage = pages.length

      return nextPage
    },
    retry: false,
  })

  useEffect(() => {
    if (carts) {
      const total = carts.pages[carts.pages.length - 1].total
      const discounted = carts.pages[carts.pages.length - 1].discountedTotal

      const discount = parseFloat(((total - discounted) / total * 100).toFixed(2))

      setData(carts.pages[carts.pages.length - 1].products)
      setUserId(carts.pages[carts.pages.length - 1].userId)
      setCount(carts.pages[carts.pages.length - 1].totalProducts)
      setQuantity(carts.pages[carts.pages.length - 1].totalQuantity)
      setAmount(total)
      setDiscountedAmount(discounted)
      setDiscount(discount)
      setIsLoading(false)
    }
  }, [carts])

  useEffect(() => {
    setError(useInfiniteError ?? useInfiniteError)
  }, [useInfiniteError])

  type HandleFetchPageProps = {
    page?: number,
    cartId: number,
  }

  const handleFetchPage = ({ page = 1, cartId }: HandleFetchPageProps) => {
    setIsLoading(true)
    fetchNextPage({ pageParam: { page, cartId } })
  }

  return {
    count,
    data,
    amount,
    discount,
    discountedAmount,
    quantity,
    isLoading,
    error,
    limit,
    page,
    userId,
    fetchPage: handleFetchPage
  }
}

export default useDetailCart
