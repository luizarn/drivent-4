import { prisma } from '@/config';

async function findBookingUser(bookingId: number) {
  return prisma.booking.findFirst({
    where: { id: bookingId },
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
