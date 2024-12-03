// import { PrismaClient } from "@prisma/client";

// export async function processReferral(
//   referralCode: string | undefined,
//   newUserId: number,
//   prisma: PrismaClient
// ) {
//   let referrer = null;
//   if (referralCode) {
//     referrer = await prisma.user.findUnique({
//       where: { referralCode },
//     });

//     if (!referrer) {
//       throw new Error("Invalid referral code");
//     }
//   }

//   if (referrer) {
//     // Grant points to the referrer
//     await prisma.user.update({
//       where: { id: referrer.id },
//       data: { point: { increment: 30000 } },
//     });

//     // Issue a discount coupon to the new user
//     await prisma.discountCoupon.create({
//       data: {
//         code: `DISCOUNT_${newUserId}`,
//         discount: 0.15,
//         userId: newUserId,
//       },
//     });
//   }
// }
