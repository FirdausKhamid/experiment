"use client";

import { useEffect } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useRegionStore } from "@/stores/regionStore";
import type { ColumnDef } from "@tanstack/react-table";
import type { RegionDto } from "@experiment/shared";

const regionColumns: ColumnDef<RegionDto>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Created", accessorKey: "createdAt" },
];

export default function RegionManagementPage() {
  const { items, total, page, limit, isLoading, error, fetchPage } =
    useRegionStore();

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Region Management</h1>
            <p className="dashboard-subtitle">Manage business regions.</p>

            {error && (
              <p className="mt-2 text-sm text-red-600">
                {Array.isArray(error.message) ? error.message[0] : error.message}
              </p>
            )}
            {isLoading ? (
              <p className="mt-4 text-gray-500">Loading regions…</p>
            ) : (
              <div className="mt-4">
                <TableComponent<RegionDto> data={items} columns={regionColumns} />
                <p className="mt-2 text-sm text-gray-500">
                  Page {page} · {limit} per page · {total} total
                </p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
