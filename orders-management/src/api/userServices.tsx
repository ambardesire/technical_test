import { useUsersStore } from "../store/users";
import type { User } from "../types/user";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getUsersList = async () => {
  const { setUsersLoading, setUsersError, setUsersList } =
    useUsersStore.getState();

  try {
    setUsersLoading(true);
    setUsersError(null);
    const response = await fetch(`${BASE_URL}/users`);

    if (!response.ok) {
      throw new Error(
        "Hubo un error al obtener los usuarios. Intenta de nuevo más tarde.",
      );
    }

    setUsersList(await response.json());
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al obtener los usuarios. Intenta de nuevo más tarde.",
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

    if (!response.ok) {
      throw new Error(
        "Hubo un error al obtener los detalles del usuario. Intenta de nuevo más tarde.",
      );
    }

    setCurrentUser(await response.json());
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al obtener los detalles del usuario. Intenta de nuevo más tarde.",
    );
  } finally {
    setUsersLoading(false);
  }
};

export const getCreateUser = async (user: User) => {
  const { setUsersLoading, setUsersError, setUsersList } =
    useUsersStore.getState();

  try {
    setUsersLoading(true);
    setUsersError(null);
    const response = await fetch(`${BASE_URL}/users}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(
        "Hubo un error al crear el usuario. Intenta de nuevo más tarde.",
      );
    }

    const updatedUsers: User[] = await response.json();
    setUsersList(updatedUsers);

    return updatedUsers;
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al crear el usuario. Intenta de nuevo más tarde.",
    );
  } finally {
    setUsersLoading(false);
  }
};

export const getUpdateUser = async (user: User, userId: string) => {
  const { setUsersLoading, setUsersError, setUsersList } =
    useUsersStore.getState();

  try {
    setUsersLoading(true);
    setUsersError(null);
    const response = await fetch(`${BASE_URL}/users}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(
        "Hubo un error al editar el usuario. Intenta de nuevo más tarde.",
      );
    }

    const updatedUsers: User[] = await response.json();
    setUsersList(updatedUsers);

    return updatedUsers;
  } catch (error) {
    setUsersError(
      error instanceof Error
        ? error.message
        : "Hubo un error al editar el usuario. Intenta de nuevo más tarde.",
    );
  } finally {
    setUsersLoading(false);
  }
};
