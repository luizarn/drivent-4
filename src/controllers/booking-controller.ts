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
  const roomId: number = req.body.roomId;

  try {
    const bookingCreated = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send({
      bookingId: bookingCreated.id,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'cannotListBookingError') {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    return res.sendStatus(httpStatus.FORBIDDEN);
  }
}

export async function updateBooking(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  const { bookingId } = req.params;
  const { roomId } = req.body;

  try {
    const updatedRoom = await bookingService.updateBooking(userId, Number(bookingId), Number(roomId));
    return res.status(httpStatus.OK).send({
      bookingId: updatedRoom.id,
    });
  } catch (e) {
    next(e);
  }
}
