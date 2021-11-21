/* 
  When a view needs to make a HTTP call it should go through a Service ( such as LoginService.js )
  The service classes will use one of the responses in this util to ensure it's handling data & errors consistantly.
*/
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
