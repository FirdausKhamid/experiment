import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../../features/dashboard/components/DashboardLayout";

export default function FeatureBPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Feature B</h1>
            <p className="dashboard-subtitle">Feature B content goes here.</p>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
