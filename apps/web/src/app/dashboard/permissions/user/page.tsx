import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const userColumns: ColumnDef<UserRow>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
];

const userData: UserRow[] = [
  { id: "u-001", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: "u-002", name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  { id: "u-003", name: "Charlie Davis", email: "charlie@example.com", role: "Viewer" },
];

export default function UserManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">User Management</h1>
            <p className="dashboard-subtitle">Manage application users.</p>

            <div className="mt-4">
              <TableComponent<UserRow> data={userData} columns={userColumns} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
