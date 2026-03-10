import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { ListRegions } from "@/features/permissions/listRegions";

export default function RegionManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <ListRegions />
      </DashboardLayout>
    </RequireAuth>
  );
}
