import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception.code);
    let message = 'An unexpected error occurred';
    let statusCode = 500;
    if (exception.code === 'P2002') {
      message = 'Data already exists';
      statusCode = HttpStatus.CONFLICT;
    }
    if (exception.code === 'P2025') {
      message = 'Data not found';
      statusCode = HttpStatus.NOT_FOUND;
    }
    if (exception.code === 'P2003') {
      message = `Foreign key constraint failed on the field: ${exception.meta.field_name}`;
      statusCode = HttpStatus.NOT_FOUND;
    }
    if (exception.code === 'P2018') {
      message = 'The required connected records were not found.';
      statusCode = HttpStatus.BAD_REQUEST;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      meta: exception?.meta,
    });
  }
}
