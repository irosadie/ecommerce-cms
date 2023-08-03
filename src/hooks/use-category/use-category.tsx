import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'


const useCategory = () => {

  const [count, setCount] = useState(0)

  const { data: categories, isLoading, error } = useQuery<string[], AxiosError>({
    queryKey: ['getCategories'],
    enabled: true,
    queryFn: async () => {

      return await queryData({
        url: ENDPOINT.CATEGORIES,
      })
    },
    retry: false,
  })

  useEffect(() => {
    if (categories) {
      setCount(categories.length)
    }
  }, [categories])

  return {
    count,
    data: categories?.sort(),
    isLoading,
    error
  }
}

export default useCategory
