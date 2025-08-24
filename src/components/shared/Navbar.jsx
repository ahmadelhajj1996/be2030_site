import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToastr from "../../hooks/useToastr";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { GrLanguage } from "react-icons/gr";
// import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { languages } from "../../constants/general";
import { useDispatch } from "react-redux";
import { setLang } from "../../store/settingSlice";
import Delete from "../feedback/Delete";
import { useModal } from "../../hooks/useModal";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const toastr = useToastr();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLangLoaded, setIsLangLoaded] = useState(false);

  const { modalState, openDeleteModal, closeAllModals } = useModal();

  const dropdownRefs = {
    language: useRef(null),
    notifications: useRef(null),
    user: useRef(null),
  };

  const { i18n, t } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(savedLang).then(() => {
      document.dir = savedLang === "ar" ? "rtl" : "ltr";
      setIsLangLoaded(true);
    });

    const handleClickOutside = (event) => {
      const isOutside = (ref) =>
        ref.current && !ref.current.contains(event.target);

      if (
        (openDropdown === "language" && isOutside(dropdownRefs.language)) ||
        (openDropdown === "notifications" &&
          isOutside(dropdownRefs.notifications)) ||
        (openDropdown === "user" && isOutside(dropdownRefs.user))
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, i18n]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang.code).then(() => {
      document.dir = lang.code === "ar" ? "rtl" : "ltr";
      localStorage.setItem("lang", lang.code);
      setOpenDropdown(null);
      dispatch(setLang(lang.code));
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://phplaravel-1483035-5732108.cloudwaysapps.com/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      navigate("/login");
      toastr("Logged Out Successfully ... ", "success");
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      closeAllModals();
    }
  };

  if (!isLangLoaded) {
    return null;
  }

  return (
    <>
      <nav className="textb bordered border-t-0 p-2 flex items-center justify-between sticky top-0 z-50">
        <div></div>
        <div
          className={`flex items-center space-x-8 ${
            i18n.language === "ar" ? "space-x-reverse" : ""
          }`}
        >
          <div className="relative" ref={dropdownRefs.language}>
            <button
              onClick={() => toggleDropdown("language")}
              className="mt-1"
              aria-label="Language selector"
            >
              <GrLanguage className="h-6 w-6" />
            </button>

            {openDropdown === "language" && (
              <div
                className={`absolute ${
                  i18n.language === "ar" ? "left-0" : "right-0"
                } mt-3 w-48 textb bordered z-50 divided`}
              >
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`block px-4 py-2 text-sm hovered cursor-pointer ${
                      i18n.language === "ar" ? "text-right" : "text-left"
                    }`}
                    onClick={() => handleLanguageSelect(lang)}
                  >
                    {t(lang.name)}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRefs.user}>
            <div
              onClick={() => toggleDropdown("user")}
              className="p-1"
              aria-label="User menu"
            >
              <FaRegUserCircle className="h-6 w-6" />
            </div>
            {openDropdown === "user" && (
              <div
                className={`absolute ${
                  i18n.language === "ar" ? "left-0" : "right-0"
                } mt-2 w-48 textb bordered z-50 divided`}
              >
                <div
                  onClick={openDeleteModal}
                  className={`block px-4 py-3 text-sm hovered w-full ${
                    i18n.language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("logout")}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <Delete
        isOpen={modalState.isDeleteOpen}
        isDelete={false}
        action="Logout"
        onClose={closeAllModals}
        onConfirm={handleLogout}
        itemName={t("confirmLogout")}
      />
    </>
  );
};

export default Navbar;
