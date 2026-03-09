import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../../features/dashboard/components/DashboardLayout";

export default function DashboardSettingsPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Settings</h1>
            <p className="dashboard-subtitle">Configure your preferences here.</p>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
