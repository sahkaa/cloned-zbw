import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageHandler } from '@app/shared/utilities/error-message-handler';

describe('ErrorMessageHandler', () => {
  it('should return the default message when no defaultMessage provided', () => {
    expect(ErrorMessageHandler.getErrorMessage(<HttpErrorResponse>{ status: 0 }))
      .toBe('There was an error when communicating with the backend.');
  });

  it('should return the defaultMessage on status === 0', () => {
    const DEFAULT_MESSAGE: string = 'Default Message';

    expect(ErrorMessageHandler.getErrorMessage(<HttpErrorResponse>{ status: 0 }, DEFAULT_MESSAGE))
      .toBe(DEFAULT_MESSAGE);
  });

  it('should return the response message when status !== 0', () => {
    const MESSAGE: string = 'Default Message';

    expect(ErrorMessageHandler.getErrorMessage(<HttpErrorResponse>{
      status: 1,
      error: { message: MESSAGE }
    })).toBe(MESSAGE);
  });
});
