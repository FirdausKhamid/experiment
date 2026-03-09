import type { ReactNode } from "react";

export type NavigationTab = {
  feature_key: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavigationTab[];
};

export const defaultNavigationTabs: NavigationTab[] = [
  { feature_key: "home", label: "Dashboard", href: "/dashboard" },
  {
    feature_key: "feature-a",
    label: "Feature A",
    href: "/dashboard/feature-a",
  },
  {
    feature_key: "feature-b",
    label: "Feature B",
    href: "/dashboard/feature-b",
  },
  {
    feature_key: "feature-c",
    label: "Feature C",
    href: "/dashboard/feature-c",
  },
  { feature_key: "users", label: "Users", href: "/dashboard/users" },
  {
    feature_key: "permissions",
    label: "Permissions",
    href: "/dashboard/permissions",
  },
  { feature_key: "settings", label: "Settings", href: "/dashboard/settings" },
];
