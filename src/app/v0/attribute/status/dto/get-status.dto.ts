import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const GetStatusDto = async (headers: any, connection: any) => {
  const encrypt = cipher(process.env.SALT);
  const decrypt = decipher(process.env.SALT);

  if (!headers || !headers.payload) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const originalText = JSON.stringify({
    s: '',
    sz: 10,
    nm: 1,
    c_code: '03',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  // if (decryptor(headers.payload, process.env.SALT_TRIPLE) == '449') {
  //   throw new HttpException(
  //     'Your data need more clear',
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  if (decryptor(headers.payload, process.env.SALT_TRIPLE) == '500') {
    throw new HttpException('Something wrong with your payload', 422);
  }
  const dataAccepted = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );

  const decryptedMedicalFacility: number =
    parseInt(decrypt(String(dataAccepted.c_code))) ?? 0;
  const statusName = dataAccepted.s ?? '';
  const pageSize = dataAccepted.sz ?? 10;
  const pageNumber = dataAccepted.nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE rs.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE rs.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (statusName && typeof statusName == 'string') {
    where = where + ` AND rs.name_status like '%${statusName}%'`;
    where_all = where_all + ` AND rs.name_status like '%${statusName}%'`;
  }

  if (!dataAccepted.act || dataAccepted.act != 'all') {
    where = where + ` AND rs.is_active = 1`;
    where_all = where_all + ` AND rs.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    ``;
    where = where + ' order by rs.order ASC';
  } else {
    where = where + ` order by rs.order ASC limit ${pageSize}`;
  }

  const getAllData = await connection.query(
    `
      SELECT
        count(rs.ref_status_id) as totalData
      FROM ${process.env.DATABASE_CORE}.ref_status rs
      ${where_all}
      `,
  );
  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.ref_status rs
      ${where}
      `,
  );
  const encryptedId = getData?.[0]?.map((item: { ref_status_id: string }) => {
    const { ref_status_id, ...rest } = item;
    return { ref_status_id: encrypt(String(ref_status_id)), ...rest };
  });

  // eslint-disable-next-line prefer-const
  pagePosition = parseInt(getAllData?.[0]?.[0]?.totalData) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: encryptedId ?? [],
    summary: {
      all_data_count: parseInt(getAllData?.[0]?.[0]?.totalData) ?? 0,
      data_count: encryptedId.length ?? 0,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
