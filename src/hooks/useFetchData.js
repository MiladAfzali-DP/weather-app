import { useEffect, useState } from "react";
function useFetchData(api, handleError, closeFetch = false) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  useEffect(
    function () {
      setIsLoading(true);
      if (closeFetch) return;

      //? Abort Var
      const controller = new AbortController();

      //? Async Function For fetch Data
      async function getData() {
        try {
          const res = await fetch(api, { signal: controller.signal });
          if (!res.ok) throw new Error(`Check your Internet: ${res.message}`);

          const data = await res.json();
          const errMessage = handleError?.(data);
          if (errMessage) throw new Error(errMessage);
          setApiData(data);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      getData();
      return () => controller.abort();
    },
    [api, closeFetch, handleError]
  );
  return [apiData, isLoading, error];
}

export default useFetchData;
