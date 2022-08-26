import { HttpStatus } from '@nestjs/common';

export class ErrorEntity extends Error {
  error?: string;
  error_code?: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
  meta_data?: any;
  internal_error: any;
  http_code: number;
  constructor({
    http_code = HttpStatus.INTERNAL_SERVER_ERROR,
    error = undefined,
    error_code = undefined,
    error_description = undefined,
    error_uri = undefined,
    state = undefined,
    meta_data = undefined,
    internal_error = undefined,
  }: {
    http_code?: number;
    error?: string;
    error_code?: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
    meta_data?: any;
    internal_error?: string;
  }) {
    super(error);
    this.error = error;
    this.error_code = error_code;
    this.error_description = error_description;
    this.error_uri = error_uri;
    this.state = state;
    this.internal_error = internal_error;
    this.meta_data = meta_data;
    this.http_code = http_code;
  }
  toWebSafe() {
    delete this.internal_error;
    return JSON.stringify(this);
  }
}
