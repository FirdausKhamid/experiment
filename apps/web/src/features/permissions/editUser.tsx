"use client";

import type { UserByIdWithOverrides } from "@/stores/userByIdStore";
import type { Failure } from "@/utils/error";
import { SideModal } from "@/components/ui/SideModal";
import { FormError } from "@/components/ui/FormError";
import { FeatureOverridesForm } from "./FeatureOverridesForm";
import { useUserByIdStore } from "@/stores/userByIdStore";

type EditUserModalProps = {
  originalData: UserByIdWithOverrides | null;
  error: Failure | null;
  onClose: () => void;
};

export function EditUserModal({
  originalData,
  error,
  onClose,
}: EditUserModalProps) {
  const { patchOverrides, isPatching, patchError } = useUserByIdStore();

  return (
    <SideModal
      isOpen={!!originalData}
      title="User feature overrides"
      description="Feature flags allowed for this user."
      onClose={onClose}
    >
      {originalData && (
        <div className="space-y-4">
          <FormError error={error} />
          <FeatureOverridesForm
            targetType="user"
            targetId={originalData.id}
            targetLabel={`User: ${originalData.username} (${originalData.id})`}
            featuresOverrideList={originalData.featuresOverrideList}
            onPatch={patchOverrides}
            isPatching={isPatching}
            patchError={patchError}
          />
        </div>
      )}
    </SideModal>
  );
}
