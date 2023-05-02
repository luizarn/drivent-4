import { prisma } from '@/config';

async function findBookingUser(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: {
      Room: true,
    },
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
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
  });
}

async function updateBooking(roomId: number, bookingId: number) {
  return prisma.booking.update({
    where: { id: bookingId },
    data: {
      roomId,
    },
  });
}

const bookingRepository = {
  findBookingUser,
  createBooking,
  checkBook,
  listBookingsByRoomId,
  updateBooking,
};

export default bookingRepository;
