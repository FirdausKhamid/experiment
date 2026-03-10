import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { ListRoles } from "@/features/permissions/listRoles";

export default function RoleManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <ListRoles />
      </DashboardLayout>
    </RequireAuth>
  );
}
