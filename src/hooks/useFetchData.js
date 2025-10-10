import { useEffect, useState } from "react";
function useFetchData(api, handleError, closeFetch = false, option) {
  const [status, setStatus] = useState("readyFetch");
  const [errMessage, setErrMessage] = useState("");
  const [apiData, setApiData] = useState(null);
  useEffect(
    function () {
      if (closeFetch) return;

      //? Abort Var
      const controller = new AbortController();

      //? Async Function For fetch Data
      async function getData() {
        try {
          setStatus("loading");
          const res = await fetch(api, {
            signal: controller.signal,
            ...option,
          });
          if (!res.ok) throw new Error(`Check your Internet: ${res.status}`);

          const data = await res.json();
          const errMessage = handleError?.(data);
          if (errMessage) throw new Error(errMessage);

          setApiData(data);
          setStatus("finish");
        } catch (err) {
          if (err.name !== "AbortError") {
            setStatus("error");
            setErrMessage(err.message);
          }
        }
      }
      getData();
      return () => controller.abort();
    },
    [api, closeFetch, option, handleError]
  );
  return [apiData, status, errMessage];
}
export default useFetchData;
