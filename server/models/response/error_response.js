const { API_VERSION } = require("../../utils/config");

class ErrorResponse {
  constructor(code, status, errors) {
    this.code = code;
    this.status = status;
    this.errors = errors;
    this.meta = {
      //TODO: Masukkan version di .env
      version: API_VERSION,
      timestamp: new Date().toLocaleString(),
    };
  }
}

module.exports = ErrorResponse;
