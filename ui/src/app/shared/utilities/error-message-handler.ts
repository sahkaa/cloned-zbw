import { HttpErrorResponse } from '@angular/common/http';

export class ErrorMessageHandler {

  /**
   * When the backend does not answer there isn't an error message.
   * This method handles this situation by identifying the condition to add a default message that can be customized
   * @param {HttpErrorResponse} error The error received from the backend
   * @oaram {string} defaultMessage The optional default message to be shown if not received
   */
  public static getErrorMessage(error: HttpErrorResponse, defaultMessage?: string): string {
    if (error.status === 0) {
      return defaultMessage ? defaultMessage : 'There was an error when communicating with the backend.';
    } else {
      return error.error.message;
    }
  }

}
