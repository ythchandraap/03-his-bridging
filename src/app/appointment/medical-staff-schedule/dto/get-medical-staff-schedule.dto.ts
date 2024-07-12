import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const GetMedicalStaffScheduleDto = async (
  headers: any,
  connection: any,
) => {
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

  const { sz, nm, c_code, act } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );

  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;
  // const name = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where =
    'WHERE cmss.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE cmss.company_profile_id = ' + decryptedMedicalFacility + ' ';

  // if (name != '' && name.match(/^\d+$/)) {
  //   where = where + ` AND cp.medical_record_id = ${parseInt(name)}`;
  //   where_all = where_all + ` AND cp.medical_record_id = ${parseInt(name)}`;
  // } else if (name != '' && !name.match(/^\d+$/)) {
  //   where = where + ` AND rp.full_name like '%${name}%'`;
  //   where_all = where_all + ` AND rp.full_name like '%${name}%'`;
  // } else {
  //   where = where;
  //   where_all = where_all;
  // }

  if (!act || act != 'all') {
    where = where + ` AND cmss.is_active = 1`;
    where_all = where_all + ` AND cmss.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    ``;
    where = where + ' order by cmss.company_medical_staff_id ASC';
  } else {
    where =
      where + ` order by cmss.company_medical_staff_id ASC limit ${pageSize}`;
  }

  const getAllData = await connection.query(
    `
      SELECT
        count(cmss.company_medical_staff_schedule_id) as totalData
      FROM ${process.env.DATABASE_CORE}.company_medical_staff_schedule cmss
	      JOIN ${process.env.DATABASE_CORE}.company_medical_staff cms 
          ON cmss.company_medical_staff_id = cms.company_medical_staff_id
      ${where_all}
      `,
  );

  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.company_medical_staff_schedule cmss
	      JOIN ${process.env.DATABASE_CORE}.company_medical_staff cms 
          ON cmss.company_medical_staff_id = cms.company_medical_staff_id
      ${where}
      `,
  );

  // LEFT JOIN obsmoon.ref_profiles rp
  //   ON rp.ref_profile_id = cms.ref_profile_id
  // console.log(where);

  const encryptedId = await getData?.[0]?.map((item) => {
    const {
      company_medical_staff_schedule_id,
      company_medical_staff_id,
      company_profile_id,
      company_clinic_id,
      ref_schedule_type_id,
      ref_medical_staff_type_id,
      ref_profile_id,
      ...rest
    } = item;

    return {
      company_medical_staff_schedule_id: encrypt(
        String(company_medical_staff_schedule_id),
      ),
      company_medical_staff_id: encrypt(String(company_medical_staff_id)),
      company_profile_id: encrypt(String(company_profile_id)),
      company_clinic_id: encrypt(String(company_clinic_id)),
      ref_schedule_type_id: encrypt(String(ref_schedule_type_id)),
      ref_medical_staff_type_id: encrypt(String(ref_medical_staff_type_id)),
      ref_profile_id: encrypt(String(ref_profile_id)),
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
