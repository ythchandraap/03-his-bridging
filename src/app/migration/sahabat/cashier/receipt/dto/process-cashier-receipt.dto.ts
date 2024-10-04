// import { HttpException, HttpStatus } from '@nestjs/common';

import { HttpException, HttpStatus } from '@nestjs/common';

export const ProcessCashierReceiptDto = async (
  headers: any,
  body: any,
  connection: any,
) => {
  const { dateStart, dateEnd, types } = body;

  if (!types || !Array.isArray(types) || types.length === 0) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
  await connection.query('START TRANSACTION');

  const [dataGrabbed] = await connection.query(
    `
      SELECT
        k.id AS receipt_id,
        k.jenis,
        k.bayar_tgl,
        k.status,
        k.user_id,
        k.insert_date,
        k.user_id,
        k.insert_date,
        k.id as t_receipt_id,
        k.payment_type_id,
        COALESCE(vi.bpjs_no_sep, v.bpjs_no_sep) bpjs_no_sep
      FROM
        ${process.env.DATABASE_SIMRS}.kwitansi_detail kd
        JOIN ${process.env.DATABASE_SIMRS}.kwitansi k ON k.id = kd.kwitansi_id
        LEFT JOIN ${process.env.DATABASE_SIMRS}.visits_inpatient vi ON vi.id = kd.visit_inpatient_id
        LEFT JOIN ${process.env.DATABASE_SIMRS}.visits v ON v.id = kd.visit_id
      WHERE
        (
          v.date BETWEEN ? AND ?
          OR vi.exit_date BETWEEN ? AND ?
        )
        AND k.jenis IN(?)
        AND COALESCE(vi.bpjs_no_sep, v.bpjs_no_sep)
      GROUP BY
        k.id
      
      `,
    [dateStart, dateEnd, dateStart, dateEnd, types],
  );

  await connection.query(
    `
        INSERT INTO ${process.env.DATABASE_CORE}.t_receipts(
          t_receipt_id,
          t_receipt_type,
          t_paid_off_date,
          t_receipt_status,
          created_by,
          created_date,
          updated_by,
          updated_date
        )
          VALUES ?
        ON DUPLICATE KEY UPDATE
          t_receipt_id=VALUES(t_receipt_id),
          t_receipt_type=VALUES(t_receipt_type),
          t_paid_off_date=VALUES(t_paid_off_date),
          t_receipt_status=VALUES(t_receipt_status),
          created_date=VALUES(created_date),
          updated_date=VALUES(updated_date),
          created_by=VALUES(created_by),
          updated_by=VALUES(updated_by)

      `,
    [
      dataGrabbed.map(
        (value: {
          receipt_id: any;
          jenis: any;
          bayar_tgl: any;
          status: any;
          user_id: any;
          insert_date: any;
        }) => [
          value.receipt_id,
          value.jenis,
          value.bayar_tgl,
          value.status,
          value.user_id,
          value.insert_date,
          value.user_id,
          value.insert_date,
        ],
      ),
    ],
  );

  let allReceipt: string = '';
  let allPaymentMethod: string = '';
  let allClaimNumber: string = '';
  const dataLength: number = dataGrabbed.length - 1 ?? 0;

  dataGrabbed.map(
    (
      value: {
        bpjs_no_sep: string;
        t_receipt_id: string;
        payment_type_id: string;
      },
      index: number,
    ) => {
      const checker: string = index < dataLength ? ',' : '';
      allReceipt = allReceipt + value.t_receipt_id ?? null + checker;
      allPaymentMethod =
        allPaymentMethod + value.payment_type_id ?? null + checker;
      allClaimNumber = allClaimNumber + value.bpjs_no_sep ?? null + checker;
    },
  );
  await connection.query(
    `
      CALL insert_multiple_payment_method(?,?,?)
    `,
    [allReceipt, allPaymentMethod, allClaimNumber],
  );

  await connection.query('COMMIT');

  return {
    message:
      'Your data is migrated with date range ' + dateStart + ' to ' + dateEnd,
  };
};
