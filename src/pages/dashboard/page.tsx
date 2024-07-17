import AddCategory from "./add-category";
import ClientDataLoader from "../../components/ClientDataLoader";
import BoardList from "./board-list";
import AuthProvider, { AuthContext } from "@/components/context/AuthProvider";
import { useContext } from "react";

export default function Dashboard() {
  // const { userData } = useContext(AuthContext)
  // console.log({ userData })
  // if (!userData) {
  //   redirect('/login')
  // }
  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col items-center">
      <div className="w-full bg-gradient-to-r from-transparent via-purple-700 to-transparent p-[1px]" />

      <div
        className={`grid h-[85vh] w-full auto-cols-[16rem] grid-flow-col gap-x-2 overflow-x-auto`}
      >
        {/* <AuthProvider> */}
        <BoardList />
        <AddCategory />
        <ClientDataLoader />
        {/* </AuthProvider> */}
      </div>
    </div>
  );
}
