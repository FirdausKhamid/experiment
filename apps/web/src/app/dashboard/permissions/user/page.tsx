import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { ListUsers } from "@/features/permissions/listUsers";

export default function UserManagementPage() {
  return (
    <RequireAuth>
      <DashboardLayout>
        <ListUsers />
      </DashboardLayout>
    </RequireAuth>
  );
}
