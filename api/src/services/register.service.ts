// import { PrismaClient } from "@prisma/client";
// import { genSalt, hash } from "bcrypt";

// export async function registerUser(
//   name: string,
//   email: string,
//   password: string,
//   roleId: number,
//   tx: PrismaClient // Pass the transaction context here
// ) {
//   const salt = await genSalt(10);
//   const hashPassword = await hash(password, salt);

//   const findUserEmail = await tx.user.findUnique({
//     where: { email },
//   });

//   if (findUserEmail) throw new Error("Email already exists");

//   const newUser = await tx.user.create({
//     data: {
//       name,
//       email,
//       password: hashPassword,
//       roleId,
//     },
//   });

//   return newUser;
// }
