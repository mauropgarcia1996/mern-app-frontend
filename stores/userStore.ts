import create from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

interface UserState {
  user: User | null;
  update: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        update: (user) => set((state) => ({ user: user })),
      }),
      { name: "user-storage" }
    )
  )
);
