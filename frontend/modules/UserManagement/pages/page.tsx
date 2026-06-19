"use client";

import { useState } from "react";
import { Plus, Loader2, Users } from "lucide-react";

import UserTable from "@/modules/UserManagement/components/UserTable";
import UserForm from "@/modules/UserManagement/components/UserForm";

import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} from "../api/userApi";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function UserManagementPage() {
  const { data = [], isLoading } = useGetUsersQuery({});
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 md:p-12">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <Users size={24} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              User Management
            </h1>
          </div>

          <Button
            onClick={() => {
              setSelectedUser(null);
              setOpen(true);
            }}
            className="h-11 rounded-lg bg-slate-900 px-6 font-semibold text-white hover:bg-slate-800 active:scale-95"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* ================= DASHBOARD ================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Users</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {data?.length ?? 0}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active Users</p>
            <h2 className="mt-2 text-2xl font-bold text-green-600">
              {data?.filter((u: any) => u.status === "active").length ?? 0}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Inactive Users</p>
            <h2 className="mt-2 text-2xl font-bold text-red-500">
              {data?.filter((u: any) => u.status === "inactive").length ?? 0}
            </h2>
          </div>

        </div>

        {/* ================= TABLE SECTION ================= */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5">
          {isLoading ? (
            <div className="flex h-96 w-full flex-col items-center justify-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <p className="text-sm font-medium text-slate-500">
                Preparing workspace...
              </p>
            </div>
          ) : (
            <div className="p-1">
              <UserTable
                users={data}
                onEdit={(user) => {
                  setSelectedUser(user);
                  setOpen(true);
                }}
                onDelete={(id) => deleteUser(id)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-112.5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedUser ? "Edit User Profile" : "Create User Account"}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <UserForm
              defaultValues={selectedUser}
              onSubmit={async (val) => {
                if (selectedUser) {
                  await updateUser({ id: selectedUser.id, ...val });
                } else {
                  await createUser(val);
                }
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}