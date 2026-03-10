import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";

type RoleRow = {
  id: string;
  name: string;
  description: string;
  userCount: number;
};

const roleColumns: ColumnDef<RoleRow>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Role",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Users",
    accessorKey: "userCount",
  },
];

const roleData: RoleRow[] = [
  {
    id: "r-001",
    name: "Admin",
    description: "Full system access",
    userCount: 3,
  },
  {
    id: "r-002",
    name: "Manager",
    description: "Manage teams and regions",
    userCount: 8,
  },
  {
    id: "r-003",
    name: "Viewer",
    description: "Read-only access",
    userCount: 15,
  },
];

export default function RoleManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Role Management</h1>
            <p className="dashboard-subtitle">Manage roles and permissions.</p>

            <div className="mt-4">
              <TableComponent<RoleRow> data={roleData} columns={roleColumns} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
