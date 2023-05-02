import { ApplicationError } from '@/protocols';

export function cannotListBookingError(): ApplicationError {
  return {
    name: 'cannotListBookingError',
    message: 'Cannot list booking!',
  };
}
