import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryData } from '$/services'
import { ENDPOINT } from '$/constants'
import { GetUserResponse } from '$/types'
import { useState } from 'react'

type UserProps = {
  userId?: number,
}

const useUser = (arg?: UserProps) => {

  const [count] = useState(0)
  const [data] = useState<GetUserResponse[]>([])

  const { data: user, refetch, isLoading, error } = useQuery<GetUserResponse, AxiosError>({
    queryKey: ['getUserById', arg?.userId],
    enabled: false,
    queryFn: async ({ queryKey }) => {
      const [, userId] = queryKey

      return await queryData({
        url: ENDPOINT.USER.replace('{:id}', userId as string),
      })
    },
    retry: false,
  })

  const getUser = async () => {
    const result = await refetch()

    if (result && result.data) {
      return result.data
    }
    return undefined
  }

  return {
    count,
    data,
    user,
    isLoading,
    error,
    getUser
  }
}

export default useUser
