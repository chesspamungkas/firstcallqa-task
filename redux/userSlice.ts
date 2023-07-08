import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastError, toastSuccess } from "../components/ToastifyConfig";
import {
  ApiStatus,
  IUpdateUserActionProps,
  IUserForm,
  IUserState,
} from "@/types/users";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  checkUsername
} from "@/api";

const initialState: IUserState = {
  list: [],
  listStatus: ApiStatus.ideal,
  createUserFormStatus: ApiStatus.ideal,
  updateUserFormStatus: ApiStatus.ideal,
};

export const getUserListAction = createAsyncThunk(
  "user/getUserListAction",
  async () => {
    const response = await getAllUsers();
    return response;
  }
);

export const createUserAction = createAsyncThunk(
  "user/createUserAction",
  async (data: IUserForm) => {
    const response = await createUser(data);
    return response;
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUserAction",
  async (id: number) => {
    await deleteUser(id);
    return id;
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUserAction",
  async ({ id, data }: IUpdateUserActionProps) => {
    const response = await updateUser(id, data);
    return response;
  }
);

export const getUserByIdAction = createAsyncThunk(
  "user/getUserByIdAction",
  async (id: number) => {
    const response = await getUserById(id);
    return response;
  }
);

export const checkUsernameAction = createAsyncThunk(
  "user/checkUsernameAction",
  async (username: string) => {
    const response = await checkUsername(username);
    console.log('response'+response)
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetCreateListStatus: (state) => {
      state.createUserFormStatus = ApiStatus.ideal;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserListAction.pending, (state) => {
      state.listStatus = ApiStatus.loading;
    });
    builder.addCase(getUserListAction.fulfilled, (state, action) => {
      state.listStatus = ApiStatus.ideal;
      state.list = action.payload;
    });
    builder.addCase(getUserListAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });
    builder.addCase(createUserAction.pending, (state) => {
      state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(createUserAction.fulfilled, (state) => {
      state.createUserFormStatus = ApiStatus.success;
      toastSuccess("User created");
    });
    builder.addCase(createUserAction.rejected, (state) => {
      state.createUserFormStatus = ApiStatus.error;
      toastSuccess("Error while creating user");
    });
    builder.addCase(deleteUserAction.fulfilled, (state, action) => {
      const newList = state.list.filter((x) => x.id !== action.payload);
      state.list = newList;
    });
    builder.addCase(updateUserAction.pending, (state) => {
      state.updateUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(updateUserAction.fulfilled, (state) => {
      state.updateUserFormStatus = ApiStatus.ideal;
      toastSuccess("User updated");
    });
    builder.addCase(updateUserAction.rejected, (state) => {
      state.updateUserFormStatus = ApiStatus.error;
      toastError("Error while updating user");
    });
    builder.addCase(getUserByIdAction.rejected, (state) => {
      state.updateUserFormStatus = ApiStatus.error;
    });
    builder.addCase(getUserByIdAction.fulfilled, (state) => {
      state.updateUserFormStatus = ApiStatus.ideal;
    });
    builder.addCase(checkUsernameAction.rejected, (state) => {
      state.listStatus = ApiStatus.error;
    });
    builder.addCase(checkUsernameAction.fulfilled, (state) => {
      state.listStatus = ApiStatus.ideal;
      // state.list = action.payload;
      // const isExist = state.list.find((item) => item.username === action.payload);
    });
  },
});

export default userSlice.reducer;
export const { resetCreateListStatus } = userSlice.actions;
