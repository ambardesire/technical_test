import { create } from "zustand";
import type { User } from "../types/user";

interface UsersStore {
  usersList: User[];
  currentUser: User | null;
  usersLoading: boolean;
  usersError: string | null;
  setUsersList: (users: User[]) => void;
  setCurrentUser: (user: User) => void;
  setUsersLoading: (loading: boolean) => void;
  setUsersError: (error: string | null) => void;
  resetUser: () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  usersList: [],
  setUsersList: (users) =>
    set({
      usersList: users,
    }),
  currentUser: null,
  setCurrentUser: (user) =>
    set({
      currentUser: user,
    }),
  usersLoading: false,
  setUsersLoading: (loading) =>
    set({
      usersLoading: loading,
    }),
  usersError: null,
  setUsersError: (error) =>
    set({
      usersError: error,
    }),
  resetUser: () =>
    set({
      currentUser: null,
      usersLoading: false,
      usersError: null,
    }),
}));
