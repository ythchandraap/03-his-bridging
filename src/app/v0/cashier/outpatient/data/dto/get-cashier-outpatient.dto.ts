import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
import { decipher } from 'utility/encryption';

export const GetCashierOutpatient = async (headers: any, connection: any) => {
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
    ds: '2024-07-01',
    de: '2024-07-31',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { s, sz, nm, c_code, act, ds, de } = JSON.parse(
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
  const dateStart = ds ?? dayjs().format('YYYY-MM-HH');
  const dateEnd = de ?? dayjs().format('YYYY-MM-HH');

  let pagePosition: number;

  let where = 'WHERE 1';
  let where_all = 'WHERE 1';

  if (search && typeof search == 'string') {
    where += ` AND (p.id LIKE "%${search}%" OR p.name LIKE "%${search}%")`;
    where_all += ` AND (p.id LIKE "%${search}%" OR p.name LIKE "%${search}%")`;
  }

  if (act != 'all') {
    where += ` AND DATE(v.date) BETWEEN "${dateStart}" AND "${dateEnd}"`;
    where_all += ` AND DATE(v.date) BETWEEN "${dateStart}" AND "${dateEnd}"`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where += `GROUP BY v.id ORDER BY v.queue_number_prefix ASC, v.queue_number ASC`;
  } else {
    where += `GROUP BY v.id ORDER BY v.queue_number_prefix ASC, v.queue_number ASC limit ${pageSize}`;
  }

  const [getData] = await connection.query(
    `
    SELECT
      SQL_CALC_FOUND_ROWS
     	v.id,
     	v.no_register,
     	v.date,
     	p.id AS no_rm,
     	p.id AS patient_id,
     	p.name,
     	p.sex,
     	p.birth_date,
     	rc.id AS clinic_id,
     	rc.name AS clinic_name,
     	rcon.name AS 'continue',
     	rpar.name AS doctor,
     	rpay.id AS payment_type_id,
      rpay.name as payment_type_name,
     	v.queue_number_prefix,
     	v.queue_number,
     	v.apotek_queue_number,
     	v.kasir_queue_called,
     	v.status_obat_selesai,
     	v.jenis_resep,
     	v2.id AS has_rujuk_internal,
     	kw.status,
     	kw.total,
     	kw.bayar,
     	kw.bayar_non_tunai,
     	p.covid19_status,
     	p.blocked
    FROM
     	${process.env.DATABASE_SIMRS}.visits v
     	JOIN ${process.env.DATABASE_SIMRS}.patients p ON (p.id = v.patient_id)
     	JOIN ${process.env.DATABASE_SIMRS}.ref_clinics rc ON (rc.id = v.clinic_id)
     	JOIN ${process.env.DATABASE_SIMRS}.kwitansi kw ON (kw.id = v.kwitansi_id)
     	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_continue rcon ON (rcon.id = v.continue_id)
     	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_paramedics rpar ON (rpar.id = v.paramedic_id)
     	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_payment_types rpay ON (rpay.id = v.payment_type_id)
     	LEFT JOIN ${process.env.DATABASE_SIMRS}.visits v2 ON (v2.parent_id = v.id)
      ${where}
      `,
  );
  const [rowCount] = await connection.query(`SELECT FOUND_ROWS() `);
  const dataRow = rowCount?.[0]?.['FOUND_ROWS()'] ?? 0;

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
      'apps-internal/cashier/outpatient',
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

  pagePosition = parseInt(dataRow) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: getData ?? [],
    summary: {
      all_data_count: parseInt(dataRow) ?? 0,
      data_count: getData.length,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
