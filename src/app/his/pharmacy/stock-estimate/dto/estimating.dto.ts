// import { HttpException, HttpStatus } from '@nestjs/common';

export const EstimatingDto = async (headers: any, connection: any) => {
  const [getAllData] = await connection.query(
    `
      SELECT
        dtd.drug_code,
        dtd.drug_name,
        SUM(dtd.jumlah * - 1) total,
        MONTH(dt.date) month,
        YEAR(dt.date)
        year,
        dt.date
      FROM
        ${process.env.DATABASE_SIMRS}.drugs_transaction_detail dtd
        JOIN ${process.env.DATABASE_SIMRS}.drugs_transaction dt ON dt.id = dtd.drug_transaction_id
      WHERE
        dt.date BETWEEN '2023-09-01'
        AND '2024-09-30'
        AND dtd.drug_code = 'ACA0001'
        AND dt.bagian_id = 2
        AND dt.jenis = 'Resep'
      GROUP BY
        year(dt.date),
        MONTH(dt.date)
      ORDER BY
        year ASC,
	      month ASC
      `,
  );
  const [[restStock]] = await connection.query(
    `
      SELECT
        SUM(dtd.jumlah) AS total
      FROM
        ${process.env.DATABASE_SIMRS}.drugs_transaction dt
        JOIN ${process.env.DATABASE_SIMRS}.drugs_transaction_detail dtd ON (dtd.drug_transaction_id = dt.id)
      WHERE
        dt.bagian_id = 2
        AND dtd.drug_code = 'ACA0001'
        AND DATE(dt.date) <= '2024-09-30'
      `,
  );
  const lastData = parseFloat(getAllData[getAllData.length - 1].total) ?? 0;
  const sumAllData = getAllData.reduce(
    (prevValue: number, item: { total: string }) =>
      parseFloat(item.total) + prevValue,
    0,
  );
  const efficient: number = 20 / 100;
  const lastStock: number = parseFloat(restStock.total) ?? 0;

  const existingFormula =
    sumAllData / getAllData.length +
    lastData * efficient +
    lastData * 2 -
    lastStock;

  const opsi1Formula =
    3 *
    (sumAllData / getAllData.length +
      (efficient * sumAllData) / getAllData.length);

  return {
    message: 'Here',

    data_mentah: getAllData,
    pengadaan: [
      {
        rumus: 'existing',
        formula: '((∑X n Month) + (20% * X) + (X * 2)) - Y',
        legend: [
          'X = Pemakaian per bulan (12)',
          'n = total bulan',
          'Y = sisa stock',
        ],
        result: existingFormula ?? 0,
      },
      {
        rumus: 'Opsi 1',
        formula: '3((∑X/n Month) + (20% * ∑X/n Month))',
        legend: ['X = Pemakaian per bulan', 'n = total bulan'],
        result: opsi1Formula,
      },
    ],
  };
};
