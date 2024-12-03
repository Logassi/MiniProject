// import { compare } from "bcrypt";
// import { sign } from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";
// import { SECRET_KEY } from "../utils/envConfig";

// const prisma = new PrismaClient();

// export async function loginUser(email: string, password: string) {
//   const findUser = await prisma.user.findUnique({
//     where: { email },
//     include: { role: true },
//   });

//   if (!findUser) throw new Error("Invalid Email");

//   const isValid = await compare(password, findUser.password);
//   if (!isValid) throw new Error("Invalid password");

//   const payload = {
//     email,
//     name: findUser.name,
//     role: findUser.role.name,
//   };

//   const token = sign(payload, SECRET_KEY as string, { expiresIn: "1hr" });
//   return token;
// }
