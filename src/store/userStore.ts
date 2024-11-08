import { UserAuth } from "@/components/User/Auth.interfaces";
import { create, StoreApi, UseBoundStore } from "zustand";

export interface UserStoreState {
  userAuth: UserAuth | null;
  setUserAuth: (user: UserAuth) => void;
  clearUserAuth: () => void;
}

export const useUserStore: UseBoundStore<StoreApi<UserStoreState>> = create(
  (set) => ({
    userAuth: JSON.parse(localStorage.getItem("userAuth") as string) || null,
    setUserAuth: (userAuth: UserAuth) => {
      localStorage.setItem("userAuth", JSON.stringify(userAuth));
      set({ userAuth });
    },
    clearUserAuth: () => {
      localStorage.removeItem("userAuth");
      set({ userAuth: null });
    },
  })
);
