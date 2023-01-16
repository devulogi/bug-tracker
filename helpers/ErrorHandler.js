const statusCodeMessages = {
  400: 'This is due to a bad request (e.g. malformed syntax, invalid request message framing, or deceptive request routing).',
  401: 'This is due to an unauthorized request (e.g. invalid credentials or missing token)',
  403: 'This is due to a forbidden request (e.g. you are not allowed to access this resource)',
  404: 'This is due to a not found request (page not found or resource not found)',
  409: 'This is due to a conflict request (e.g. duplicate entry, already exists, etc.)',
  500: 'This is due to an internal server error (e.g. database connection, etc.)',
};

class ErrorHandler extends Error {
  constructor({ error, status, request }) {
    super();
    this.statusCode = status;
    this.hint = statusCodeMessages[status];
    this.errors = error?.errors?.map(err => err.message) || [];
    this.method = request.method || '';
    this.endpoint = request.originalUrl || '';
    this.paylaod = request.body || {};
    this.timestamp = new Date().toISOString();
  }
  /**
   * This method is used to handle 404 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle400Error(error, request) {
    return new ErrorHandler({ error, status: 400, request });
  }
  /**
   * This method is used to handle 401 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle401Error(error, request) {
    return new ErrorHandler({ error, status: 401, request });
  }
  /**
   * This method is used to handle 403 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle403Error(error, request) {
    return new ErrorHandler({ error, status: 403, request });
  }
  /**
   * This method is used to handle 404 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle404Error(error, request) {
    return new ErrorHandler({ error, status: 404, request });
  }

  /**
   * This method is used to handle 409 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle409Error(error, request) {
    return new ErrorHandler({ error, status: 409, request });
  }
  /**
   * This method is used to handle 500 errors.
   * @param error - The error object.
   * @param request - The request object.
   * @return {ErrorHandler} - The ErrorHandler object.
   */
  static handle500Error(error, request) {
    return new ErrorHandler({ error, status: 500, request });
  }
}

module.exports = { ErrorHandler };
