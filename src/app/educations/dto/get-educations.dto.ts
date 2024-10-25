import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
import { cipher, decipher } from 'utility/encryption';

export const GetEducations = async (headers: any, connection: any) => {
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
    act: '22',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { s, sz, nm, c_code, act } = JSON.parse(
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

  const search = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE cp.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cp.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (search && typeof search == 'string') {
    where = where + ` AND re.ref_education_name like '%${search}%'`;
    where_all = where_all + ` AND re.ref_education_name like '%${search}%'`;
  }

  if (act != 'all') {
    where = where + ` AND re.is_active = 1`;
    where_all = where_all + ` AND re.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where = where + ' order by re.order DESC';
  } else {
    where = where + ` order by re.order DESC limit ${pageSize}`;
  }

  const [getAllData] = await connection.query(
    `
      SELECT
        count(re.ref_education_id) as totalData
      FROM ${process.env.DATABASE_CORE}.ref_educations re
      LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = re.company_profile_id
      ${where_all}
      `,
  );

  const [getData] = await connection.query(
    `
      SELECT
     	  *
      FROM ${process.env.DATABASE_CORE}.ref_educations re
      LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = re.company_profile_id
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
      'api/apps-internal/educations',
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
    (item: { ref_education_id: string; company_profile_id: string }) => {
      const { ref_education_id, company_profile_id, ...rest } = item;

      return {
        ref_education_id: encrypt(String(ref_education_id)),
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
