import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';
import { InputBookingBody } from '@/protocols';

export async function getBookings(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
    const bookings = await bookingService.getBookings(Number(userId));
    return res.status(httpStatus.OK).send({
      id: bookings.id,
      Room: bookings.Room,
    });
  } catch (error) {
    next(error);
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { roomId } = req.body as InputBookingBody;

  try {
    const bookingCreated = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.CREATED).send({
      id: bookingCreated.id,
    });
  } catch (e) {
    next(e);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { bookingId } = req.params;

  try {
    const updatedRoom = await bookingService.updateBooking(userId, Number(bookingId));
    return res.status(httpStatus.CREATED).send({
      id: updatedRoom.id,
    });
  } catch (e) {
    next(e);
  }
}
