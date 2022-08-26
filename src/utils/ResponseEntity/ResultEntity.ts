import { HttpStatus } from '@nestjs/common';
import { ResultEntityTypes } from './enums/ResultEntityTypes';
import { ErrorEntity } from './ErrorEntity';

export class ResultEntity {
  success = false;
  code?: any;
  description?: string;
  data?: any;
  error?: any;
  meta_data?: any;
  content_type: string = ResultEntityTypes.json;
  constructor({
    sucess = false,
    code = undefined,
    description = undefined,
    data = undefined,
    meta_data = undefined,
  }: {
    sucess?: boolean;
    code?: any;
    description?: string;
    data?: any;
    meta_data?: any;
  }) {
    this.success = sucess;
    this.code = code;
    this.description = description;
    this.data = data;
    this.meta_data = meta_data;
  }

  setData({
    code = HttpStatus.OK,
    description = undefined,
    data = undefined,
    meta_data = undefined,
  }: {
    code?: any;
    description?: string;
    data?: any;
    meta_data?: any;
  }) {
    this.success = true;
    this.code = code;
    this.data = data;
    this.description = description;
    this.meta_data = meta_data;
    this.content_type = ResultEntityTypes.json;
  }

  setDataDirect({
    code = HttpStatus.OK,
    description = undefined,
    data = undefined,
    meta_data = undefined,
  }: {
    code?: any;
    description?: string;
    data?: any;
    meta_data?: any;
  }) {
    this.success = true;
    this.code = code;
    this.data = data;
    this.description = description;
    this.meta_data = meta_data;
    this.content_type = ResultEntityTypes.json_direct;
  }

  setRedirect({
    code = HttpStatus.FOUND,
    url = undefined,
  }: {
    code?: any;
    url?: string;
  }) {
    this.success = true;
    this.code = code;
    this.data = url;
    this.content_type = ResultEntityTypes.redirect;
  }

  setHTML({
    code = HttpStatus.OK,
    html = undefined,
  }: {
    code?: any;
    html?: string;
  }) {
    this.success = true;
    this.code = code;
    this.data = html;
    this.content_type = ResultEntityTypes.html;
  }

  setError({ error = undefined }: { error?: ErrorEntity }) {
    this.content_type = ResultEntityTypes.json;

    this.code = HttpStatus.INTERNAL_SERVER_ERROR;
    this.error = error;
    console.log('', {
      message: error.message,
      stack: error.stack,
      error: error.error,
    });
  }
}
