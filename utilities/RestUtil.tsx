interface MyResponse {
  json: any;
  response: Response;
}

export const getAsync = async (path: string) => {
  const result = await request(path, 'GET');
  return result;
};

export const postAsync = async (path: string, body: string) => {
  const result = await request(path, 'POST', body);
  return result;
};

export const deleteAsync = async (path: string, body: string) => {
  const result = await request(path, 'DELETE', body);
  return result;
};

export const request = async (
  path: string,
  method: string,
  body: string = '',
) => {
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
};

export const handleResponse = async (
  response: Response,
): Promise<MyResponse> => {
  let json = {};
  try {
    const jsonResponse = await response.text();
    json = JSON.parse(jsonResponse);
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
};
