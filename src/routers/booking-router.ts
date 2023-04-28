import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getBookings } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('/', getBookings);

export { bookingRouter };

// .post('/', validateBody(bookingSchema), createBooking)
// .put('/:bookingId', attBooking);
