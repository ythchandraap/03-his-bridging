import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';

import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(timezone);

export const RenewToken = async (headers: any, body: any, connection: any) => {
  const { token, signature, ['user-agent']: userAgent } = headers;
  if (!token || !signature || !userAgent) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const [[session]] = await connection.query(
    `
        SELECT
          *
        FROM
          ${process.env.DATABASE_SIMRS}.users_session us
        WHERE
          us.session_can_renew = 1
          and us.access_token = ?
          and us.signature = ?
          and us.useragent = ?
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
  console.log(diffTime);
  if (diffTime > 0) {
    await connection.query(
      `
          UPDATE
            ${process.env.DATABASE_SIMRS}.users_session us
          SET us.session_can_renew = 0,
              us.session_active = 0
          WHERE
            us.session_can_renew = 1
            and us.access_token = ?
            and us.signature = ?
            and us.useragent = ?
        `,
      [token, signature, userAgent],
    );
    throw new HttpException('relogin', HttpStatus.UNAUTHORIZED);
  }

  await connection.query(
    `
          UPDATE
            ${process.env.DATABASE_SIMRS}.users_session us
          SET us.session_can_renew = 1,
              us.session_active = 1,
              us.session_active_expired = ?,
              us.session_renew_expired = ?,
              us.updated_at = ?
          WHERE
            us.session_can_renew = 1
            and us.access_token = ?
            and us.signature = ?
            and us.useragent = ?
        `,
    [
      dayjs().add(120, 'minute').format('YYYY-MM-DD HH:mm:ss'),
      dayjs().add(3, 'minute').format('YYYY-MM-DD HH:mm:ss'),
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
