import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createBooking, getBookings, updateBooking } from '@/controllers/booking-controller';
import { bookingSchema } from '@/schemas/booking-schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBookings)
  .post('/', validateBody(bookingSchema), createBooking)
  .put('/:bookingId', validateBody(bookingSchema), updateBooking);

export { bookingRouter };

// .post('/', validateBody(bookingSchema), createBooking)
// .put('/:bookingId', attBooking);
