"use client";

import { useEffect } from "react";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useGroupStore } from "@/stores/groupStore";
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

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
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
          />
          <p className="mt-2 text-sm text-gray-500">
            Page {page} · {limit} per page · {total} total
          </p>
        </div>
      </div>
    </div>
  );
}
