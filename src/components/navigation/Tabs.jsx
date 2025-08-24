import { useState, useEffect } from "react";
import PropTypes from "prop-types";





const Tabs = ({
  tabs,
  activeTab: controlledActiveTab,
  defaultActiveTab = 0,
  tabClassName = "",
  activeTabClassName = "border-green-500 text-green-700",
  inactiveTabClassName = "border-transparent text-black ",
  tabListClassName = "border-b border-gray-200",
  tabPanelClassName = "p-4",
  onChange,
  orientation = "horizontal", 
  disabledTabs = [],
  storageKey = "activeTab", // Optional: allow custom localStorage key
}) => {
  const isControlled = controlledActiveTab !== undefined;
  
  // Get initial tab from localStorage or use default
  const getInitialActiveTab = () => {
    if (isControlled) return controlledActiveTab;
    try {
      const savedTab = localStorage.getItem(storageKey);
      return savedTab !== null ? parseInt(savedTab, 10) : defaultActiveTab;
    } catch {
      return defaultActiveTab;
    }
  };

  const [internalActiveTab, setInternalActiveTab] = useState(getInitialActiveTab);

  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  const handleTabChange = (index) => {
    if (disabledTabs.includes(index)) return;

    if (!isControlled) {
      setInternalActiveTab(index);
      try {
        localStorage.setItem(storageKey, index.toString());
      } catch (error) {
        console.error("Failed to save tab state:", error);
      }
    }

    if (onChange) {
      onChange(index);
    }
  };

  // Effect to handle external changes to controlledActiveTab
  useEffect(() => {
    if (isControlled && controlledActiveTab !== activeTab) {
      setInternalActiveTab(controlledActiveTab);
    }
  }, [controlledActiveTab, isControlled]);

  // Effect to sync localStorage when defaultActiveTab changes
  useEffect(() => {
    if (!isControlled) {
      try {
        localStorage.setItem(storageKey, internalActiveTab.toString());
      } catch (error) {
        console.error("Failed to save tab state:", error);
      }
    }
  }, [internalActiveTab, isControlled, storageKey]);

  const isVertical = orientation === "vertical";

  return (
    <div className={isVertical ? "flex" : ""}>
      {/* Tab List */}
      <div
        className={`${
          isVertical ? "flex-col border-r" : "flex justify-between border-b"
        } ${tabListClassName}`}
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`whitespace-nowrap uppercase py-4 px-4 ${
              isVertical ? "border-r-2" : "border-b-2"
            } font-medium text-sm ${tabClassName} ${
              activeTab === index ? activeTabClassName : inactiveTabClassName
            } ${
              disabledTabs.includes(index)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleTabChange(index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-disabled={disabledTabs.includes(index)}
            disabled={disabledTabs.includes(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div
        className={tabPanelClassName}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {tabs.map((tab, index) => (
          <div key={index} className={activeTab === index ? "block" : "hidden"}>
            {typeof tab.content === "function" ? tab.content() : tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};



Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number,

  defaultActiveTab: PropTypes.number,
  storageKey:PropTypes.number,
  tabClassName: PropTypes.string,
  activeTabClassName: PropTypes.string,
  inactiveTabClassName: PropTypes.string,
  tabListClassName: PropTypes.string,
  tabPanelClassName: PropTypes.string,
  onChange: PropTypes.func,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  disabledTabs: PropTypes.arrayOf(PropTypes.number),
};

export default Tabs;


{/* <Tabs
  tabs={tabs}
  tabListWidth="300px"
  tabPanelWidth="calc(100% - 200px)"
  onChange={handleTabChange}
/>;
  const [activeTab, setActiveTab] = useState(0);
  const [lastChangedTab, setLastChangedTab] = useState(null);
  const tabs = [
    {
      label: "Tab 1",
      content: <div>This is content for Tab 1</div>,
    },
    {
      label: "Tab 2",
      content: <div>This is content for Tab 2</div>,
    },
    {
      label: "Tab 3",
      content: () => <div>This is dynamically rendered content for Tab 3</div>,
    },
  ];

  const handleTabChange = (newTabIndex) => {
    console.log("Tab changed to:", newTabIndex);
    setLastChangedTab(newTabIndex);
    setActiveTab(newTabIndex);

    // Update the URL with the tab label as a parameter
    const tabLabel = tabs[newTabIndex].label.toLowerCase().replace(/\s+/g, "-");
    navigate(`/settings/${tabLabel}`);
  }; */}