import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "../../features/dashboard/components/DashboardLayout";
import { DashboardView } from "../../features/dashboard/components/DashboardView";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </RequireAuth>
  );
}
