import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';

import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);

export const RenewToken = async (headers: any, body: any, connection: any) => {
  const { token, signature, ['user-agent']: userAgent, tz } = headers;
  if (!token || !signature || !tz) {
    throw new HttpException(
      'Data not completed',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const [[session]] = await connection.query(
    `
        SELECT
          *
        FROM
          ${process.env.DATABASE_CORE}.core_sessions_user csu
        WHERE
          csu.session_can_renew = 1
          and csu.access_token = ?
          and csu.signature = ?
          and csu.useragent = ?
      `,
    [token, signature, userAgent],
  );

  if (!session) {
    throw new HttpException('relogin', HttpStatus.UNAUTHORIZED);
  }

  const sessionDate = dayjs(session?.session_active_expired, {
    utc: false,
  });

  const currentDate = dayjs();

  const diffTime = currentDate.diff(sessionDate, 'minutes', true);
  if (diffTime > 0) {
    await connection.query(
      `
          UPDATE
            ${process.env.DATABASE_CORE}.core_sessions_user csu
          SET csu.session_can_renew = 0,
              csu.session_active = 0
          WHERE
            csu.session_can_renew = 1
            and csu.access_token = ?
            and csu.signature = ?
            and csu.useragent = ?
        `,
      [token, signature, userAgent],
    );
    throw new HttpException('relogin', HttpStatus.UNAUTHORIZED);
  }

  await connection.query(
    `
          UPDATE
            ${process.env.DATABASE_CORE}.core_sessions_user csu
          SET csu.session_can_renew = 1,
              csu.session_active = 1,
              csu.session_active_expired = ?,
              csu.session_renew_expired = ?,
              csu.updated_at = ?
          WHERE
            csu.session_can_renew = 1
            and csu.access_token = ?
            and csu.signature = ?
            and csu.useragent = ?
        `,
    [
      dayjs().add(1440, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().add(15, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().format('YYYY-MM-DD HH:mm:ss'),
      token,
      signature,
      userAgent,
    ],
  );

  return {
    statusCode: 200,
    message: 'Horay you can access',
  };
};
