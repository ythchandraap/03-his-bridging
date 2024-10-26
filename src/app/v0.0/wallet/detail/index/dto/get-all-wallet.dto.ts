import { HttpException, HttpStatus } from '@nestjs/common';

export const getAllWallet = async (headers: any, connection: any) => {
  let { size = '10', position = '1' } = headers;
  const { search } = headers;
  const company: number = 1;

  if (!position || parseInt(position) < 1 || !size) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  size = parseInt(size);
  position = parseInt(position);

  let pagePosition: number = 0;

  let where = `WHERE company_profile_id = ${company} `;

  if (search) {
    where += ` AND t_wallet_name like '%${search}%'`;
  }

  const [getData] = await connection.query(
    `
      SELECT
        SQL_CALC_FOUND_ROWS
     	  t_wallet_uuid,
        t_wallet_name,
        t_wallet_nominal,
        is_active
      FROM
        t_wallets
      ${where}
      LIMIT ? OFFSET ?
      `,
    [size, size * (position - 1)],
  );
  const [[getAllData]] = await connection.query(`SELECT FOUND_ROWS() as total`);

  if (getData.length < 1) {
    return {
      message: 'Horayyy, you can access app now',
      data: [],
      summary: {
        all_data_count: 0,
        data_count: 0,
        page_total: Math.ceil(pagePosition),
        page_size: size,
        page_number: position,
        can_next: false,
        can_previous: false,
      },
    };
  }

  pagePosition = parseInt(getAllData.total) / size;

  return {
    message: 'Horayyy, you can access app now',
    data: getData ?? [],
    summary: {
      all_data_count: parseInt(getAllData.total) ?? 0,
      data_count: getData.length,
      page_total: Math.ceil(pagePosition),
      page_size: size,
      page_number: position,
      can_next: position < Math.ceil(pagePosition),
      can_previous: position !== 1,
    },
  };
};
