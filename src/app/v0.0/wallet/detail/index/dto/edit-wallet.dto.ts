import { HttpException, HttpStatus } from '@nestjs/common';

export const editWalletDto = async (
  headers: any,
  body: any,
  connection: any,
) => {
  let { name } = body;
  const { force, uuid } = body;
  const company: number = 1;

  if (!name)
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

  name = name.toLowerCase();

  await connection.query(`START TRANSACTION`);

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

  console.log(checkExist);
  if (checkExist.length == 0) {
    return {
      status: HttpStatus.NOT_FOUND,
      message: 'Your data not exist',
    };
  }

  const [checkValue] = await connection.query(
    `
      SELECT
        *
      FROM
        t_wallets tw
      WHERE
        tw.company_profile_id = ?
        AND tw.t_wallet_name = ?
        AND t_wallet_uuid NOT IN (?)
    `,
    [company, name, uuid],
  );

  if (force && checkValue.length > 0) {
    const [insert] = await connection.query(
      `
      UPDATE t_wallets
      SET
        t_wallet_name = ?
      WHERE
        t_wallet_uuid = ?
    `,
      [name, uuid],
    );

    if (insert.affectedRows) {
      await connection.query(`COMMIT`);
      return {
        status: HttpStatus.OK,
        message: 'Your data has change',
      };
    } else {
      await connection.query(`ROLLBACK`);
      throw new HttpException(
        'Data not inserted, something error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  if (!force && checkValue.length > 0) {
    await connection.query(`ROLLBACK`);
    throw new HttpException('You sure to continue', HttpStatus.CONFLICT);
  }
  const [insert] = await connection.query(
    `
      UPDATE t_wallets
      SET
        t_wallet_name = ?
      WHERE
        t_wallet_uuid = ?
    `,
    [name, uuid],
  );

  if (insert.affectedRows) {
    await connection.query(`COMMIT`);
    return {
      status: HttpStatus.OK,
      message: 'Your data has change',
    };
  } else {
    await connection.query(`ROLLBACK`);
    throw new HttpException(
      'Data not inserted, something error!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
