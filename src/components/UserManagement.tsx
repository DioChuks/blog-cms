import { FC, useState } from "react";
import { Switch } from "./ui/switch";
import { managedUsers } from "@/mock/managed-users";
import NewUserModal from "./modals/NewUserModal";
import { User } from "@/lib/types";
import { Copy } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const UserManagement: FC = () => {
  const [users, setUsers] = useState<User[]>(managedUsers);
  const [copying, setCopying] = useState(false);
  const accessKey = "shdenek83hesnsdda92h";

  const handleCopyAccessKey = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(accessKey);
      toast.success("Access key copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy access key");
      console.error("Copy failed:", err);
    } finally {
      setCopying(false);
    }
  };

  const handleUserStatusChange = (userId: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === 1 ? 0 : 1 }
          : user
      )
    );

    // API call to update user status
    // try {
    //   await updateUserStatus(userId, newStatus);
    // } catch (error) {
    //   console.error('Failed to update user status:', error);
    //   // Revert the state if API call fails
    //   setUsers(prevUsers =>
    //     prevUsers.map(user =>
    //       user.id === userId
    //         ? { ...user, status: user.status === 1 ? 0 : 1 }
    //         : user
    //     )
    //   );
    // }
  };

  return (
    <div className="flex gap-4 xl:gap-8">
      <section className="max-w-2xl flex flex-col gap-2">
        <div className="w-[618px] h-[41px] relative bg-white  overflow-hidden">
          <div className="left-[20px] top-[13px] absolute text-black text-sm font-medium tracking-tight">
            Email
          </div>
          <div className="left-[240px] top-[13px] absolute text-black text-sm font-medium tracking-tight">
            Name
          </div>
          <div className="left-[411px] top-[13px] absolute text-black text-sm font-medium tracking-tight">
            Role
          </div>
          <div className="left-[504px] top-[13px] absolute text-black text-sm font-medium tracking-tight">
            Status
          </div>
        </div>
        {users.map((user) => (
          <div
            key={user.id}
            className="w-[618px] h-[41px] relative bg-white hover:bg-indigo-50 overflow-hidden cursor-pointer"
          >
            <p className="left-[20px] top-[13px] absolute text-neutral-600 text-xs font-medium tracking-tight">
              {user.email}
            </p>
            <p className="left-[240px] top-[13px] absolute text-neutral-600 text-xs font-medium tracking-tight">
              {user.name}
            </p>
            <p className="left-[411px] top-[13px] absolute text-neutral-600 text-xs font-medium tracking-tight">
              {user.role}
            </p>
            <div data-svg-wrapper className="left-[505px] top-[9px] absolute">
              <Switch
                checked={user.status === 1}
                onCheckedChange={() => handleUserStatusChange(user.id)}
              />
            </div>
            <div
              data-svg-wrapper
              className="left-[578px] top-[9px] absolute cursor-pointer text-[#515151] hover:text-red-500"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        ))}
        <br />
        <div className="justify-start items-start inline-flex">
          <NewUserModal />
        </div>
      </section>
      <div className="w-[218px] h-[119px] relative bg-white rounded-xl  overflow-hidden">
        <h4 className="left-[14px] top-[14px] absolute text-slate-500 text-sm font-medium tracking-tight">
          Access Key
        </h4>
        <p className="w-[193px] left-[18px] top-[42px] absolute text-black text-sm font-medium tracking-tight">
          {accessKey}
        </p>
        <div className="left-[133px] top-[81px] absolute justify-start items-center gap-[7px] inline-flex cursor-pointer" onClick={handleCopyAccessKey}>
          <Copy className="text-teal-600"/>
          <div className="text-teal-600 text-sm font-medium tracking-tight">
            {copying ? 'Copying...' : 'Copy'}
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};

export default UserManagement;
