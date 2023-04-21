import { useState, useContext, useMemo, useRef, useEffect } from "react";
import axios from "axios";
import { AxiosContext } from "../context/Axios";

export const useAxios = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const contextInstance = useContext(AxiosContext);
  const instance = useMemo(() => {
    return contextInstance || axios;
  }, [contextInstance]);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };


    const processRequest = async (url: string, method: string, payload: any) => {
      try {
        setLoading(true);
        const response = await instance.request({
          signal: controllerRef.current.signal,
          data: payload,
          method,
          url,
        });

        setData(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  return { cancel, data, error, loading, processRequest };
};