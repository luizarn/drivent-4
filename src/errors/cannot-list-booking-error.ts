import { ApplicationError } from '@/protocols';

export function cannotListBookingError(): ApplicationError {
  return {
    name: 'CannotListHotelsError',
    message: 'Cannot list booking!',
  };
}
