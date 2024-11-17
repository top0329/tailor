import { useRouter } from "next/navigation";

export { useFetch };

function useFetch() {
  const router = useRouter();

  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    delete: request("DELETE"),
  };

  function request(method: string) {
    return (url: string, body?: any) => {
      const requestOptions: any = { method };
      if (body) {
        requestOptions.headers = { "Content-Type": "application/json" };
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(url, requestOptions).then(handleResponse);
    };
  }

  async function handleResponse(response: Response) {
    const isJson = response.headers
      ?.get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        router.push("/");
      }

      // get error message from body or default to response status
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  }
}
