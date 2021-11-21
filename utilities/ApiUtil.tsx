interface ApiErrorResponse {
  code: string;
  data: any;
}
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorResponse;
}

export function successfulResponse<T extends any>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

export function errorResponse<T extends any>(
  errorCode: string,
  data: any = null,
): ApiResponse<T> {
  return {
    success: false,
    error: {
      code: errorCode,
      data: data,
    },
  };
}
