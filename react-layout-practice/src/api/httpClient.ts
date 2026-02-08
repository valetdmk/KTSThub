import type { ApiResponse, HttpMethod } from './api.types'
import { ApiError, NetworkError, AuthError, TimeoutError } from './api.errors'
import { authStore } from '../entities/auth.store'

const BASE_URL = 'https://example.com/api'
const TIMEOUT = 8000

const getHeaders = () => {
  const token = authStore.getToken()

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request<T>(
  url: string,
  method: HttpMethod,
  body?: unknown
): Promise<ApiResponse<T>> {

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT)

  try {

    const response = await fetch(BASE_URL + url, {
      method,
      headers: getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    // ✅ Обработка HTTP ошибок
    if (!response.ok) {

      if (response.status === 401 || response.status === 403) {
        throw new AuthError('Ошибка авторизации', response.status)
      }

      if (response.status >= 400 && response.status < 500) {
        throw new ApiError('Ошибка клиента', response.status)
      }

      if (response.status >= 500) {
        throw new ApiError('Ошибка сервера', response.status)
      }
    }

    const data = await response.json()

    return {
      data,
      error: null,
      status: response.status,
    }

  } catch (error: any) {

    if (error.name === 'AbortError') {
      const timeoutError = new TimeoutError('Превышено время ожидания', 0)

      return {
        data: null,
        error: timeoutError.message,
        status: timeoutError.status,
      }
    }

    if (error instanceof ApiError) {
      return {
        data: null,
        error: error.message,
        status: error.status,
      }
    }

    const networkError = new NetworkError('Проблемы с сетью', 0)

    return {
      data: null,
      error: networkError.message,
      status: networkError.status,
    }
  }
}

export const api = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, body: unknown) => request<T>(url, 'POST', body),
  put: <T>(url: string, body: unknown) => request<T>(url, 'PUT', body),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
}
