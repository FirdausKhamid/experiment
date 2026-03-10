"use client";

import { Sidebar } from "./Sidebar";
import {
  defaultNavigationTabs,
  type NavigationTab,
} from "../models/navigation";
import { useAuthStore } from "@/stores/authStore";
import { getVisibleNavigationTabs } from "@/utils/feature-tabs";

type DashboardLayoutProps = {
  children: React.ReactNode;
  /**
   * For dynamic overriding of the navigation tabs.
   */
  navigationTabs?: NavigationTab[];
};

export function DashboardLayout({
  children,
  navigationTabs,
}: DashboardLayoutProps) {
  const enabledFeatures = useAuthStore((s) => s.enabledFeatures);
  const tabs = getVisibleNavigationTabs(
    navigationTabs ?? defaultNavigationTabs,
    enabledFeatures,
  );

  return (
    <div className="dashboard-layout">
      <Sidebar
        tabs={tabs}
        header={
          <div className="sidebar-brand">
            <span className="sidebar-brand-text">Dashboard</span>
          </div>
        }
      />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
