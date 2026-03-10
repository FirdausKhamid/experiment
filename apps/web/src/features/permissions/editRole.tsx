"use client";

import type { GroupByIdWithOverrides } from "@/stores/roleByIdStore";
import type { Failure } from "@/utils/error";
import { SideModal } from "@/components/ui/SideModal";
import { FormError } from "@/components/ui/FormError";
import { FeatureOverridesForm } from "./FeatureOverridesForm";
import { useRoleByIdStore } from "@/stores/roleByIdStore";

type EditRoleModalProps = {
  originalData: GroupByIdWithOverrides | null;
  error: Failure | null;
  onClose: () => void;
};

export function EditRoleModal({
  originalData,
  error,
  onClose,
}: EditRoleModalProps) {
  const { patchOverrides, isPatching, patchError } = useRoleByIdStore();

  return (
    <SideModal
      isOpen={!!originalData}
      title="Role feature overrides"
      description="Feature flags allowed for this role."
      onClose={onClose}
    >
      {originalData && (
        <div className="space-y-4">
          <FormError error={error} />
          <FeatureOverridesForm
            targetType="group"
            targetId={originalData.id}
            targetLabel={`Role: ${originalData.name} (${originalData.id})`}
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
