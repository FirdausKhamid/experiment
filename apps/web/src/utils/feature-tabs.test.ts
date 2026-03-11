import { filterTabsByFeatures, getVisibleNavigationTabs } from './feature-tabs';

type Tab = {
  feature_key: string;
  label: string;
  children?: Tab[];
};

const baseTabs: Tab[] = [
  { feature_key: 'a', label: 'A' },
  {
    feature_key: 'b',
    label: 'B',
    children: [
      { feature_key: 'b-child1', label: 'B1' },
      { feature_key: 'b-child2', label: 'B2' },
    ],
  },
];

describe('feature-tabs utils', () => {
  it('filterTabsByFeatures returns original when allowed is null', () => {
    const result = filterTabsByFeatures(baseTabs, null);
    expect(result).toBe(baseTabs);
  });

  it('filterTabsByFeatures filters by allowed set including children', () => {
    const allowed = new Set(['a', 'b', 'b-child2']);
    const result = filterTabsByFeatures(baseTabs, allowed);
    expect(result).toHaveLength(2);
    const b = result[1];
    expect(b.children?.map((c) => c.feature_key)).toEqual(['b-child2']);
  });

  it('getVisibleNavigationTabs returns all tabs when enabledFeatures is null or empty', () => {
    expect(getVisibleNavigationTabs(baseTabs, null)).toEqual(baseTabs);
    expect(getVisibleNavigationTabs(baseTabs, [])).toEqual(baseTabs);
  });

  it('getVisibleNavigationTabs uses enabled feature list', () => {
    const result = getVisibleNavigationTabs(baseTabs, ['a']);
    expect(result).toHaveLength(1);
    expect(result[0].feature_key).toBe('a');
  });
});

