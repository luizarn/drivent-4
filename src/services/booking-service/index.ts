import { notFoundError } from '@/errors';
import { cannotListBookingError } from '@/errors/cannot-list-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotListBookingError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status !== 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListBookingError();
  }

  const room = await bookingRepository.checkBook(roomId);
  if (!room) throw notFoundError();

  const quantityRoomByBooking = await bookingRepository.listBookingsByRoomId(roomId);
  if (room.capacity === quantityRoomByBooking.length) throw cannotListBookingError();

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);

  return bookingCreated;
}

async function getBookings(userId: number) {
  const bookings = await bookingRepository.findBookingUser(userId);
  if (!bookings) throw notFoundError();
  return bookings;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const booking = await bookingRepository.findBookingUser(bookingId);
  if (!booking || booking.userId !== userId) throw cannotListBookingError();

  const room = await bookingRepository.checkBook(roomId);
  if (!room) throw notFoundError();

  const quantityRoomByBooking = await bookingRepository.listBookingsByRoomId(roomId);
  if (room.capacity === quantityRoomByBooking.length) throw cannotListBookingError;

  const bookingUpdated = await bookingRepository.updateBooking(roomId, bookingId);
  if (!bookingUpdated) throw notFoundError();
  return bookingUpdated;
}

const bookingService = {
  getBookings,
  createBooking,
  updateBooking,
};

export default bookingService;
