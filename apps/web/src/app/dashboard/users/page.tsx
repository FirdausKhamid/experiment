import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../../features/dashboard/components/DashboardLayout";

export default function UsersPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Users</h1>
            <p className="dashboard-subtitle">Manage users and accounts.</p>
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
