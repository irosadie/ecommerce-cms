import axios from './interceptor'

type MutateDataProps = {
  url?: string,
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  payload?: object,
}

const mutateData = async<T>({ method = 'POST', url,  payload }: MutateDataProps) => {
  return axios<T>({
    method,
    url,
    data: payload
  })
}
  
export default mutateData
