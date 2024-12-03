"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@/libs/axios";
import Swal from "sweetalert2";
import LoginSchema from "./schema";
import { useRouter } from "next/navigation";
import ILogin from "../types";
import useAuthStore, { IUser } from "@/stores/user-store";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import ErrorHandler from "@/utils/errorHandler";

const handleLogin = async (onAuthSuccess: (user: IUser | null) => void) => {
  try {
    const access_token = (getCookie("access_token") as string) || "";

    if (access_token) {
      const user: IUser = jwtDecode(access_token);
      setCookie("access_token", access_token);
      onAuthSuccess(user);
    }

    return;
  } catch (error: any) {
    deleteCookie("access_token");
    throw error;
  }
};

export default function LoginForm() {
  const { onAuthSuccess } = useAuthStore();
  const router = useRouter();

  const login = async (params: ILogin) => {
    try {
      const { data } = await axiosInstance.post(
        "/account-management/login",
        params
      );

      await handleLogin(onAuthSuccess);

      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 3000,
      }).then(() => router.push("/"));
    } catch (error) {
      ErrorHandler(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={login}
      >
        {({ isSubmitting }) => (
          <Form>
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
