"use client";

import type { FeatureDto, UpdateFeatureDto } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { UpdateFeatureSchema } from "@experiment/shared";
import { SideModal } from "@/components/ui/SideModal";
import { FormBuilder } from "@/utils/forms/FormBuilder";
import { FormError } from "@/components/ui/FormError";

type EditFeatureProps = {
  originalData: FeatureDto | null;
  isSubmitting: boolean;
  error: Failure | null;
  onSubmit: (values: UpdateFeatureDto) => void | Promise<void>;
  onClose: () => void;
};

export function EditFeatureModal({
  originalData,
  isSubmitting,
  error,
  onSubmit,
  onClose,
}: EditFeatureProps) {
  return (
    <SideModal
      isOpen={!!originalData}
      title="Feature Details"
      description="Inspect and edit the feature."
      onClose={onClose}
    >
      {originalData && (
        <FormBuilder
          schema={UpdateFeatureSchema}
          defaultValues={{
            key: originalData.key,
            isEnabled: originalData.isEnabled,
            description: originalData.description ?? null,
          }}
          onSubmit={onSubmit}
          submitLabel="Save"
          isSubmitting={isSubmitting}
          errorSlot={<FormError error={error} />}
        />
      )}
    </SideModal>
  );
}

