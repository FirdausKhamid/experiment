"use client";

import { useEffect } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";
import { useFeatureStore } from "@/stores/featureStore";
import type { FeatureDto } from "@experiment/shared";

const featureColumns: ColumnDef<FeatureDto>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Key",
    accessorKey: "key",
  },
  {
    header: "Enabled",
    accessorKey: "isEnabled",
    cell: ({ getValue }) => (getValue<boolean>() ? "On" : "Off"),
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Updated At",
    accessorKey: "updatedAt",
  },
];

export default function FeatureManagementPage() {
  const { items, isLoading, error, fetchPage } = useFeatureStore();

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Feature Management</h1>
            <p className="dashboard-subtitle">
              View all feature flags and their current status.
            </p>

            {isLoading && (
              <p className="mt-4 text-sm text-gray-500">Loading features…</p>
            )}
            {error && (
              <p className="mt-4 text-sm text-red-600">
                {Array.isArray(error.message)
                  ? error.message.join(", ")
                  : error.message}
              </p>
            )}

            <div className="mt-4">
              <TableComponent<FeatureDto> data={items} columns={featureColumns} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}

