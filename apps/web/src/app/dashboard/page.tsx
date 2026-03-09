import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardView } from "../../features/dashboard/components/DashboardView";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardView />
    </RequireAuth>
  );
}
