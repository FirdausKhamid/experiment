"use client";

import { Sidebar } from "./Sidebar";
import { defaultNavigationTabs } from "../models/navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
  // For dynamic overriding
  navigationTabs?: typeof defaultNavigationTabs;
};

export function DashboardLayout({
  children,
  navigationTabs,
}: DashboardLayoutProps) {
  const tabs = navigationTabs ?? defaultNavigationTabs;

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
