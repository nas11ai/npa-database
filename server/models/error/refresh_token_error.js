class RefreshTokenError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = RefreshTokenError;
