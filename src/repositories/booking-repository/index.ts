import { prisma } from '@/config';

async function findBookingUser(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    select: {
      id: true,
      Room: true,
    },
  });
}

// async function createPayment(ticketId: number, params: PaymentParams) {
//   return prisma.payment.create({
//     data: {
//       ticketId,
//       ...params,
//     },
//   });
// }
const bookingRepository = {
  findBookingUser,
};

export default bookingRepository;
