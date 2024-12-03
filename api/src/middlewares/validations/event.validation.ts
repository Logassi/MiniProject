import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const EventValidator = [
  // Validate the event name
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  // Validate the event description
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 5 })
    .withMessage("Description must be at least 5 characters"),

  // Validate the event price
  body("price")
    .isInt({ min: 0 })
    .withMessage("Price must be a valid integer greater than or equal to 0"),

  // Validate the event date (ISO-8601 DateTime format)
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 datetime"),

  // Validate the event time (HH:mm format)
  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Time must be in HH:mm format"),

  // Validate the event location
  body("location").notEmpty().withMessage("Location is required"),

  // Validate availableSeats (must be an integer)
  body("availableSeats")
    .isInt({ min: 1 })
    .withMessage("AvailableSeats must be a positive integer"),

  // Validate the organizerId (should be a positive integer)
  body("organizerId")
    .isInt()
    .withMessage("OrganizerId must be a valid positive integer"),

  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      console.log(errors);

      if (!errors.isEmpty()) throw new Error(errors.array()[0].msg);
      console.log("Validated");

      next();
    } catch (error) {
      console.log("Not Validated");

      next(error);
    }
  },
];
