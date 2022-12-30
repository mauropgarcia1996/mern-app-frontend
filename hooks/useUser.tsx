import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { AxiosInstance } from "../config/axiosConfig";
import { useUserStore } from "../stores/userStore";

export default function useUser() {
  const router = useRouter();

  // const [user, setUser] = useReducer(
  //   (data, partialData) => ({
  //     ...data,
  //     ...partialData,
  //   }),
  //   { user: null, error: null, loading: true }
  // );

  const { user, update } = useUserStore((state) => state);

  useEffect(() => {
    AxiosInstance({
      method: "get",
      url: "/users/test",
    })
      .then((res) => {
        update(res.data);
      })
      .catch((err) => {
        update(null);
        router.push("/login");
      });
  }, []);

  return user;
}
