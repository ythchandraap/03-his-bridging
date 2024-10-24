import { HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

dayjs.extend(utc);
dayjs.extend(timezone);

export const SignIn = async (
  headers: any,
  body: any,
  jwtService: any,
  connection: any,
) => {
  const { signature, action, ['user-agent']: userAgent } = headers;
  const { username } = body;

  if (!username || !signature || action != 'post') {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // const saltRounds = 10;

  const [[checkDataExist]] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.core_users cu
      WHERE
        cu.username = ?
    `,
    [username],
  );

  const [checkSessionExist] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.core_sessions_user csu
      WHERE
        csu.username = ?
    `,
    [username],
  );

  if (!checkDataExist?.username) {
    throw new HttpException(
      'Something wrong with your authentication',
      HttpStatus.UNAUTHORIZED,
    );
  }

  if (checkSessionExist?.length > 2) {
    await connection.query(
      `
        UPDATE
         	${process.env.DATABASE_CORE}.core_sessions_user csu
        JOIN (
          		SELECT
         			  *
          		FROM
         			  ${process.env.DATABASE_CORE}.core_sessions_user csu
          		WHERE
         			  csu.username = ?
           			AND csu.session_can_renew = 1
          		ORDER BY created_at ASC
              LIMIT 1
              ) AS Latest
        ON Latest.core_session_user_id = csu.core_session_user_id
        SET csu.session_can_renew = '0', csu.session_active = '0'
        `,
      [checkDataExist?.username],
    );
  }
  const match = await bcrypt.compare(signature, checkDataExist.password);

  if (!match) {
    throw new HttpException(
      'Something wrong with your authentication',
      HttpStatus.UNAUTHORIZED,
    );
  }

  const signatured: string = username + dayjs.valueOf();
  const access_token: string = userAgent + username + dayjs.valueOf();
  const sha256Signature = createHash('sha256')
    .update(dayjs().second() + signatured + dayjs().millisecond())
    .digest('hex');
  const sha256AccessToken = createHash('sha256')
    .update(dayjs().millisecond() + access_token + dayjs().second())
    .digest('hex');

  const payload = { token: sha256AccessToken };

  const token = await jwtService.signAsync(payload);
  await connection.query(
    `
      INSERT INTO ${process.env.DATABASE_CORE}.core_sessions_user
        (
          core_user_id,
          username,
          useragent,
          signature,
          access_token,
          session_active_expired,
          session_active,
          session_renew_expired,
          session_can_renew,
          created_at,
          updated_at)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      checkDataExist?.core_user_id,
      checkDataExist?.username,
      userAgent,
      sha256Signature,
      token,
      dayjs().add(120, 'minute').format('YYYY-MM-DD HH:mm'),
      1,
      dayjs().add(3, 'minute').format('YYYY-MM-DD HH:mm'),
      1,
      dayjs().format('YYYY-MM-DD HH:mm'),
      dayjs().format('YYYY-MM-DD HH:mm'),
    ],
  );

  return {
    statusCode: 200,
    message: 'Horay you can access',
    data: {
      signature: sha256Signature,
      access_token: token,
    },
  };
};
