import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navItems, subNavItems } from "../../constants/general";

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [expandedItem, setExpandedItem] = useState(null);

  // Check if current route is under product-ads
  const isAdsRoute = location.pathname.startsWith("/product-ads");

  // Initialize expanded state based on current route
  useEffect(() => {
    if (isAdsRoute) {
      setExpandedItem("/product-ads");
    }
  }, [isAdsRoute]);

  const toggleSubmenu = (itemTo, event) => {
    if (itemTo === "/product-ads") {
      event.preventDefault();
      setExpandedItem(expandedItem === "/product-ads" ? null : "/product-ads");
    }
  };

  // Helper function to determine if nav item is active
  const isNavItemActive = (to) => {
    return location.pathname === to || (to === "/product-ads" && isAdsRoute);
  };

  // Helper function to determine if sub nav item is active
  // const isSubNavItemActive = (to) => {
  //   return location.pathname === to;
  // };

  // NavLink active class styling
  const navLinkClass = ({ isActive }) =>
    `flex items-center p-2 ${isActive ? "font-semibold" : ""}`;

  return (
    <div className="bordered border-t-0 h-screen w-64 fixed md:static z-50 overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
        <nav className="flex-1 overflow-y-auto scrollbar-hide">
          {/* <ul className="divided">
            {navItems.map((item) => (
              <li key={item.to}>
                <div className="flex flex-col">
                  {item.to === "/product-ads" ? (
                    // Special handling for Ads item - button instead of NavLink
                    <button
                      onClick={(e) => toggleSubmenu(item.to, e)}
                      className={`flex items-center p-2 w-full text-left ${
                        isNavItemActive(item.to) ? "font-bold" : ""
                      }`}
                    >
                      <span className="ml-3">{t(item.label)}</span>
                    </button>
                  ) : (
                    // Regular navigation items
                    <NavLink to={item.to} className={navLinkClass}>
                      <span className="ml-3">{t(item.label)}</span>
                    </NavLink>
                  )}

                  {item.to === "/product-ads" &&
                    (expandedItem === "/product-ads" || isAdsRoute) && (
                      <ul className="ml-6 space-y-1">
                        {subNavItems.map((subItem, index) => (
                          <React.Fragment key={subItem.to}>
                            {index > 0 && (
                              <li className="bordered border-t-0" />
                            )}
                            <li>
                              <NavLink to={subItem.to} className={navLinkClass}>
                                <span>{t(subItem.label)}</span>
                              </NavLink>
                            </li>
                          </React.Fragment>
                        ))}
                      </ul>
                    )}
                </div>
              </li>
            ))}
          </ul> */}
        </nav>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
