export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export class NetworkError extends ApiError {}
export class AuthError extends ApiError {}
export class TimeoutError extends ApiError {}
