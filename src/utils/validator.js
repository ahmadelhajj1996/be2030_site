import * as yup from "yup";

// Basic field validations
const email = yup.string().email().required();
const password = yup.string().required().min(8);
const name = yup.string().required("Name is required");
const image = yup.mixed().nullable();

// Schemas
export const categorySchema = yup.object({
  name,
  image,
});

export const addCategorySchema = yup.object().shape({
  name: yup.object().shape({
    en: yup.string().required("English name is required"),
    ar: yup.string().required("Arabic name is required"),
  }),
  image: yup.mixed().nullable(),
});

export const editCategorySchema = yup.object().shape({
  name: yup.string().required(),
  image: yup.mixed().nullable(),
});

export const warningSchema = yup.object().shape({
  reason: yup.string().required("Reason is required"),
  expires_at: yup
    .date()
    .required("Expiration date is required")
    .min(new Date(), "Expiration date must be in the future")
    .typeError("Please provide a valid date"),
});

export const loginSchema = yup.object({
  email,
  password,
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required().min(8),
});

// Phone validation (commented out as it requires translation function)
// export const phoneSchema = yup.object({
//   phone: yup
//     .string()
//     .required(t("yup.required", { field: t("user.phone") }))
//     .matches(/^\d{9}$/, t("yup.must", { field: t("user.phone"), num: 9 }))
// });

// Export all schemas as an object for easier imports
export default {
  categorySchema,
  addCategorySchema,
  editCategorySchema,
  warningSchema,
  loginSchema,
  registerSchema,
  // phoneSchema,
};
