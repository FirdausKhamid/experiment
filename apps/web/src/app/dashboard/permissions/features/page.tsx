"use client";

import { useEffect } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { useFeatureStore } from "@/stores/featureStore";
import {
  UpdateFeatureSchema,
  type FeatureDto,
  UpdateFeatureDto,
} from "@experiment/shared";
import { SideModal } from "@/components/ui/SideModal";
import { LoadingWidget } from "@/components/ui/LoadingWidget";
import { useUpdateFeatureStore } from "@/stores/updateFeatureStore";
import { FormBuilder } from "@/utils/forms/FormBuilder";
import { FormError } from "@/components/ui/FormError";
import { useFormModelStore } from "@/stores";
import { featureFormModel, featureColumns } from "@/utils/constants/features";

export default function FeatureManagementPage() {
  const { items, isLoading, error, fetchPage } = useFeatureStore();
  const {
    update,
    fetchById,
    originalData,
    clear,
    isLoading: updateLoading,
  } = useUpdateFeatureStore();
  const setModel = useFormModelStore((s) => s.setModel);

  useEffect(() => {
    fetchPage(1, 10);
  }, [fetchPage]);

  const handleRowClick = async (feature: FeatureDto) => {
    const success = await fetchById(feature.id);
    if (!success) return;
    setModel(featureFormModel);
  };

  const handleCloseModal = () => {
    clear();
  };

  const handleSubmit = async (values: UpdateFeatureDto) => {
    if (!originalData) {
      return;
    }
    const success = await update(originalData.id, values);
    if (!success) return;
    handleCloseModal();
    fetchPage(1, 10);
  };

  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Feature Management</h1>
            <p className="dashboard-subtitle">
              View all feature flags and their current status.
            </p>

            {updateLoading && (
              <LoadingWidget message="Loading features…" size="md" popup />
            )}
            {error && (
              <p className="mt-4 text-sm text-red-600">
                {Array.isArray(error.message)
                  ? error.message.join(", ")
                  : error.message}
              </p>
            )}

            <div className="mt-4">
              <TableComponent<FeatureDto>
                isLoading={isLoading}
                data={items}
                columns={featureColumns}
                onRowClick={(row) => handleRowClick(row)}
              />
              <p className="mt-2 text-xs text-gray-500">
                Click a row to view details.
              </p>
            </div>
          </div>
        </div>

        <SideModal
          isOpen={!!originalData}
          title="Feature Details"
          description="Inspect and edit the feature."
          onClose={handleCloseModal}
        >
          {originalData && (
            <FormBuilder
              schema={UpdateFeatureSchema}
              defaultValues={{
                key: originalData.key,
                isEnabled: originalData.isEnabled,
                description: originalData.description ?? null,
              }}
              onSubmit={handleSubmit}
              submitLabel="Save"
              isSubmitting={updateLoading}
              errorSlot={<FormError error={error} />}
            />
          )}
        </SideModal>
      </DashboardLayout>
    </RequireAuth>
  );
}
