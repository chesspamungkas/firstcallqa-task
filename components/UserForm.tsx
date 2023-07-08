"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ApiStatus, IUpdateUserActionProps, IUser, IUserForm } from "@/types/users";
import { createUserAction, resetCreateListStatus, updateUserAction } from "@/redux/userSlice";
import { toastSuccess, toastError } from "./ToastifyConfig";

interface IProps {
  isEditForm?: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  user: IUser
}

const UserForm = (props: IProps) => {
  const { isEditForm, setModalOpen, user } = props;
  const [username, setUsername] = useState(user.username);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);

  // const userIdToEdit = useRef(parseInt(params.id || ""));
  // console.log('userIdToEdit'+user.id);
  // const userIdToEdit = user.id!;
  // console.log('userIdToEdit'+userId);
  const { list } = useAppSelector((state: RootState) => state.user);
  // const [userDataToView, setUserDataToView] = useState<IUser | null>(null);
  
  useEffect(() => {
    
    if (isEditForm) {
      
      // list of user
      // const userData = list.filter((x) => x.id === userIdToEdit);
      // alert(userIdToEdit)
      // if (userData.length) {
        setUsername(user.username);
        setFirstname(user.firstname);
        setLastname(user.lastname);
      // }
    }
  }, [isEditForm]);

  const { createUserFormStatus, updateUserFormStatus } = useAppSelector(
    (state: RootState) => state.user
  );
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters')
        .max(20, 'Username must not exceed 20 characters'),
    firstname: Yup.string()
        .required('First Name is required')
        .min(3, 'Username must be at least 3 characters')
        .max(55, 'Username must not exceed 55 characters'),
    lastname: Yup.string()
        .required('Last Name is required')
        .max(55, 'Last Name must not exceed 55 characters')
  });
  
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

  const router = useRouter();
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent) => {
    // const data: IUserForm = { name, email };
    e.preventDefault();

    const data: IUserForm = { username, firstname, lastname };

    if (username && firstname && lastname) {
      if (isEditForm) {
        const dirtyFormData: IUpdateUserActionProps = {
          id: user.id,
          data
        };
        dispatch(updateUserAction(dirtyFormData));
        setModalOpen(false);
      } else {
        const data: IUserForm = { username, firstname, lastname };
        dispatch(createUserAction(data));
        // isCloseModal(false)
      }
    } else {
      toastError("Please fill the form");
    }
  };

  useEffect(() => {
    if (createUserFormStatus === ApiStatus.success) {
      setUsername("");
      setFirstname("");
      setLastname("");
      dispatch(resetCreateListStatus());
      // reset();
      // setModalOpen(false);
      // router.refresh();
    }
  }, [createUserFormStatus]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
            <label className="label">
                <span className="text-base label-text">Username</span>
            </label>
            <input
            disabled={isEditForm ? true : false}
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setUsername(e.target.value);
            }}
            type="text" placeholder="Username" className={`w-full input input-primary ${errors.username ? "is-invalid" : ""}`} />
        </div>
        <div className="invalid-feedback">{errors.username?.message}</div>
        <div>
            <label className="label">
                <span className="text-base label-text">First Name</span>
            </label>
            <input 
            value={firstname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFirstname(e.target.value);
            }}
            type="text" placeholder="First Name" className={`w-full input input-bordered input-primary ${errors.firstname ? "is-invalid" : ""}`} />
        </div>
        <div className="invalid-feedback">{errors.firstname?.message}</div>
        <div>
            <label className="label">
                <span className="text-base label-text">Last Name</span>
            </label>
            <input 
            value={lastname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setLastname(e.target.value);
            }}
            type="text" placeholder="Last Name" className={`w-full input input-bordered input-primary ${errors.lastname ? "is-invalid" : ""}`} />
        </div>
        <div className="invalid-feedback">{errors.lastname?.message}</div>
        <div className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
            <button disabled={
              createUserFormStatus === ApiStatus.loading ||
              updateUserFormStatus === ApiStatus.loading
            } type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{isEditForm ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  )
}

export default UserForm