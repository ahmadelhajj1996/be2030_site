import {  NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { navItems } from "../../constants/general";

const Sidebar = () => {
  const { t } = useTranslation();
 
  
  const navLinkClass = ({ isActive }) =>
    `flex items-center p-2 ${isActive ? "font-semibold" : ""}`;

  return (
    <div className="bordered border-t-0 h-screen w-64 fixed md:static z-50 overflow-hidden">
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
        <nav className="flex-1 overflow-y-auto scrollbar-hide">
          <ul className="divided">
            {navItems.map((item) => (
              <li key={item.to}>
                <div className="flex flex-col">
                   
                    <NavLink to={item.to} className={navLinkClass}>
                      <span className="ml-3">{t(item.label)}</span>
                    </NavLink>

              
                </div>
              </li>
            ))}
          </ul>
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
