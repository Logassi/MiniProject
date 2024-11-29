"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axiosInstance from "@/libs/axios";
import Swal from "sweetalert2";
import EventSchema from "./schema";
import { useRouter } from "next/navigation";
import IEvent from "../types";

export default function EventCreateForm() {
  const router = useRouter();

  // Form submission handler
  const createEvent = async (params: IEvent) => {
    try {
      const formattedParams = {
        ...params,
        date: new Date(params.date).toISOString(), // Ensure proper date format
      };

      const { data } = await axiosInstance.post(
        "/event-management/create",
        formattedParams
      );
      Swal.fire({
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => router.push("/")); // Redirect after success
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to create event. Please try again. ${err}`,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Create New Event
      </h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          price: 0,
          date: new Date(),
          time: "",
          location: "",
          availableSeats: 0,
          organizerId: 0,
        }}
        validationSchema={EventSchema}
        onSubmit={createEvent}
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
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <Field
                type="number"
                name="price"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Date
              </label>
              <Field
                type="date"
                name="date"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Time
              </label>
              <Field
                type="time"
                name="time"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="time"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Location
              </label>
              <Field
                type="text"
                name="location"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Available Seats
              </label>
              <Field
                type="number"
                name="availableSeats"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="availableSeats"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Organizer Id
              </label>
              <Field
                type="number"
                name="organizerId"
                className="w-full p-2 border rounded-md"
              />
              <ErrorMessage
                name="organizerId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {isSubmitting ? "Submitting..." : "Create Event"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
