import { AxiosError } from 'axios'
import md5 from 'md5'

export const baseURL = 'http://api.valantis.store:40000/'

export const token = md5(
  'Valantis_' + new Date().toISOString().replace(/-/g, '').slice(0, 8)
)

export const params = { headers: { 'X-Auth': token } }

export const method = 'POST'

export const retryParams = {
  retries: 10,
  retryDelay: () => 1000,
  retryCondition: (error: AxiosError) => Number(error?.response?.status) > 499,
  onRetry: () => console.log('retrying'),
}