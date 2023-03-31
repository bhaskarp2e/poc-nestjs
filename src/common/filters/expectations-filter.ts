import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
// import { ErrorMessage } from '../constants/error.message';

interface customException {
  timestamp: string;
  message: string;
  httpStatus: number;
  customErrorNumber: number;
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {

  constructor() {
  }

  catch(err: customException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const tag = request.url;
    // if (!err) err = ErrorMessage.systemError.oopsSomethingWentWrong;

    // console.log("filterCatch",{ err });

    void response.status(err?.httpStatus || 400).json(err);
  }
}
