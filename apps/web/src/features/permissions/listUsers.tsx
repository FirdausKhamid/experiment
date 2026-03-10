"use client";

import { useEffect } from "react";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useUserStore } from "@/stores/userStore";
import { useUserByIdStore } from "@/stores/userByIdStore";
import { LoadingWidget } from "@/components/ui/LoadingWidget";
import { EditUserModal } from "./editUser";
import type { ColumnDef } from "@tanstack/react-table";
import type { UserDto } from "@experiment/shared";

const userColumns: ColumnDef<UserDto>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Username", accessorKey: "username" },
  { header: "Group", accessorKey: "groupId" },
  { header: "Region", accessorKey: "regionId" },
  { header: "Created", accessorKey: "createdAt" },
];

export function ListUsers() {
  const { items, total, page, limit, isLoading, error, fetchPage } =
    useUserStore();
  const {
    fetchById,
    originalData,
    clear,
    isLoading: byIdLoading,
    error: byIdError,
  } = useUserByIdStore();

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  const handleRowClick = (user: UserDto) => {
    fetchById(user.id);
  };

  const handleCloseModal = () => {
    clear();
  };

  return (
    <>
      {byIdLoading && (
        <LoadingWidget message="Loading user…" size="md" popup />
      )}
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">User Management</h1>
          <p className="dashboard-subtitle">Manage application users.</p>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {Array.isArray(error.message) ? error.message[0] : error.message}
            </p>
          )}
          <div className="mt-4">
            <TableComponent<UserDto>
              data={items}
              columns={userColumns}
              isLoading={isLoading}
              loadingMessage="Loading users…"
              onRowClick={handleRowClick}
            />
            <p className="mt-2 text-sm text-gray-500">
              Page {page} · {limit} per page · {total} total. Click a row to view
              feature overrides.
            </p>
          </div>
        </div>
      </div>
      <EditUserModal
        originalData={originalData}
        error={byIdError}
        onClose={handleCloseModal}
      />
    </>
  );
}
