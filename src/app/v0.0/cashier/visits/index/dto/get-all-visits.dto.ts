import { HttpException, HttpStatus } from '@nestjs/common';
const dayjs = require('dayjs');

export const getAllVisits = async (headers: any, connection: any) => {
  let { size = '10', position = '1', datestart, dateend } = headers;
  const { search = '', clinic_id } = headers;

  if (!position || parseInt(position) < 1 || !size || !datestart || !dateend) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  datestart = dayjs(datestart);
  dateend = dayjs(dateend);
  console.log(dateend.format('YYYY-MM-DD'));
  const diffMinutes: number = dayjs(datestart).diff(dayjs(dateend), 'minutes');

  if (diffMinutes > 0) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  let where = `WHERE v.date BETWEEN '${datestart.format('YYYY-MM-DD')}' AND '${dateend.format('YYYY-MM-DD')}'`;

  if (diffMinutes == 0) {
    where = `WHERE v.date BETWEEN '${datestart.format('YYYY-MM-DD 00:00')}' AND '${dateend.format('YYYY-MM-DD 23:59')}'`;
  }
  where += clinic_id ? ` AND rc.id="${clinic_id}" ` : '';
  where += search
    ? ` AND (p.id like "%${search}%" OR p.name like "%${search}%") `
    : '';

  size = parseInt(size);
  position = parseInt(position);

  let pagePosition: number = 0;

  const [getData] = await connection.query(
    `
      SELECT
				SQL_CALC_FOUND_ROWS
				v.id as id,
				v.no_register,
				v.date,
				p.id as no_rm,
				p.id as patient_id,
				p.name,
				p.sex,
				p.birth_date,
				p.ada_alergi_obat,
				p.ada_alergi_makanan,
				p.alergi_obat,
				p.alergi_makanan,
				rc.id as clinic_id,
				rc.name as clinic_name,
				rcon.name "continue",
				rpar.id as doctor_id,
				rpar.name as doctor,
				rpay.id as payment_type_id,
				rpay.name as payment_type_name,
				v.queue_number_prefix,
				v.queue_number,
				v.queue_called,
				v.queue_called_date,
				v.appointment_id,
				kw.status,
				v.triage_status,
				v.served,
				v.triage_warna,
				v.triage_esi,
				v.triage_morse_result,
				v.triage_morse_result_text,
				rpm.name as penyakit_menular_name,
				rpm.warna as penyakit_menular_warna,
				p.covid19_status,
				v.blocked,
				v.blocked_message,
				v.pemeriksaan_start_date,
				v.pemeriksaan_end_date
			FROM
				visits v
				JOIN patients p ON (p.id = v.patient_id )
				JOIN ref_clinics rc ON (rc.id = v.clinic_id)
				JOIN kwitansi kw ON (kw.id=v.kwitansi_id)
				LEFT JOIN ref_continue rcon ON (rcon.id = v.continue_id)
				LEFT JOIN ref_paramedics rpar ON (rpar.id = v.paramedic_id)
				LEFT JOIN ref_payment_types rpay ON (rpay.id = v.payment_type_id)
				LEFT JOIN ref_penyakit_menular rpm ON (rpm.id = p.penyakit_menular_id)
			${where}
      LIMIT ? OFFSET ?
      `,
    [size, size * (position - 1)],
  );

  const [[getAllData]] = await connection.query(`SELECT FOUND_ROWS() as total`);

  if (getData.length < 1) {
    return {
      statusCode: HttpStatus.OK,
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
    statusCode: HttpStatus.OK,
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
