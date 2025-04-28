class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errros = [],
    stack = "",
  ){
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.errors = errros;
    this.success = false;

    if(stack) {
      this.stack = stack;
    }else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}


module.exports = ApiError;