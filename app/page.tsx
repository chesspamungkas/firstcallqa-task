import { getAllUsers } from "@/api";
import { AddUser, UsersList } from "@/components";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default async function Home() {
  const users = await getAllUsers();
  // console.log(users);
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">User Management Dashboard</h1>
        <AddUser />
      </div>
      <UsersList />
      <ToastContainer 
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
    </main>
  )
}
