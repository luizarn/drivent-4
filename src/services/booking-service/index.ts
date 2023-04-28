import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

// async function checkTicket(userId: number) {
//   const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

//   const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

//   if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
//     throw cannotListBookingError();
//   }
// }

async function getBookings(userId: number) {
  const bookings = await bookingRepository.findBookingUser(userId);
  if (!bookings) throw notFoundError();
  return bookings;
}

const bookingService = {
  getBookings,
};

export default bookingService;
