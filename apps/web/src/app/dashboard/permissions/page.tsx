import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../../features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";

type PermissionSummaryRow = {
  area: string;
  description: string;
  path: string;
};

const permissionSummaryColumns: ColumnDef<PermissionSummaryRow>[] = [
  {
    header: "Area",
    accessorKey: "area",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Path",
    accessorKey: "path",
  },
];

const permissionSummaryData: PermissionSummaryRow[] = [
  {
    area: "Users",
    description: "Manage application users and their roles.",
    path: "/dashboard/permissions/user",
  },
  {
    area: "Roles",
    description: "Define roles and assign permissions.",
    path: "/dashboard/permissions/role",
  },
  {
    area: "Regions",
    description: "Configure regions and availability.",
    path: "/dashboard/permissions/region",
  },
];

export default function PermissionsPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Permissions</h1>
            <p className="dashboard-subtitle">
              Configure roles, users, and regional access.
            </p>

            <div className="mt-4">
              <TableComponent<PermissionSummaryRow>
                data={permissionSummaryData}
                columns={permissionSummaryColumns}
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
