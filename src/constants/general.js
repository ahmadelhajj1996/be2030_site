export const languages = [
  { name: "english", code: "en" },
  { name: "arabic", code: "ar" },
];

export const navItems = [
  { to: "/", label: "home" },
  { to: "/customers", label: "Customers" },
  { to: "/stores", label: "Stores" },
  { to: "/sellers", label: "Sellers" },
  { to: "/product-ads", label: "Ads" },
  { to: "/categories", label: "Categories" },
  { to: "/settings", label: "settings" },
];

export const subNavItems = [
  { to: "/product-ads", label: "Products" },
  { to: "/job-ads", label: "Job Vacancies" },
  { to: "/job-seeking", label: "Job Seeking" },
  // { to: "/services-ads", label: "Services" },
  // { to: "/offers", label: "Offers" },
];

export const modalActions = {
  OPEN_VIEW: "OPEN_VIEW",
  OPEN_ADD: "OPEN_ADD",
  OPEN_FREEZE: "OPEN_FREEZE",
  OPEN_EDIT: "OPEN_EDIT",
  OPEN_DELETE: "OPEN_DELETE",
  CLOSE_ALL: "CLOSE_ALL",
};

export const modalReducer = (state, action) => {
  switch (action.type) {
    case modalActions.OPEN_VIEW:
      return {
        isModalOpen: true,
        isDeleteOpen: false,
        selectedItem: action.payload,
        mode: "view",
      };

    case modalActions.OPEN_ADD:
      return {
        isModalOpen: true,
        isDeleteOpen: false,
        selectedItem: null,
        mode: "add",
      };
    case modalActions.OPEN_FREEZE:
      return {
        isModalOpen: true,
        isDeleteOpen: false,
        selectedItem: action.payload,
        mode: "freeze",
      };
    case modalActions.OPEN_EDIT:
      return {
        isModalOpen: true,
        isDeleteOpen: false,
        selectedItem: action.payload,
        mode: "edit",
      };
    case modalActions.OPEN_DELETE:
      return {
        isModalOpen: false,
        isDeleteOpen: true,
        selectedItem: action.payload,
        mode: null,
      };
    case modalActions.CLOSE_ALL:
      return {
        isModalOpen: false,
        isDeleteOpen: false,
        selectedItem: null,
        mode: null,
      };
    default:
      return state;
  }
};
