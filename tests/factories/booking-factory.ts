import { prisma } from '@/config';

export async function createBookingFactory(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
    },
  });
}
