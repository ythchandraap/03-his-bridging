import { HttpException, HttpStatus } from '@nestjs/common';

export const getWallet = async (headers: any, connection: any) => {
  const company: number = 1;
  const { uuid } = headers;

  const [getData] = await connection.query(
    `
      SELECT
     	  t_wallet_uuid,
        t_wallet_name,
        t_wallet_nominal,
        is_active
      FROM
        t_wallets
      WHERE
        company_profile_id = ?
        AND t_wallet_uuid = ?
      `,
    [company, uuid],
  );

  if (getData.length < 1)
    throw new HttpException('Your data not found', HttpStatus.NOT_FOUND);

  return {
    statusCode: HttpStatus.OK,
    message: 'Data from ' + uuid,
    data: getData,
  };
};
