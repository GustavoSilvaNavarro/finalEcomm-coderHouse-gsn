'use strict';

export class AppErrors extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }

  setError() {
    return {
      message: this.message,
      status: this.status,
      stack: this.stack,
    };
  }
}
