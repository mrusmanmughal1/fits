import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export type LoginFormValues = Yup.InferType<typeof loginValidationSchema>;

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export type ForgotPasswordFormValues = Yup.InferType<
  typeof forgotPasswordValidationSchema
>;

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type ResetPasswordFormValues = Yup.InferType<
  typeof resetPasswordValidationSchema
>;


// Validation schema
export const validationSchema = Yup.object().shape({
  socialTitle: Yup.string()
    .oneOf(["Mr.", "Mrs."], "Please select a valid social title")
    .required("Social title is required"),
  firstname: Yup.string()
    .matches(
      /^[A-Za-z. ]+$/,
      "Only letters and the dot (.) character, followed by a space, are allowed."
    )
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),
  lastname: Yup.string()
    .matches(
      /^[A-Za-z. ]+$/,
      "Only letters and the dot (.) character, followed by a space, are allowed."
    )
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export type RegisterFormValues = Yup.InferType<typeof validationSchema>;