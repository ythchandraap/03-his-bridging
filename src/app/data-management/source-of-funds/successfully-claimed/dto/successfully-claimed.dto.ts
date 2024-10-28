// import { HttpException, HttpStatus } from '@nestjs/common';

import { HttpException, HttpStatus } from '@nestjs/common';

export const SuccessfullyClaimedDto = async (
  headers: any,
  body: any,
  connection: any,
) => {
  const { dateStart, dateEnd, types, payment_type_id } = body;

  if (
    !types ||
    !Array.isArray(types) ||
    types.length === 0 ||
    !payment_type_id
  ) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const [getAllData] = await connection.query(
    `
        SELECT
          k.id AS receipt_id,
          k.jenis,
          k.payment_type_id,
          k.bayar_tgl,
          COALESCE(vi.exit_date, v.date) AS date,
          k.status,
          v.patient_id,
          COALESCE(vi.bpjs_no_sep, v.bpjs_no_sep) AS bpjs_no_sep
        FROM
          simrs.kwitansi_detail kd
          JOIN simrs.kwitansi k ON k.id = kd.kwitansi_id
          LEFT JOIN simrs.visits_inpatient vi ON vi.id = kd.visit_inpatient_id
          LEFT JOIN simrs.visits v ON v.id = kd.visit_id
        WHERE
          k.payment_type_id = ?
          AND (
            v.date BETWEEN ? AND ?
            OR vi.exit_date BETWEEN ? AND ?
          )
          AND k.jenis IN(?)
          AND COALESCE(vi.bpjs_no_sep, v.bpjs_no_sep)
        GROUP BY k.id
      `,
    [payment_type_id, dateStart, dateEnd, dateStart, dateEnd, types],
  );
  if (getAllData.length < 1) {
    return {
      message: 'Here',
      data: [],
      summary: {
        dateStart,
        dateEnd,
        not_yet_paid: 0,
        payment_process: 0,
        paid_of: 0,
        total: 0,
      },
    };
  }

  const notYetPaid = getAllData.reduce(
    (res, value) =>
      value.status != 'PROSES BAYAR' && value.status != 'LUNAS' ? res + 1 : res,
    0,
  );

  const paymentProcess = getAllData.reduce(
    (res, value) => (value.status == 'PROSES BAYAR' ? res + 1 : res),
    0,
  );

  const paidOff = getAllData.reduce(
    (res, value) => (value.status == 'LUNAS' ? res + 1 : res),
    0,
  );

  return {
    message: 'Here',
    summary: {
      dateStart,
      dateEnd,
      not_yet_paid: notYetPaid,
      payment_process: paymentProcess,
      paid_of: paidOff,
      total: getAllData.length,
    },
    data: getAllData,
  };
};
