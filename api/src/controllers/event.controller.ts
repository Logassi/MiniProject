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

    console.log("Get data from req.body");

    await prisma.$transaction(async (prisma) => {
      await prisma.event.create({
        data: {
          name,
          description,
          price,
          date,
          // date: new Date("2024-12-12T09:00:00"),// This one is for testing // Passing as Date object
          time,
          location,
          availableSeats,
          organizerId,
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

export { CreateEvent };
