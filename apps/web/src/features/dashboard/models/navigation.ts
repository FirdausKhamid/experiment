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
    children: [
      {
        feature_key: "region_management",
        label: "Region Management",
        href: "/dashboard/permissions/region",
        },
        {
          feature_key: "role_management",
          label: "Role Management",
          href: "/dashboard/permissions/role",
        },
        {
          feature_key: "user_management",
          label: "Users Management",
          href: "/dashboard/permissions/user",
        },
      ],
    },
    { feature_key: "settings", label: "Settings", href: "/dashboard/settings" },
];
