import { PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log("Reached register");

    const { name, email, password, roleId, referralCode } = req.body;

    const findUserEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (findUserEmail) throw new Error("Email Sudah ada");

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);
    console.log("Password Hashed");

    await prisma.$transaction(async (prisma) => {
      console.log("Sending Data to Database");

      // Create user without referral code first
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashPassword,
          roleId,
        },
      });

      // Extract the first name (first part of the name)
      const firstName = name.trim().split(" ")[0]; // Takes the first word as the first name

      // Ensure firstName is not empty
      if (!firstName) {
        throw new Error("First name is required");
      }
      // Generate referral code
      const userIdString = newUser.id.toString().padStart(3, "0");
      const referralCode = `${firstName}_${userIdString.slice(-3)}`;

      // Update user with referral code
      await prisma.user.update({
        where: { id: newUser.id },
        data: { referralCode: referralCode },
      });

      console.log("Referral code generated and updated");
    });

    res.status(200).send({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
}

// async function GetAllUserData(req: Request, res: Response, next: NextFunction) {
//   try {
//     // SELECT * FROM user
//     const data = await prisma.user.findMany();

//     res.status(200).send({
//       message: "success",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// }

export {
  Register,
  //  GetAllUserData
};
