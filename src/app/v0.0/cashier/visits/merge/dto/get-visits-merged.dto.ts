import { HttpException, HttpStatus } from '@nestjs/common';

export const getVisitsMerged = async (headers: any, connection: any) => {
  let { size = '10', position = '1' } = headers;
  const { search = '', visit_id, receipt_id } = headers;

  if (
    !position ||
    parseInt(position) < 1 ||
    !size ||
    !visit_id ||
    !receipt_id
  ) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  size = parseInt(size);
  position = parseInt(position);

  let pagePosition: number = 0;

  const [getData] = await connection.query(
    `
      SELECT
        SQL_CALC_FOUND_ROWS
        v.id AS visit_id,
        p.id AS patient_id,
        p.name,
        v.date,
        v.clinic_id,
        rc.name clinic_name,
        vic.inpatient_clinic_id,
        ric.name,
        vi.exit_date
      FROM visits v
        JOIN patients p ON (p.id=v.patient_id)
        LEFT JOIN visits_inpatient vi ON v.id = vi.visit_id
        LEFT JOIN ref_clinics rc ON rc.id = v.clinic_id
        LEFT JOIN visits_inpatient_clinic vic ON vic.visit_inpatient_id = vi.id
        LEFT JOIN ref_inpatient_clinics ric ON ric.id = vic.inpatient_clinic_id
      WHERE v.id<>? AND v.kwitansi_id=?
      ORDER BY v.id
      LIMIT ? OFFSET ?
      `,
    [visit_id, receipt_id, size, size * (position - 1)],
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
