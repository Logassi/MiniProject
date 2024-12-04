"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@/libs/axios";
import Swal from "sweetalert2";
import RegisterSchema from "./schema";
import { useRouter } from "next/navigation";
import IRegister from "../types";

export default function RegisterForm() {
  const router = useRouter();

  const handleRegister = async (params: IRegister) => {
    try {
      const data = {
        ...params,
        roleId: parseInt(params.roleId),
      };

      const response = await axiosInstance.post(
        "/account-management/register",
        data
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in with your credentials.",
        showConfirmButton: true,
      }).then(() => {
        router.push("/login"); // Redirect to login page after success
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          roleId: "1", // Default to 'attendee' role
          referralCode: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Referral
              </label>
              <Field
                type="referralCode"
                name="referralCode"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="referralCode"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Role
              </label>
              <Field
                as="select"
                name="roleId"
                className="w-full p-2 border rounded-md"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="1">Attendee</option>
                <option value="2">Event Organizer</option>
              </Field>
              <ErrorMessage
                name="roleId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
