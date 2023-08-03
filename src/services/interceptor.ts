import { env } from '$/config'
import axiosClient, { type AxiosRequestConfig } from 'axios'

/**
 * Creates an initial 'axios' instance with custom settings.
 */

const baseUrl = env.baseURL

const instance = axiosClient.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  async (res) => {
    const { data } = res.data

    if (data) return data
    return res.data
  },
  (error) => Promise.reject(error)
)
/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axios = <T>(cfg: AxiosRequestConfig) => instance.request<unknown, T>(cfg)

export default axios
