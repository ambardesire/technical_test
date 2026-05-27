import { useUsersStore } from "../store/users";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsersList = async () => {
  const { setUsersLoading, setUsersError, setUsersList } =
    useUsersStore.getState();

  try {
    setUsersLoading(true);
    setUsersError(null);
    const response = await fetch(`${BASE_URL}/users`);

    setUsersList(await response.json());
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "There was an error trying to fetch the users.",
    );
  } finally {
    setUsersLoading(false);
  }
};

export const getSingleUser = async (userId: string) => {
  const { setUsersLoading, setUsersError, setCurrentUser } =
    useUsersStore.getState();

  try {
    setUsersLoading(true);
    setUsersError(null);
    const response = await fetch(`${BASE_URL}/users/${userId}`);

    setCurrentUser(await response.json());
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "There was an error trying to fetch the user details.",
    );
  } finally {
    setUsersLoading(false);
  }
};
