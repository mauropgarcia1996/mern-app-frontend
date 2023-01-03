import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_URI,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { instance as AxiosInstance };
