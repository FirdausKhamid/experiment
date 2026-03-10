"use client";

import type { RegionByIdWithOverrides } from "@/stores/regionByIdStore";
import type { Failure } from "@/utils/error";
import { SideModal } from "@/components/ui/SideModal";
import { FormError } from "@/components/ui/FormError";
import { FeatureOverridesForm } from "./FeatureOverridesForm";
import { useRegionByIdStore } from "@/stores/regionByIdStore";

type EditRegionModalProps = {
  originalData: RegionByIdWithOverrides | null;
  error: Failure | null;
  onClose: () => void;
};

export function EditRegionModal({
  originalData,
  error,
  onClose,
}: EditRegionModalProps) {
  const { patchOverrides, isPatching, patchError } = useRegionByIdStore();

  return (
    <SideModal
      isOpen={!!originalData}
      title="Region feature overrides"
      description="Feature flags allowed for this region."
      onClose={onClose}
    >
      {originalData && (
        <div className="space-y-4">
          <FormError error={error} />
          <FeatureOverridesForm
            targetType="region"
            targetId={originalData.id}
            targetLabel={`Region: ${originalData.name} (${originalData.id})`}
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
