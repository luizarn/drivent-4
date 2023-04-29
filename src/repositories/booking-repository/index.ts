import { prisma } from '@/config';

async function findBookingUser(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    },
  });
}

async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function checkBook(roomId: number) {
  return prisma.room.findFirst({
    where: { id: roomId },
  });
}
async function listBookingsByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: { roomId },
    include: { Room: true },
  });
}

const bookingRepository = {
  findBookingUser,
  createBooking,
  checkBook,
  listBookingsByRoomId,
};

export default bookingRepository;
