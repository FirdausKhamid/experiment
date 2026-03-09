import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../../features/dashboard/components/DashboardLayout";

export default function PermissionsPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Permissions</h1>
            <p className="dashboard-subtitle">Configure roles and permissions.</p>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
