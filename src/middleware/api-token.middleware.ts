import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.header('x-api-token');
    if (apiToken !== process.env.API_TOKEN) {
      return next(
        new HttpException(
          'x-api-token header missing or incorrect',
          HttpStatus.UNAUTHORIZED,
        ),
      );
    }
    return next();
  }
}
