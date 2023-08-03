import { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { GetProductResponse } from '$/types'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'

const DEFAULT_LIMIT = 10
const DEFAULT_LIMIT_ALL_DATA = 999


type UseProductProps = {
  limit?: number
  initialPage?: number
  initialQuery?: string
}

const useProduct = (arg?: UseProductProps) => {

  const { limit = DEFAULT_LIMIT, initialPage = 1, initialQuery = '' } = arg || {}

  const [data, setData] = useState<GetProductResponse['products']>()
  const [isLoading, setIsLoading] = useState(true)
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [error, setError] = useState<AxiosError | null>(null)

  const { fetchNextPage, data: products, error: useInfiniteError } = useInfiniteQuery<GetProductResponse, AxiosError>({
    queryKey: ['getProducts'],
    enabled: false,
    queryFn: async ({ pageParam }) => {

      const { page: currentPage = initialPage, query = initialQuery } = pageParam || {}
      const page = currentPage > 0 ? currentPage : 1
      const skip = ((page - 1) * limit)

      setPage(page)

      return await queryData({
        url: ENDPOINT.PRODUCT_SEARCH,
        params: {
          skip,
          limit,
          q: query,
        }
      })
    },
    getNextPageParam: (_lastPage, pages) => {
      const nextPage = pages.length

      return nextPage
    },
    retry: false,
  })

  const { refetch, error: useQueryError } = useQuery<GetProductResponse, AxiosError>({
    queryKey: ['getAllProducts'],
    enabled: false,
    queryFn: async () => {

      return await queryData({
        url: ENDPOINT.PRODUCTS,
        params: {
          limit: DEFAULT_LIMIT_ALL_DATA,
        }
      })
    },
    retry: false,
  })

  useEffect(() => {
    if (products) {
      setData(products.pages[products.pages.length - 1].products)
      setCount(products.pages[products.pages.length - 1].total)
      setIsLoading(false)
    }
  }, [products])

  useEffect(() => {
    setError(useInfiniteError ?? useInfiniteError)
  }, [useInfiniteError, useQueryError])


  // masukkan ke utils
  const filterByMultipleKeys = (data: GetProductResponse['products'], { category, brands = [], query, prices }: Omit<HandleFetchPageProps, 'page' | 'prices' | 'brands'> & {
    prices?: [number, number], brands?: string[]
  }) => {
    return data.filter(item => {
      const brandMatch = brands.length === 0 || brands.includes(item.brand)
      const categoryMatch = category ? item.category === category : true
      const queryMatch =
        !query ||
        (item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) &&
          (brands.length > 0 &&
            brands.some(brand => item.brand.toLowerCase().includes(brand.toLowerCase()))))

      const priceMatch =
        prices === undefined ||
        (item.price >= prices[0] && item.price <= prices[1])

      return brandMatch && categoryMatch && queryMatch && priceMatch
    })
  }

  const fetchNextPageLocally = async ({ page = 1, query, category, brands, prices }: HandleFetchPageProps) => {

    const response = await refetch()

    const products = response.data?.products

    const priceRange = prices && prices.split(',')
    let price: [number, number] | undefined = undefined

    if (priceRange && !isNaN(parseFloat(priceRange[0])) && !isNaN(parseFloat(priceRange[1]))) {
      price = [parseFloat(priceRange[0]), parseFloat(priceRange[1])]
    }

    const productList = filterByMultipleKeys(products as GetProductResponse['products'], {
      query,
      category,
      brands: brands ? brands.split(',') : [],
      prices: price
    })

    const itemsPerPage = DEFAULT_LIMIT
    const startIndex = (Number(page) - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    const showedData = productList.slice(startIndex, endIndex)

    setPage(page)
    setCount(productList.length)
    setData(showedData)
    setIsLoading(false)
  }

  type HandleFetchPageProps = {
    page?: number,
    query?: string,
    category?: string,
    brands?: string,
    prices?: string,
  }

  const handleFetchPage = ({ page = 1, query, brands, prices, category }: HandleFetchPageProps) => {
    setIsLoading(true)
    if (brands || prices || category) {
      fetchNextPageLocally({ page: page || 1, query, brands, prices, category })
      return
    }
    fetchNextPage({ pageParam: { page, query } })
  }

  return {
    count,
    data,
    isLoading,
    error,
    limit,
    page,
    fetchPage: handleFetchPage,
  }
}

export default useProduct
