import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
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
    types: 'Rawat Jalan',
    act: '22',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { s, sz, nm, c_code, act, types } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );

  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;

  const checkCompany = await CheckCompanyProfile(
    connection,
    decryptedMedicalFacility,
  );

  if (checkCompany == 401) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.FORBIDDEN,
    );
  }

  const clinic_name = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE cu.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cu.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (clinic_name && typeof clinic_name == 'string') {
    where += ` AND company_unit_name like '%${clinic_name}%'`;
    where_all += ` AND company_unit_name like '%${clinic_name}%'`;
  }

  if (act != 'all') {
    where += ` AND cu.is_active = 1`;
    where_all += ` AND cu.is_active = 1`;
  }

  if (types != 'all') {
    where += ` AND cu.company_unit_type = '${types}'`;
    where_all += ` AND cu.company_unit_type = '${types}'`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where += ' order by company_unit_name ASC';
  } else {
    where += ` order by company_unit_name ASC limit ${pageSize}`;
  }

  const [getAllData] = await connection.query(
    `
      SELECT
        count(company_unit_id) as totalData
      FROM ${process.env.DATABASE_CORE}.company_units cu
      LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = cu.company_profile_id
      ${where_all}
      `,
  );

  const [getData] = await connection.query(
    `
      SELECT
     	  *
      FROM
        ${process.env.DATABASE_CORE}.company_units cu
        LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = cu.company_profile_id
        ${where}
      `,
  );

  await connection.query(
    `
      INSERT INTO system_logger(
        parameter,
        url,
        action,
        response)
      VALUES(
        ?,
        ?,
        ?,
        ?
      )
    `,
    [
      decryptor(headers.payload, process.env.SALT_TRIPLE),
      'api/apps-internal/clinics',
      'GET',
      'Data served',
    ],
  );

  if (getData.length < 1) {
    return {
      message: 'Horayyy, you can access app now',
      data: [],
      summary: {
        all_data_count: 0,
        data_count: 0,
        page_total: Math.ceil(pagePosition),
        page_size: pageSize,
        page_number: pageNumber,
        can_next: false,
        can_previous: false,
      },
    };
  }

  const encryptedId = getData?.map(
    (item: { company_unit_id: string; company_profile_id: string }) => {
      const { company_unit_id, company_profile_id, ...rest } = item;

      return {
        company_unit_id: encrypt(String(company_unit_id)),
        company_profile_id: encrypt(String(company_profile_id)),
        ...rest,
      };
    },
  );

  pagePosition = parseInt(getAllData?.[0]?.totalData) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: encryptedId ?? [],
    summary: {
      all_data_count: parseInt(getAllData?.[0]?.totalData) ?? 0,
      data_count: encryptedId.length,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
