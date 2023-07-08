"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IUser } from "@/types/users";
import Modal from './Modal';
import { deleteUserAction, updateUserAction } from "@/redux/userSlice";
import { useAppDispatch } from "@/redux/hooks";

export default function DeleteUser(user: IUser) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const handleDelete = (userId: number) => {
    setIsMutating(true);

    dispatch(deleteUserAction(userId));

    setIsMutating(false);
    router.refresh();
    setModalOpen(false);
  }

  function handleChange() {
    setModalOpen(!modalOpen);
  }

  return (
    <div>
      <a href="#" className="font-medium text-green hover:underline">
        <Tooltip title="Delete">
            <IconButton onClick={handleChange}>
                <DeleteIcon className="tex-blue-500" />
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
          {/* <form onSubmit={onSubmit}> */}
            <span className="text-lg">
              Are sure to delete username : <strong>{user.username}</strong> ?
            </span>         
            <div className="flex items-center justify-end pt-6 border-t border-solid border-slate-200 rounded-b">
                <button type="button" onClick={() => handleDelete(user.id)} className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">{!isMutating ? "Delete" : "Deleting..."}</button>
            </div>
          {/* </form> */}
        </div>
      </Modal>
    </div>
  );
}
