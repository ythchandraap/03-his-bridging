import { HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const SignIn = async (
  headers: any,
  body: any,
  jwtService: any,
  connection: any,
) => {
  const { username }: { username: string } = body;
  const {
    userAgent,
    signature,
    action,
  }: { signature: string; action: string; userAgent: string } = headers;

  if (!signature || !username || action !== 'post') {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const [[getData]] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_SIMRS}.users u
      WHERE
        u.username = ?
        AND u.pwd = ?
    `,
    [username, signature],
  );

  const { username: usernameEx, id, pwd } = getData;

  if (!usernameEx) {
    throw new HttpException(
      'Something wrong with your authentication',
      HttpStatus.UNAUTHORIZED,
    );
  }

  const match: boolean = pwd == signature;

  if (!match) {
    throw new HttpException(
      'Something wrong with your authentication',
      HttpStatus.UNAUTHORIZED,
    );
  }

  const signatures: string = username + dayjs.valueOf();
  const access_token: string = userAgent + username + dayjs.valueOf();
  const sha256Signature = createHash('sha256').update(signatures).digest('hex');
  const sha256AccessToken = createHash('sha256')
    .update(access_token + signatures)
    .digest('hex');

  const payload = { token: sha256AccessToken };

  const token = await jwtService.signAsync(payload);
  await connection.query(
    `
      INSERT INTO ${process.env.DATABASE_SIMRS}.users_session
        (
          user_id,
          username,
          useragent,
          signature,
          access_token,
          session_active_expired,
          session_active,
          session_renew_expired,
          session_can_renew,
          created_at,
          updated_at
        )
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      usernameEx,
      headers?.['user-agent'],
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
