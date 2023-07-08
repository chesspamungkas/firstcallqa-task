export interface IUser {
    some(arg0: (element: any) => boolean): unknown;
    id: number;
    username: string,
    firstname: string,
    lastname: string
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
}

export interface IUserState {
    list: IUser[];
    listStatus: ApiStatus;
    createUserFormStatus: ApiStatus;
    updateUserFormStatus: ApiStatus;
}

export interface IUserForm {
    username: string;
    firstname: string;
    lastname: string;
}

export interface IUserFormUpdate {
    firstname: string;
    lastname: string;
}


export interface IUpdateUserActionProps {
    id: number;
    data: IUserFormUpdate;
}
  