export const options = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const userInitialValues = (mode, selectedItem) => {
  if (mode === "edit" && selectedItem) {
    return {
      name: selectedItem.name,
      image: selectedItem.image,
    };
  }
  return {
    name: "",
    image: null,
  };
};

// the backend logic here ...
export const userSubmit = (mode, selectedItem, values, closeModal) => {
  if (mode === "add") {
    console.log("Adding new user", values);
  } else if (mode === "edit") {
    console.log("Updating user", {
      id: selectedItem.id,
      ...values,
    });
  }
  closeModal();
};

export const userDelete = (user, t) => {
  console.log("Deleting user:", user);
  console.log(t);
};

export const userFreeze = (user, t) => {
  console.log("Freezing user:", user);
  console.log(t);
};

// User Page
export const getInitialValues = (id) => ({
  user_id: id,
  reason: "",
  severity: "medium",
  expires_at: null,
});

export const editWarning = (values) => {
  console.log("Updating warning:", values);
};

export const delWarning = (item) => {
  console.log("Deleting warning:", item);
};

export const delReport = (item) => {
  console.log("Deleting report:", item);
};
