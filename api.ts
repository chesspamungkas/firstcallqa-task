import { IUser, IUserForm, IUserFormUpdate } from "./types/users";

const baseUrl = 'http://localhost:8000';

export const getAllUsers = async (): Promise<IUser[]> => {
    const res = await fetch(`${baseUrl}/users`, {cache: 'no-store'});
    const users = await res.json();
    return users;
};
  
export const createUser = async (user: IUserForm): Promise<IUserForm> => {
    const res = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const newUser = await res.json();
    return newUser;
};

export const updateUser = async (id: number, user: IUserFormUpdate): Promise<void> => {
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    const updatedUser = await res.json();
    return updatedUser;
};

export const deleteUser = async (id: number): Promise<void> => {
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getUserById = async (id: number): Promise<void> => {
    const res = await fetch(`${baseUrl}/users/${id}`, {
        method: 'GET'
    });
    const getUserById = await res.json();
    return getUserById;
};

export const checkUsername = async (username: string): Promise<void> => {
    const res = await fetch(`${baseUrl}/users/${username}`, {
        method: 'GET'
    });
    const checkUsername = await res.json();
    console.log('asdasdasdasdasd'+checkUsername);
    // return checkUsername;
};
