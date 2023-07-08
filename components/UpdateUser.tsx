"use client";

import { FunctionComponent, useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IUpdateUserActionProps, IUser, IUserFormUpdate } from "@/types/users";
import { updateUserAction } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import Modal from './Modal';

const UpdateUser: FunctionComponent<IUser> = (user: IUser) => {
  const [username] = useState(user.username);
  const [firstname] = useState(user.firstname);
  const [lastname] = useState(user.lastname);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isMutating, setIsMutating] = useState(false);

  const dispatch = useAppDispatch();
  
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required')
        .min(3, 'First Name must be at least 3 characters')
        .max(55, 'First Name must not exceed 55 characters'),
    lastname: Yup.string()
        .required('Last Name is required')
        .max(55, 'Last Name must not exceed 55 characters')
  });

  const formOptions = { 
    resolver: yupResolver(validationSchema),
    defaultValues: useMemo(() => {
      return user;
    }, [])
  };
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm(formOptions);

  const onSubmit = handleSubmit(async (data: IUserFormUpdate = { firstname, lastname }) => {
    setIsMutating(true);

    const dirtyFormData: IUpdateUserActionProps = {
      id: user.id,
      data
    };
    dispatch(updateUserAction(dirtyFormData));

    setIsMutating(false);
    // router.refresh();
    setModalOpen(false);
  });
  
  function handleChange() {
    setModalOpen(!modalOpen);
  }

  return (
    <div>
      <a href="#" className="font-medium text-green hover:underline">
        <Tooltip title="Edit">
            <IconButton onClick={handleChange}>
                <EditIcon className="tex-blue-500" />
            </IconButton>
        </Tooltip>
      </a>

      {/* <input
        type="checkbox"
        checked={modalOpen}
        onChange={handleChange}
        className="modal-toggle"
      /> */}

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div>
          <form onSubmit={onSubmit}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Username</span>
                </label>
                <input
                disabled
                value={username}
                type="text" placeholder="Username" className={`w-full input input-primary`} />
            </div>
            {/* <div className="invalid-feedback">{errors.username?.message}</div> */}
            <div>
                <label className="label">
                    <span className="text-base label-text">First Name</span>
                </label>
                <input
                // ref={register}
                {...register('firstname')}
                // value={firstname}
                onChange={(e) => setValue("firstname", e.target.value)}
                type="text" placeholder="First Name" className={`w-full input input-bordered ${errors.firstname ? "is-invalid" : "input-primary"}`} />
            </div>
            {/* <div className="invalid-feedback">{errors.firstname?.message}</div> */}
            <div>
                <label className="label">
                    <span className="text-base label-text">Last Name</span>
                </label>
                <input
                {...register('lastname')}
                // value={lastname}
                onChange={(e) => setValue("lastname", e.target.value)}
                type="text" placeholder="Last Name" className={`w-full input input-bordered ${errors.lastname ? "is-invalid" : "input-primary"}`} />
            </div>
            {/* <div className="invalid-feedback">{errors.lastname?.message}</div> */}
            <div className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{!isMutating ? "Update" : "Updating..."}</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default UpdateUser