"use client";

import { useEffect } from "react";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useUserStore } from "@/stores/userStore";
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

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
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
          />
          <p className="mt-2 text-sm text-gray-500">
            Page {page} · {limit} per page · {total} total
          </p>
        </div>
      </div>
    </div>
  );
}
