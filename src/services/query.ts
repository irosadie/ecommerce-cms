import axios from './interceptor'

type QueryDataProps = {
  url: string,
  params?: object | string,
}

const queryData = async<T>({ url, params }: QueryDataProps) => {
	return axios<T>({
		method: 'GET',
		url,
		params
	})
}
  
export default queryData
