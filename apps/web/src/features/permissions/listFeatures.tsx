"use client";

import { useEffect } from "react";
import type { FeatureDto, UpdateFeatureDto } from "@experiment/shared";
import { TableComponent } from "@/features/dashboard/components/TableComponent";
import { featureColumns } from "@/utils/constants/features";
import { useFeatureStore } from "@/stores/featureStore";
import { useUpdateFeatureStore } from "@/stores/updateFeatureStore";
import { useFormModelStore } from "@/stores";
import { featureFormModel } from "@/utils/constants/features";
import { LoadingWidget } from "@/components/ui/LoadingWidget";
import { EditFeatureModal } from "./editFeatures";

export function ListFeatures() {
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
    if (!originalData) return;
    const success = await update(originalData.id, values);
    if (!success) return;
    handleCloseModal();
    fetchPage(1, 10);
  };

  return (
    <>
      {updateLoading && (
        <LoadingWidget message="Loading features…" size="md" popup />
      )}

      <div className="dashboard-container">
        <div className="dashboard-card">
          <h1 className="dashboard-title">Feature Management</h1>
          <p className="dashboard-subtitle">
            View all feature flags and their current status.
          </p>

          {error && (
            <p className="mt-4 text-sm text-red-600">
              {Array.isArray(error.message) ? error.message.join(", ") : error.message}
            </p>
          )}

          <div className="mt-4">
            <TableComponent<FeatureDto>
              data={items}
              columns={featureColumns}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              loadingMessage="Loading features…"
            />
            <p className="mt-2 text-xs text-gray-500">
              Click a row to view details.
            </p>
          </div>
        </div>
      </div>

      <EditFeatureModal
        originalData={originalData}
        isSubmitting={updateLoading}
        error={error}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />
    </>
  );
}

