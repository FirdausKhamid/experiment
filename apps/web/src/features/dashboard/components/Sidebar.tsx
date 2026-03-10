"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationTab } from "../models/navigation";

type SidebarProps = {
  tabs: NavigationTab[];
  header?: React.ReactNode;
};

function NavItem({ tab, depth = 0 }: { tab: NavigationTab; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === tab.href;

  return (
    <div
      className="sidebar-nav-group"
      style={{ paddingLeft: depth > 0 ? `${depth * 0.75}rem` : undefined }}
    >
      <Link
        href={tab.href}
        className={`sidebar-nav-link ${isActive ? "sidebar-nav-link-active" : ""}`}
      >
        {tab.icon && <span className="sidebar-nav-icon">{tab.icon}</span>}
        <span className="sidebar-nav-label">{tab.label}</span>
      </Link>
      {tab.children?.length ? (
        <div className="sidebar-nav-children">
          {tab.children.map((child) => (
            <NavItem key={child.feature_key} tab={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Sidebar({ tabs, header }: SidebarProps) {
  return (
    <aside className="sidebar">
      {header ? <div className="sidebar-header">{header}</div> : null}
      <nav className="sidebar-nav" aria-label="Main navigation">
        {tabs.map((tab) => (
          <NavItem key={tab.feature_key} tab={tab} />
        ))}
      </nav>
    </aside>
  );
}
