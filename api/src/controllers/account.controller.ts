import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcrypt";
import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../utils/envConfig";

const prisma = new PrismaClient();

async function Register(req: Request, res: Response, next: NextFunction) {
  try {
    // console.log("Reached register");

    const { name, email, password, roleId, referralCode } = req.body;

    let referrer = null;
    if (referralCode) {
      referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (!referrer) {
        throw new Error("Invalid referral code");
      }
    }

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

      if (referrer) {
        // Grant points to the referrer
        await prisma.user.update({
          where: { id: referrer.id },
          data: { point: { increment: 30000 } },
        });

        // Issue a discount coupon to the new user
        await prisma.discountCoupon.create({
          data: {
            code: `DISCOUNT_${newUser.id}`,
            discount: 0.15,
            userId: newUser.id,
          },
        });
      }
    });

    res.status(200).send({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
}

async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const findUser = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!findUser) throw new Error("Invalid Email");

    // if (!findUser.isVerified)
    //   throw new Error("Please check email for verify account");

    const isValid = await compare(password, findUser.password);

    if (!isValid) throw new Error("Invalid password");

    const payload = {
      email,
      name: findUser.name,
      role: findUser.role.name,
    };

    const token = sign(payload, SECRET_KEY as string, { expiresIn: "1hr" });

    res.status(200).cookie("access_token", token).send({
      message: "success",
      data: token,
    });
  } catch (err) {
    next(err);
  }
}

export { Register, Login };
