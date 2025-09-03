import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

export const useTab = (tabs, basePath) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    const activeTabParam = searchParams.get("tab");
    if (!activeTabParam || tabs.length === 0) return 0;

    const tabIndex = tabs.findIndex(
      (tab) =>
        (tab.key && tab.key === `subcategory-${activeTabParam}`) ||
        tab.label.toLowerCase().replace(/\s+/g, "-") === activeTabParam
    );

    return tabIndex >= 0 ? tabIndex : 0;
  }, [searchParams, tabs]);

  const handleTabChange = (newTabIndex) => {
    const tab = tabs[newTabIndex];
    if (!tab) return;

    const tabIdentifier = tab.label.toLowerCase().replace(/\s+/g, "-");
    navigate(`${basePath}?tab=${tabIdentifier}`, { replace: true });
  };

  return {
    activeTab,
    handleTabChange,
  };
};
