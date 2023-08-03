import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'
import { GetAllCartsResponse } from '$/types'

type DataSelectProps = { value: string, label: string }

const useCart = () => {

  const [count, setCount] = useState(0)
  const [data, setData] = useState<number[]>()
  const [dataSelect, setDataSelect] = useState<DataSelectProps[]>()

  const { data: carts, isLoading, error } = useQuery<GetAllCartsResponse, AxiosError>({
    queryKey: ['getCarts'],
    enabled: true,
    queryFn: async () => {

      return await queryData({
        url: ENDPOINT.CARTS,
        params: {
          limit: 999,
        }
      })
    },
    retry: false,
  })

  useEffect(() => {
    if (carts) {
      const tmpCarts = carts.carts.map(item => item.id)

      const tmpDataSelect = carts.carts.map(item => ({ value: String(item.id), label: `Cart #${item.id} (${item.totalProducts} item)` }))

      setData(tmpCarts)
      setCount(tmpCarts.length)
      setDataSelect(tmpDataSelect)
    }
  }, [carts])

  return {
    count,
    data,
    dataSelect,
    isLoading,
    error
  }
}

export default useCart
