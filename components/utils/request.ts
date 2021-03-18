export const throwErrorOnNotOk = (response: Response) =>
  !response.ok ? Promise.reject(response) : response;

export const parseJson = (response: Response) => response.json();

export const toQueryString = (queryParams: Record<string, any>) =>
  Object.entries(queryParams)
    .map((param) => param.join('='))
    .join('&');
