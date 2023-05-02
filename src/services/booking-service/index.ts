import { notFoundError } from '@/errors';
import { cannotListBookingError } from '@/errors/cannot-list-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotListBookingError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== 'PAID' || !ticket) {
    throw cannotListBookingError();
  }

  const room = await bookingRepository.checkBook(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw cannotListBookingError();

  const bookingCreated = await bookingRepository.createBooking(userId, roomId);
  return bookingCreated;
}

async function getBookings(userId: number) {
  const bookings = await bookingRepository.findBookingUser(userId);
  if (!bookings) throw notFoundError();
  return bookings;
}

async function updateBooking(userId: number, bookingId: number, roomId: number) {
  const booking = await bookingRepository.findBookingUser(bookingId);
  if (!booking || booking.userId !== userId) throw cannotListBookingError();

  const room = await bookingRepository.checkBook(roomId);
  if (!room) throw notFoundError();

  if (room.capacity <= room.Booking.length) throw cannotListBookingError();

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
