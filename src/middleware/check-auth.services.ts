// import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { Request } from 'express';
import { Connection } from 'mysql2';

async function checkAuth(connection: Connection, req: Request) {
  const signature = req?.get('signature');
  const token = req?.get('token');
  const userAgent = req?.get('user-agent');

  const [[checkSessionExist]]: any = await connection.query(
    `
          SELECT
            *
          FROM
            ${process.env.DATABASE_CORE}.core_sessions_user csu
          WHERE
            csu.session_can_renew = 1
            AND csu.session_active = 1
            and csu.access_token = ?
            and csu.signature = ?
            and csu.useragent = ?
        `,
    [token, signature, userAgent],
  );

  console.log(checkSessionExist);

  if (!checkSessionExist?.username) {
    return { code: 401, message: 'relogin' };
  }

  const sessionDate = dayjs(checkSessionExist?.session_active_expired, {
    utc: false,
  });
  const renewDate = dayjs(checkSessionExist?.session_renew_expired, {
    utc: false,
  });
  const currentDate = dayjs();

  const diffTimeSession = currentDate.diff(sessionDate, 'minutes', true);
  const diffTimeRenew = currentDate.diff(renewDate, 'minutes', true);

  if (diffTimeRenew > 0) {
    return { code: HttpStatus.UNAUTHORIZED, message: 'renew' };
  }

  if (diffTimeSession > 0) {
    return { code: HttpStatus.UNAUTHORIZED, message: 'relogin' };
  }

  return {
    code: HttpStatus.OK,
    message: 'access',
    username: checkSessionExist.username,
  };
}
export default checkAuth;
