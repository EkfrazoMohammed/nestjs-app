import { Injectable } from '@nestjs/common';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap, catchError } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const { method, url } = request;

    // Log incoming request
    this.logger.log(`Incoming Request: ${method} ${url}`);

    return next.handle().pipe(
      tap(() => {
        // Log success response status code
        const statusCode = response.statusCode;
        this.logger.log(`Response Status: ${statusCode} - ${method} ${url}`);
      }),
      catchError((error) => {
        // Log error response status code and error message
        const statusCode = error?.status || 500;
        const message = error?.message || 'Internal Server Error';

        // If the error response has specific fields like message and error
        if (error?.response) {
          this.logger.error(`Error Status: ${statusCode} - ${method} ${url} - ${JSON.stringify(error.response)}`);
        } else {
          this.logger.error(`Error Status: ${statusCode} - ${method} ${url} - ${message}`);
        }

        // Re-throw the error after logging it
        throw error;
      })
    );
  }
}
