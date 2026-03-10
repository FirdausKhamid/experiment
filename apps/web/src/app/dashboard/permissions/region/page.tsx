import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";

export default function RegionManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Region Management</h1>
            <p className="dashboard-subtitle">
              Region management content goes here.
            </p>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
