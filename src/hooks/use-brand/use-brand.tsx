import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'
import { GetBrandResponse } from '$/types'

type UseBrandProps = { title: string, category: string }

const useBrand = () => {

  const [count, setCount] = useState(0)
  const [data, setData] = useState<UseBrandProps[]>()

  const { data: brands, isLoading, error } = useQuery<GetBrandResponse, AxiosError>({
    queryKey: ['getBrands'],
    enabled: true,
    queryFn: async () => {

      return await queryData({
        url: ENDPOINT.PRODUCTS,
        params: {
          limit: 999,
          select: 'brand,category'
        }
      })
    },
    retry: false,
  })

  useEffect(() => {
    if (brands) {
      const tmpBrands: UseBrandProps[] = []

      brands.products.map(value => {
        const check = tmpBrands.find(val => val.title === value.brand)

        if (!check) {
          tmpBrands.push({ title: value.brand, category: value.category })
        }
      })

      setData(tmpBrands.sort((a, b) => (a.category || '').localeCompare(b.category || '')))
      setCount(brands.products.length)
    }
  }, [brands])

  return {
    count,
    data,
    isLoading,
    error
  }
}

export default useBrand
