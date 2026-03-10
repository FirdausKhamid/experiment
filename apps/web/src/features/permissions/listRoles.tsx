"use client";

import { useEffect } from "react";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useGroupStore } from "@/stores/groupStore";
import { useRoleByIdStore } from "@/stores/roleByIdStore";
import { LoadingWidget } from "@/components/ui/LoadingWidget";
import { EditRoleModal } from "./editRole";
import type { ColumnDef } from "@tanstack/react-table";
import type { GroupDto } from "@experiment/shared";

const roleColumns: ColumnDef<GroupDto>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Role", accessorKey: "name" },
  { header: "Created", accessorKey: "createdAt" },
];

export function ListRoles() {
  const { items, total, page, limit, isLoading, error, fetchPage } =
    useGroupStore();
  const {
    fetchById,
    originalData,
    clear,
    isLoading: byIdLoading,
    error: byIdError,
  } = useRoleByIdStore();

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  const handleRowClick = (role: GroupDto) => {
    fetchById(role.id);
  };

  const handleCloseModal = () => {
    clear();
  };

  return (
    <>
      {byIdLoading && (
        <LoadingWidget message="Loading role…" size="md" popup />
      )}
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Role Management</h1>
          <p className="dashboard-subtitle">Manage roles and permissions.</p>

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {Array.isArray(error.message) ? error.message[0] : error.message}
            </p>
          )}
          <div className="mt-4">
            <TableComponent<GroupDto>
              data={items}
              columns={roleColumns}
              isLoading={isLoading}
              loadingMessage="Loading roles…"
              onRowClick={handleRowClick}
            />
            <p className="mt-2 text-sm text-gray-500">
              Page {page} · {limit} per page · {total} total. Click a row to view
              feature overrides.
            </p>
          </div>
        </div>
      </div>
      <EditRoleModal
        originalData={originalData}
        error={byIdError}
        onClose={handleCloseModal}
      />
    </>
  );
}
