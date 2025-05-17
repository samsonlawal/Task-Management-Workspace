import * as yup from "yup";

export const signupSchema = yup.object().shape({
  fullname: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name cannot be empty"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email cannot be empty"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password cannot be empty"),
  terms: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms and Conditions")
    .required("You must agree to the Terms and Conditions"),
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Passwords must match")
  //   .required("Please confirm your password"),
});
