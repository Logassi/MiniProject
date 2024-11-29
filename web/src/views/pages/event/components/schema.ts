import { object, string, number, date } from "yup";

const EventSchema = object({
  name: string().required("Name is required"),
  description: string().required("Description is required"),
  price: number()
    .min(0, "Price must be at least 0")
    .required("Price is required"),
  date: date().required("Date is required"),
  time: string().required("Time is required"),
  location: string().required("Location is required"),
  availableSeats: number()
    .min(1, "There must be at least 1 available seat")
    .required("Available seats are required"),
  organizerId: number()
    .min(1, "There must be at least 1 available seat")
    .required(),
});

export default EventSchema;
