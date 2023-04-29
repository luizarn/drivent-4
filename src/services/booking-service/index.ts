import { notFoundError } from '@/errors';
import { cannotListBookingError } from '@/errors/cannot-list-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotListBookingError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListBookingError();
  }

  const room = await bookingRepository.checkBook(roomId);
  if (!room) throw notFoundError();

  const quantityRoomByBooking = await bookingRepository.listBookingsByRoomId(userId);
  if (room.capacity === quantityRoomByBooking.length) throw cannotListBookingError;

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);

  return bookingCreated;
}

async function getBookings(userId: number) {
  const bookings = await bookingRepository.findBookingUser(userId);
  if (!bookings) throw notFoundError();
  return bookings;
}

const bookingService = {
  getBookings,
  createBooking,
};

export default bookingService;
