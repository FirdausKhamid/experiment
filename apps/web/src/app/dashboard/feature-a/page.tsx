"use client";

import { useEffect } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout";
import { useFeatureAStore } from "@/stores/featureAStore";

export default function FeatureAPage() {
  const { data, isLoading, error, fetch } = useFeatureAStore();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <RequireAuth>
      <DashboardLayout>
        <div className="dashboard-container">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Feature A</h1>
            <p className="dashboard-subtitle">Feature A content.</p>
            {error && (
              <p className="mt-2 text-sm text-red-600">
                {Array.isArray(error.message) ? error.message[0] : error.message}
              </p>
            )}
            {isLoading && <p className="mt-2 text-sm text-gray-500">Loading…</p>}
            {data && <p className="mt-2 text-gray-700">{data}</p>}
          </div>
        </div>
      </DashboardLayout>
    </RequireAuth>
  );
}
