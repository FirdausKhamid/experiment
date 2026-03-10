import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { ListFeatures } from "@/features/permissions/listFeatures";

export default function FeatureManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <ListFeatures />
      </DashboardLayout>
    </RequireAuth>
  );
}
