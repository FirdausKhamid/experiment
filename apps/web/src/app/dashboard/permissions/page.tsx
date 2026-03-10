import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { PermissionsOverview } from "@/features/permissions/permissionsOverview";

export default function PermissionsPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <PermissionsOverview />
      </DashboardLayout>
    </RequireAuth>
  );
}
