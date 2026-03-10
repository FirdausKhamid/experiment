"use client";

import { useEffect } from "react";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useRegionStore } from "@/stores/regionStore";
import type { ColumnDef } from "@tanstack/react-table";
import type { RegionDto } from "@experiment/shared";

const regionColumns: ColumnDef<RegionDto>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Created", accessorKey: "createdAt" },
];

export function ListRegions() {
  const { items, total, page, limit, isLoading, error, fetchPage } =
    useRegionStore();

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1 className="dashboard-title">Region Management</h1>
        <p className="dashboard-subtitle">Manage business regions.</p>

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {Array.isArray(error.message) ? error.message[0] : error.message}
          </p>
        )}
        <div className="mt-4">
          <TableComponent<RegionDto>
            data={items}
            columns={regionColumns}
            isLoading={isLoading}
            loadingMessage="Loading regions…"
          />
          <p className="mt-2 text-sm text-gray-500">
            Page {page} · {limit} per page · {total} total
          </p>
        </div>
      </div>
    </div>
  );
}
