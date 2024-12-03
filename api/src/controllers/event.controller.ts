import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

async function CreateEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      name,
      description,
      price,
      date,
      time,
      location,
      availableSeats,
      organizerId,
    } = req.body;

    console.log(req.body);
    console.log(typeof date);

    const parsedDate = new Date(date); // Ensure this is a valid date

    console.log(typeof parsedDate);

    console.log("Get data from req.body");

    await prisma.$transaction(async (prisma) => {
      await prisma.event.create({
        data: {
          name,
          description,
          price,
          date,
          // date: parsedDate,
          // date: new Date("2024-12-12T09:00:00"), // This one is for testing // Passing as Date object
          time,
          location,
          availableSeats,
          organizerId,
          // organizerId: 6, // testing postman
        },
      });
      console.log("Trying to send data");
    });

    console.log("Event Created");

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    next(error);
  }
}

export {
  CreateEvent,
  // GetAllEventCreated
};
