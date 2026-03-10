"use client";

import type { RegionByIdWithOverrides } from "@/stores/regionByIdStore";
import type { Failure } from "@/utils/error";
import { SideModal } from "@/components/ui/SideModal";
import { FormError } from "@/components/ui/FormError";

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
          <p className="text-sm text-gray-600">
            <span className="font-medium">Region:</span> {originalData.name} (
            {originalData.id})
          </p>
          <div className="overflow-x-auto rounded-md border border-gray-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-700">
                    Feature key
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-700">
                    Allowed
                  </th>
                </tr>
              </thead>
              <tbody>
                {originalData.featuresOverrideList.map((row) => (
                  <tr
                    key={row.feature_id}
                    className="border-t border-gray-100 text-gray-800"
                  >
                    <td className="px-4 py-2">{row.feature_key}</td>
                    <td className="px-4 py-2">
                      {row.feature_description || "—"}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          row.is_allowed
                            ? "text-green-600 font-medium"
                            : "text-gray-500"
                        }
                      >
                        {row.is_allowed ? "Yes" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </SideModal>
  );
}
