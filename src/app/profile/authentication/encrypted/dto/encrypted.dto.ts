import { HttpException, HttpStatus } from '@nestjs/common';
import { createHash } from 'crypto';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

dayjs.extend(utc);
dayjs.extend(timezone);

export const AuthEncrypted = async (
  headers: any,
  body: any,
  jwtService: any,
) => {
  if (!body || !body?.username || !body?.username) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const username = body?.username;
  const password = body?.password;

  const first = createHash('sha256')
    .update(username + password)
    .digest('hex');

  const saltRounds = 10;
  const bcrypted = await bcrypt.hash(first, saltRounds);

  // const signature: string = username + dayjs.valueOf();
  const access_token: string =
    headers?.['user-agent'] + username + dayjs.valueOf();
  // const sha256Signature = createHash('sha256').update(signature).digest('hex');
  const sha256AccessToken = createHash('sha256')
    .update(access_token)
    .digest('hex');
  // const saltRounds = 10;

  const payload = { token: sha256AccessToken };

  const token = await jwtService.signAsync(payload);

  return {
    statusCode: 200,
    message: 'Horay you can access',
    data: {
      first,
      token,
      bcrypted,
    },
  };
};
