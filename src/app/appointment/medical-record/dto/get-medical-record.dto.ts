import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const GetMedicalRecord = async (headers: any, connection: any) => {
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

  const { s, sz, nm, c_code } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );
  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;
  const name = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where = 'WHERE cp.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cp.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (name != '' && name.match(/^\d+$/)) {
    where += ` AND cp.medical_record_id = ${parseInt(name)}`;
    where_all += ` AND cp.medical_record_id = ${parseInt(name)}`;
  } else if (name != '' && !name.match(/^\d+$/)) {
    where += ` AND rp.full_name like '%${name}%'`;
    where_all += ` AND rp.full_name like '%${name}%'`;
  } else {
    where = where;
    where_all = where_all;
  }

  // if (!act || act != 'all') {
  //    where += ` AND cu.is_active = 1`;
  //   where_all += ` AND cu.is_active = 1`;
  // }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where += ' order by rp.full_name ASC';
  } else {
    where += ` order by rp.full_name ASC limit ${pageSize}`;
  }

  const getAllData = await connection.query(
    `
      SELECT
        count(cp.company_patient_id) as totalData
      FROM ${process.env.DATABASE_CORE}.company_patients cp
	      JOIN ${process.env.DATABASE_CORE}.ref_profiles rp
          ON rp.ref_profile_id = cp.ref_profile_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_countries rc
          ON rc.ref_country_id = rp.ref_country_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_provinces rpro
          ON rpro.ref_province_id = rp.ref_province_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_regencies rreg
          ON rreg.ref_regency_id = rp.ref_regency_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_districts rdis
          ON rdis.ref_district_id = rp.ref_district_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_villages rvil
          ON rvil.ref_village_id = rp.ref_village_id
      ${where_all}
      `,
  );

  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.company_patients cp
	      JOIN ${process.env.DATABASE_CORE}.ref_profiles rp
          ON rp.ref_profile_id = cp.ref_profile_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_countries rc
          ON rc.ref_country_id = rp.ref_country_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_provinces rpro
          ON rpro.ref_province_id = rp.ref_province_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_regencies rreg
          ON rreg.ref_regency_id = rp.ref_regency_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_districts rdis
          ON rdis.ref_district_id = rp.ref_district_id
        LEFT JOIN ${process.env.DATABASE_CORE}.ref_villages rvil
          ON rvil.ref_village_id = rp.ref_village_id
      ${where}
      `,
  );

  const encryptedId = await getData?.[0]?.map(
    (item: {
      company_patient_id: number;
      ref_profile_id: number;
      company_profile_id: number;
    }) => {
      const {
        company_patient_id,
        ref_profile_id,
        company_profile_id,
        ...rest
      } = item;

      return {
        company_patient_id: encrypt(String(company_patient_id)),
        ref_profile_id: encrypt(String(ref_profile_id)),
        company_profile_id: encrypt(String(company_profile_id)),
        ...rest,
      };
    },
  );
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
