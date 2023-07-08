"use client";

import { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IUser, IUserForm } from '@/types/users';
import { createUserAction, checkUsernameAction, resetCreateListStatus } from "@/redux/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from './Modal';
import { toastError } from "./ToastifyConfig";
import { RootState } from "@/redux/store";

const AddUser = () => {
    const [username] = useState("");
    const [firstname] = useState("");
    const [lastname] = useState("");

    const { list } = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();


    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isMutating, setIsMutating] = useState(false);

    // const dispatch = useAppDispatch();
    
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        firstname: Yup.string()
            .required('First Name is required')
            .min(3, 'First Name must be at least 3 characters')
            .max(55, 'First Name must not exceed 55 characters'),
        lastname: Yup.string()
            .required('Last Name is required')
            .max(55, 'Last Name must not exceed 55 characters')
    });
    
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const onSubmit = handleSubmit(async (data: IUserForm = { username, firstname, lastname }) => {
        setIsMutating(true);
        
         const isFound = list.find(element => {
            return element.username === data.username;
        });

        if (isFound) {
            toastError("Username already exists!");
            setIsMutating(false);
        } else {
            dispatch(createUserAction(data));

            setIsMutating(false);

            dispatch(resetCreateListStatus());

            reset();
            setModalOpen(false);
        }
    });

    return (
        <div>
            <button onClick={() => setModalOpen(true)}
            className="btn btn-primary w-full uppercase">Add new user <AddCircleOutlineIcon className="tex-yellow-500" sx={{ fontSize: 20 }} /></button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <div>
                    <form onSubmit={onSubmit}>
                    {/* <form onSubmit={onSubmit}> */}
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input
                            {...register('username')}
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            type="text" placeholder="Username" className={`w-full input ${errors.username ? "is-invalid" : "input-primary"}`} />
                        </div>
                        <div className="invalid-feedback">{errors.username?.message}</div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">First Name</span>
                            </label>
                            <input
                            {...register('firstname')}
                            // value={firstname}
                            // onChange={(e) => setFirstname(e.target.value)}
                            type="text" placeholder="First Name" className={`w-full input input-bordered ${errors.firstname ? "is-invalid" : "input-primary"}`} />
                        </div>
                        <div className="invalid-feedback">{errors.firstname?.message}</div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Last Name</span>
                            </label>
                            <input
                            {...register('lastname')}
                            // value={lastname}
                            // onChange={(e) => setLastname(e.target.value)}
                            type="text" placeholder="Last Name" className={`w-full input input-bordered ${errors.lastname ? "is-invalid" : "input-primary"}`} />
                        </div>
                        <div className="invalid-feedback">{errors.lastname?.message}</div>
                        <div className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                            <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{!isMutating ? "Save" : "Saving..."}</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default AddUser