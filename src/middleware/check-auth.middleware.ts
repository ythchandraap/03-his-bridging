import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import CheckAuthService from './check-auth.services';
import { InjectClient } from 'nest-mysql';
import { Connection } from 'mysql2';

interface newRequest extends Request {
  username?: string;
}

@Injectable()
export class checkAuthMiddleware implements NestMiddleware {
  constructor(@InjectClient() private readonly connection: Connection) {}
  async use(req: newRequest, res: Response, next: NextFunction) {
    const check = await CheckAuthService(this.connection, req);
    if (check?.code == 200) {
      req.username = check?.username;
      next();
    }
    if (check?.code == 500) {
      throw new HttpException(
        'try again later',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (check?.code == 401 && check?.message == 'relogin') {
      throw new HttpException('relogin', HttpStatus.UNAUTHORIZED);
    }
    if (check?.code == 401 && check?.message == 'renew') {
      throw new HttpException('renew', HttpStatus.UNAUTHORIZED);
    }
  }
}
