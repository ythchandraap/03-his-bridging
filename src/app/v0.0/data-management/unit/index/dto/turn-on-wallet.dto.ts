import { HttpException, HttpStatus } from '@nestjs/common';

export const turnOnWalletDto = async (
  headers: any,
  body: any,
  connection: any,
) => {
  const { force } = body;
  const { uuid } = headers;
  const company: number = 1;

  const [checkExist] = await connection.query(
    `
      SELECT
        *
      FROM
        t_wallets tw
      WHERE
        tw.company_profile_id = ?
        AND t_wallet_uuid = ?
    `,
    [company, uuid],
  );

  if (checkExist.length == 0)
    throw new HttpException('Your data not exist', HttpStatus.NOT_FOUND);

  if (checkExist?.[0].is_active == '1')
    throw new HttpException('No action, your data is active', HttpStatus.OK);

  await connection.query(`START TRANSACTION`);
  const nominal: number = parseFloat(checkExist?.[0].t_wallet_nominal ?? 0);

  if (force && nominal > 0) {
    const [insert] = await connection.query(
      `
      UPDATE t_wallets
      SET
        is_active = ?
      WHERE
        t_wallet_uuid = ?
    `,
      ['1', uuid],
    );

    if (insert.affectedRows) {
      await connection.query(`COMMIT`);
      throw new HttpException('Your wallet is active', HttpStatus.OK);
    } else {
      await connection.query(`ROLLBACK`);
      throw new HttpException(
        'Data not changed, something error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  if (!force && nominal > 0) {
    await connection.query(`ROLLBACK`);
    throw new HttpException('You sure to continue', HttpStatus.CONFLICT);
  }
  const [insert] = await connection.query(
    `
      UPDATE t_wallets
      SET
        is_active = ?
      WHERE
        t_wallet_uuid = ?
    `,
    ['1', uuid],
  );

  if (insert.affectedRows) {
    await connection.query(`COMMIT`);
    throw new HttpException('Your wallet is active', HttpStatus.OK);
  } else {
    await connection.query(`ROLLBACK`);
    throw new HttpException(
      'Data not changed, something error!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
