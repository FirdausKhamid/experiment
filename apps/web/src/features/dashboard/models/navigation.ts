import type { ReactNode } from "react";

export type NavigationTab = {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationTab[];
};

export const defaultNavigationTabs: NavigationTab[] = [
  { id: "home", label: "Dashboard", href: "/dashboard" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
];
