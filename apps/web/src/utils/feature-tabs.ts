/**
 * Type for tab-like items that can be filtered by feature_key (used by navigation tabs).
 */
export type TabWithFeatureKey = {
  feature_key: string;
  children?: TabWithFeatureKey[];
};

/**
 * Filter tabs to only those whose feature_key is in the allowed set.
 * If allowed is null/undefined, returns tabs unchanged (e.g. no features in login response).
 * Nested children are filtered the same way; parents with no visible children are still shown if allowed.
 */
export function filterTabsByFeatures<T extends TabWithFeatureKey>(
  tabs: T[],
  allowed: Set<string> | null | undefined,
): T[] {
  if (allowed == null) return tabs;
  return tabs
    .filter((tab) => allowed.has(tab.feature_key))
    .map((tab) => ({
      ...tab,
      children: tab.children?.length
        ? (filterTabsByFeatures(tab.children, allowed) as T["children"])
        : undefined,
    }));
}

/**
 * Compute visible tabs from a base list and an enabled-features list.
 * If enabledFeatures is null or empty, all base tabs are returned.
 */
export function getVisibleNavigationTabs<T extends TabWithFeatureKey>(
  baseTabs: T[],
  enabledFeatures: string[] | null,
): T[] {
  const allowed: Set<string> | null =
    enabledFeatures != null && enabledFeatures.length > 0
      ? new Set(enabledFeatures)
      : null;
  return filterTabsByFeatures(baseTabs, allowed);
}
