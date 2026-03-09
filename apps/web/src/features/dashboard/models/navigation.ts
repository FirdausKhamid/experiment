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
  { id: "feature-a", label: "Feature A", href: "/dashboard/feature-a" },
  { id: "feature-b", label: "Feature B", href: "/dashboard/feature-b" },
  { id: "feature-c", label: "Feature C", href: "/dashboard/feature-c" },
  { id: "users", label: "Users", href: "/dashboard/users" },
  { id: "permissions", label: "Permissions", href: "/dashboard/permissions" },
  { id: "settings", label: "Settings", href: "/dashboard/settings" },
];
