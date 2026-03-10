import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import type { ColumnDef } from "@tanstack/react-table";

type RegionRow = {
  id: string;
  name: string;
  code: string;
  status: string;
};

const regionColumns: ColumnDef<RegionRow>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Region",
    accessorKey: "name",
  },
  {
    header: "Code",
    accessorKey: "code",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
];

const regionData: RegionRow[] = [
  { id: "reg-001", name: "North America", code: "NA", status: "Active" },
  { id: "reg-002", name: "Europe", code: "EU", status: "Active" },
  { id: "reg-003", name: "Asia Pacific", code: "APAC", status: "Planned" },
];

export default function RegionManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Region Management</h1>
            <p className="dashboard-subtitle">Manage business regions.</p>

            <div className="mt-4">
              <TableComponent<RegionRow> data={regionData} columns={regionColumns} />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
