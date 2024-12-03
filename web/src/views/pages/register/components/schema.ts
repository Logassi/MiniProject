import { object, string, number } from "yup";

const RegisterSchema = object({
  name: string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters long"),
  email: string().email("Invalid email format").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  roleId: number()
    .required("Role is required")
    .oneOf(
      [1, 2],
      "Role must be either 'Event Organizer' (1) or 'Attendee' (2)"
    ),
});

export default RegisterSchema;
