import { useEffect, useState } from "react";
function useFetchData(api, handleError, closeFetch = false, option) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState(null);
  useEffect(
    function () {
      if (closeFetch) return;

      //? Abort Var
      const controller = new AbortController();

      //? Async Function For fetch Data
      async function getData() {
        setIsLoading(true);
        try {
          const res = await fetch(api, {
            signal: controller.signal,
            ...option,
          });
          if (!res.ok) throw new Error(`Check your Internet: ${res.status}`);

          const data = await res.json();
          const errMessage = handleError?.(data);
          if (errMessage) throw new Error(errMessage);

          setApiData(data);
          setError(null);
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
    [api, closeFetch]
  );
  return [apiData, isLoading, error];
}

export default useFetchData;
