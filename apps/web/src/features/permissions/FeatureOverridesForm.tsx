"use client";

import { useState, useCallback } from "react";
import type { FeatureOverrideItem } from "@experiment/shared";
import type { Failure } from "@/utils/error";
import { FormError } from "@/components/ui/FormError";

export type OverrideEnabledValue = boolean | "default";

type FeatureOverridesFormProps = {
  targetType: "user" | "region" | "group";
  targetId: string;
  targetLabel: string;
  featuresOverrideList: FeatureOverrideItem[];
  onPatch: (payload: {
    targetType: "user" | "region" | "group";
    targetId: string;
    featureOverrides: { feature_id: number; enabled: OverrideEnabledValue }[];
  }) => Promise<boolean>;
  isPatching: boolean;
  patchError: Failure | null;
};

export function FeatureOverridesForm({
  targetType,
  targetId,
  targetLabel,
  featuresOverrideList,
  onPatch,
  isPatching,
  patchError,
}: FeatureOverridesFormProps) {
  const [values, setValues] = useState<Record<number, OverrideEnabledValue>>(() => {
    const initial: Record<number, OverrideEnabledValue> = {};
    featuresOverrideList.forEach((row) => {
      initial[row.feature_id] = row.is_allowed;
    });
    return initial;
  });

  const setEnabled = useCallback((featureId: number, enabled: OverrideEnabledValue) => {
    setValues((prev) => ({ ...prev, [featureId]: enabled }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const featureOverrides = featuresOverrideList.map((row) => ({
        feature_id: row.feature_id,
        enabled: values[row.feature_id] ?? row.is_allowed,
      }));
      await onPatch({ targetType, targetId, featureOverrides });
    },
    [targetType, targetId, featuresOverrideList, values, onPatch],
  );

  if (!featuresOverrideList.length) {
    return (
      <p className="text-sm text-gray-500">No features to configure for this target.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">{targetLabel}</p>
      <FormError error={patchError} />
      <div className="overflow-x-auto rounded-md border border-gray-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700">Feature key</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Description</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Override</th>
            </tr>
          </thead>
          <tbody>
            {featuresOverrideList.map((row) => (
              <tr
                key={row.feature_id}
                className="border-t border-gray-100 text-gray-800"
              >
                <td className="px-4 py-2">{row.feature_key}</td>
                <td className="px-4 py-2">
                  {row.feature_description || "—"}
                </td>
                <td className="px-4 py-2">
                  <select
                    className="form-input w-auto min-w-28"
                    value={
                      values[row.feature_id] === "default"
                        ? "default"
                        : values[row.feature_id]
                          ? "on"
                          : "off"
                    }
                    onChange={(e) => {
                      const v = e.target.value;
                      setEnabled(
                        row.feature_id,
                        v === "default" ? "default" : v === "on",
                      );
                    }}
                    aria-label={`Override for ${row.feature_key}`}
                  >
                    <option value="default">Default</option>
                    <option value="on">On</option>
                    <option value="off">Off</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPatching}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-emerald-700 disabled:opacity-50"
        >
          {isPatching ? "Saving…" : "Save overrides"}
        </button>
      </div>
    </form>
  );
}
