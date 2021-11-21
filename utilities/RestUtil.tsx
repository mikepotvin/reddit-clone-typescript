interface MyResponse {
  json: any;
  response: Response;
}

export function getAsync(path: string) {
  return request(path, 'GET');
}

export function postAsync(path: string, body: string) {
  return request(path, 'POST', body);
}

export function deleteAsync(path: string, body: string) {
  return request(path, 'DELETE', body);
}

export async function request(path: string, method: string, body: string = '') {
  try {
    const data = await fetch(path, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });
    return handleResponse(data);
  } catch (e) {
    throw e;
  }
}

export async function handleResponse(response: Response): Promise<MyResponse> {
  let json = {};
  try {
    json = JSON.parse(await response.text());
  } catch (e) {
    json = {};
  }

  if (response.ok) {
    return {
      json,
      response,
    };
  }

  const error = {
    status: response.status,
    message: response.statusText,
    body: json,
  };

  throw error;
}
