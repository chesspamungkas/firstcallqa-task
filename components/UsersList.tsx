"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IUser } from "@/types/users";
import { deleteUserAction, getUserListAction } from "@/redux/userSlice";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const UsersList = () => {
  const { list } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, [list]);
  return (  
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-white-100 dark:text-white-100">
        <thead className="text-xs text-white uppercase bg-yellow-600 dark:text-white">
            <tr>
                <th scope="col" className="px-10 py-3 text-center">
                  Id
                </th>
                <th scope="col" className="px-10 py-3">
                  Username
                </th>
                <th scope="col" className="px-10 py-3">
                  First Name
                </th>
                <th scope="col" className="px-10 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-10 py-3 text-center">
                  Actions
                </th>
            </tr>
        </thead>
        <tbody>
          {list.map((user: IUser, index: number) => (
            <tr key={user.id} className="bg-white-500 border-b border-white-400">
              <td className="px-10 py-4">
                {index + 1}
              </td>
              <td className="px-10 py-4">
                  {user.username}
              </td>
              <td className="px-10 py-4">
                  {user.firstname}
              </td>
              <td className="px-10 py-4">
                  {user.lastname}
              </td>
              <td className="px-10 py-4 flex justify-between">
                <UpdateUser {...user} />
                <DeleteUser {...user} />
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList;