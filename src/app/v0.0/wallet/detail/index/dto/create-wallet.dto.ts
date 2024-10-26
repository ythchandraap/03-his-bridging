import { HttpException, HttpStatus } from '@nestjs/common';
import { generateUUID } from 'utility/uuid-gen';

export const createWalletDto = async (
  headers: any,
  body: any,
  connection: any,
) => {
  let { name } = body;
  const { force } = body;
  const company: number = 1;

  if (!name)
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );

  const generatedUUID = await generateUUID();
  name = name.toLowerCase();

  await connection.query(`START TRANSACTION`);

  const [checkValue] = await connection.query(
    `
      SELECT
        *
      FROM
        t_wallets tw
      WHERE
        tw.company_profile_id = ?
        AND tw.t_wallet_name = ?
    `,
    [company, name],
  );

  if (force && checkValue.length > 0) {
    const [insert] = await connection.query(
      `
      INSERT INTO t_wallets(
        t_wallet_name,
        company_profile_id,
        t_wallet_uuid
      )
      VALUES(?,?,?)
    `,
      [name, company, generatedUUID],
    );

    if (insert.insertId) {
      await connection.query(`COMMIT`);
      return {
        status: HttpStatus.OK,
        message: 'Your data inserted',
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
      INSERT INTO t_wallets(
        t_wallet_name,
        company_profile_id,
        t_wallet_uuid
      )
      VALUES(?,?,?)
    `,
    [name, company, generatedUUID],
  );

  if (insert.insertId) {
    await connection.query(`COMMIT`);
    return {
      status: HttpStatus.OK,
      message: 'Your data inserted',
    };
  } else {
    await connection.query(`ROLLBACK`);
    throw new HttpException(
      'Data not inserted, something error!',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
