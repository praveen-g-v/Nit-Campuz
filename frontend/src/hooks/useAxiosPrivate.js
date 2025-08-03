import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect, useMemo } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  // Create a memoized instance to prevent recreation on every render
  const axiosInstance = useMemo(() => {
    const instance = axiosPrivate;

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            auth?.accessToken || auth
          }`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        // Check for 401/403 and not a retry
        if (
          [401, 403].includes(error?.response?.status) &&
          !prevRequest?._retry
        ) {
          prevRequest._retry = true;

          try {
            const newAccessToken = await refresh();
            setAuth(newAccessToken);

            // Update the header
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            // Return a new instance of the request
            return instance(prevRequest);
          } catch (refreshError) {
            // If refresh fails, clear auth and reject
            setAuth(null);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return instance;
  }, [auth, refresh, setAuth]);

  return axiosInstance;
};

export default useAxiosPrivate;
