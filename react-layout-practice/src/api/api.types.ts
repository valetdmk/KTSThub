export type ApiResponse<T> = {
  data: T | null
  error: string | null
  status: number
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
