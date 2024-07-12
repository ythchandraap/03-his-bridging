import { HttpException, HttpStatus } from '@nestjs/common';
import { decipher } from 'utility/encryption';

export const GetClinicsDto = async (
  param: any,
  headers: any,
  request: any,
  connection: any,
) => {
  const decrypt = decipher(process.env.SALT);

  if (!headers || !headers.c_code) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const decryptedMedicalFacility: number =
    parseInt(decrypt(headers.c_code)) ?? 0;
  const clinic_name = param.s ?? '';
  const pageSize = request?.sz ?? 10;
  const pageNumber = request?.nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE cc.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cc.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (clinic_name && typeof clinic_name == 'string') {
    where = where + ` AND company_clinic_name like '%${clinic_name}%'`;
    where_all = where_all + ` AND company_clinic_name like '%${clinic_name}%'`;
  }

  if (!headers?.act || headers?.act != 'all') {
    where = where + ` AND cc.is_active = 1`;
    where_all = where_all + ` AND cc.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    ``;
    where = where + ' order by company_clinic_name ASC';
  } else {
    where = where + ` order by company_clinic_name ASC limit ${pageSize}`;
  }

  const getAllData = await connection.query(
    `
      SELECT
        count(company_clinic_id) as totalData
      FROM ${process.env.DATABASE_CORE}.company_clinics cc
      ${where_all}
      `,
  );

  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.company_clinics cc
      ${where}
      `,
  );

  // eslint-disable-next-line prefer-const
  // pagePosition = parseInt(getAllData?.rows?.[0]?.totaldata ?? 0) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: getData?.[0] ?? [],
    summary: {
      all_data_count: parseInt(getAllData?.[0]?.totaldata) ?? 0,
      data_count: getData?.[0].length,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
