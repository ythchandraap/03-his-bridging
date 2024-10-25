import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const GetClinics = async (headers: any, connection: any) => {
  const encrypt = cipher(process.env.SALT);
  const decrypt = decipher(process.env.SALT);

  if (!headers?.payload) {
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

  const { s, sz, nm, c_code, act } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );

  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;
  const clinic_name = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE cu.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cu.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (clinic_name && typeof clinic_name == 'string') {
    where = where + ` AND company_unit_name like '%${clinic_name}%'`;
    where_all = where_all + ` AND company_unit_name like '%${clinic_name}%'`;
  }

  if (!act || act != 'all') {
    where = where + ` AND cu.is_active = 1`;
    where_all = where_all + ` AND cu.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where = where + ' order by company_unit_name ASC';
  } else {
    where = where + ` order by company_unit_name ASC limit ${pageSize}`;
  }

  const getAllData = await connection.query(
    `
      SELECT
        count(company_unit_id) as totalData
      FROM ${process.env.DATABASE_CORE}.company_units cu
      ${where_all}
      `,
  );

  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.company_units cu
      ${where}
      `,
  );

  const encryptedId = getData?.[0]?.map((item: { company_unit_id: string }) => {
    const { company_unit_id, ...rest } = item;

    return {
      company_unit_id: encrypt(String(company_unit_id)),
      ...rest,
    };
  });
  // eslint-disable-next-line prefer-const
  pagePosition = parseInt(getAllData?.[0]?.[0]?.totalData) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: encryptedId ?? [],
    summary: {
      all_data_count: parseInt(getAllData?.[0]?.[0]?.totalData) ?? 0,
      data_count: encryptedId.length,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
