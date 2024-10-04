import { HttpException, HttpStatus } from '@nestjs/common';
import { cipher, hashing } from 'utility/encryption';

export class EnterUsername {
  username: string;
  to: string;
}

export async function enterUsername(
  enterUsername: EnterUsername,
  headers: any,
  request: any,
  response: any,
) {
  if (!enterUsername || !enterUsername.username) {
    throw new HttpException(
      'Maybe your data not completed',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  if (!headers || !headers.signature || !headers.payload || !headers.approach) {
    throw new HttpException(
      'Maybe your data not completed',
      HttpStatus.PRECONDITION_FAILED,
    );
  }

  await this.connection.query('START TRANSACTION');
  const [[checkUsers]]: any = await this.connection.query(
    `SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.core_users cu
      WHERE
        cu.username = ?`,
    [enterUsername.username],
  );

  if (!checkUsers || !checkUsers?.username || !checkUsers?.password) {
    await this.connection.query('ROLLBACK');
    throw new HttpException(
      'Oops! Wrong data or ur input not match with our record',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const encrypt = cipher(process.env.SALT);
  const encrypt2nd = cipher(process.env.SALT_DOUBLE);
  const hashSignature = encrypt(headers.signature);

  const encryptionCodeDoubleHash = encrypt2nd(String(headers.payload));
  const sessionCodeDoubleHash = hashing(encryptionCodeDoubleHash);

  if (!(hashSignature == checkUsers.password)) {
    await this.connection.query('ROLLBACK');
    throw new HttpException(
      'Oops! Wrong data or ur input not match with our record',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  await this.connection.query(
    `
      UPDATE
        ${process.env.DATABASE_CORE}.core_sessions_user csu
      SET
        csu.session_active = 0
      WHERE
        csu.username = ?
    `,
    [enterUsername.username],
  );

  const insertToSession = await this.connection.query(
    `
      INSERT INTO
        ${process.env.DATABASE_CORE}.core_sessions_user(
          core_user_id,
          username,
          useragent,
          session_active,
          encryption_code,
          session_code,
          cookies
        )
      VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `,
    [
      checkUsers.core_user_id,
      enterUsername.username,
      headers['user-agent'],
      1,
      headers.payload,
      encryptionCodeDoubleHash,
      sessionCodeDoubleHash,
    ],
  );

  if (!insertToSession?.[0]?.insertId) {
    await this.connection.query('ROLLBACK');
    throw new HttpException(
      'Something wrong with our server, please wait',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  await this.connection.query('COMMIT');

  response.cookie('sid_forward', sessionCodeDoubleHash, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 24 * 60000,
    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
  });

  response.cookie('asjb', headers.payload, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 24 * 60000,
    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
  });

  response.cookie('token', encryptionCodeDoubleHash, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 24 * 60000,
    expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
  });

  // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  return { message: 'Horayyy, you can access app now' };
}
