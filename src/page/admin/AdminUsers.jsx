import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import UserInfoModal from "../../components/templates/admin/users/UserInfoModal";

import Table from "../../components/templates/admin/users/table/Table";
import { banUser, getAllUsers } from "../../services/user/user";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import usePagination from "../../lib/Hooks/usePagination";
import Pagination from "../../components/common/pagination/Pagination";

const AdminUsers = () => {
  const [currentPage, pagination, setPagination, showNumberPage] =
    usePagination();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useSearchParams();

  const fetchUsers = async (form = { page: currentPage }) => {
    const usersAndPagination = await getAllUsers(form);
    setPagination(usersAndPagination.pagination);
    setUsers(usersAndPagination.users);
  };
  useEffect(() => {
    fetchUsers({ page: currentPage });
  }, [search]);

  const handleDelete = (user) => {
    toast.promise(banUser(user._id), {
      success: () => {
        fetchUsers();
        setSelectedUser(null);
        return "با موفقیت کاربر اخراج شد";
      },
      loading: "درحال انجام",
    });
  };
  return (
    <>
      {users ? (
        <div className="w-full min-w-0 space-y-6">
          <div>
            <div className="flex items-center gap-3 max-[700px]:gap-2">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400 max-[700px]:h-10 max-[700px]:w-10">
                <FiUsers size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-black text-slate-800 dark:text-white max-[700px]:text-xl">
                  کاربران
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-[700px]:text-xs">
                  مدیریت کاربران و اطلاعات حساب آن‌ها
                </p>
              </div>
            </div>
          </div>

          <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/60 dark:bg-[#18233a]">
            <div className="w-full overflow-hidden">
              <Table users={users} setSelectedUser={setSelectedUser}></Table>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 dark:border-slate-700/60 max-[700px]:gap-3 max-[700px]:px-3 max-[700px]:py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400 max-[700px]:text-[11px]">
                نمایش {currentPage * 10 - 9} تا {currentPage * 10} از{" "}
                {pagination.totalUsers} کاربر
              </p>

              <div className="flex w-full items-center justify-between gap-1 sm:w-auto sm:justify-start">
                <Pagination
                  pagination={pagination}
                  currentPage={currentPage}
                  showNumberPage={showNumberPage}
                ></Pagination>
              </div>
            </div>
          </div>

          {selectedUser && (
            <UserInfoModal
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              handleDelete={handleDelete}
            ></UserInfoModal>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-8 w-full max-w-7xl px-4">
          <div className="h-[380px] animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        </div>
      )}
    </>
  );
};

export default AdminUsers;
