import * as dayjs from 'dayjs';
import DoUpdateReceipt from 'utility/do-update-receipt';

async function DoAddKwitansi(
  { visit_id, payment_type_id, tarif_id, kelas_id },
  connectionQuery?: any,
) {
  const [DoAddKwitansi] = await connectionQuery.query(
    `INSERT INTO ${process.env.DATABASE_SIMRS}.kwitansi(jenis, payment_type_id, tarif_id, kelas_id, user_id, date, insert_date) VALUES(?,?,?,?,?,?,?)`,
    [
      'RJ',
      payment_type_id,
      tarif_id,
      kelas_id,
      282,
      dayjs().format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD'),
    ],
  );
  const insertId = DoAddKwitansi?.insertId;

  await connectionQuery.query(
    `UPDATE ${process.env.DATABASE_SIMRS}.visits SET kwitansi_id=? WHERE id=?`,
    [insertId, visit_id],
  );
  return insertId;
}

export const SeparateReceiptInOutpatient = async (
  headers: any,
  connection: any,
) => {
  // const encrypt = cipher(process.env.SALT);
  // const decrypt = decipher(process.env.SALT);

  // if (!headers || !headers.payload) {
  //   throw new HttpException(
  //     "Your transaction can't processed",
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  // const originalText = JSON.stringify({
  //   s: '',
  //   sz: 10,
  //   nm: 1,
  //   c_code: '03',
  //   act: '22',
  //   ds: '2024-07-01',
  //   de: '2024-07-31',
  // });
  // const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  // console.log(`Encrypted Text: ${encryptedText}`);

  // const { s, sz, nm, c_code, act, ds, de } = JSON.parse(
  //   decryptor(headers.payload, process.env.SALT_TRIPLE),
  // );

  // const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;

  // const checkCompany = await CheckCompanyProfile(
  //   connection,
  //   decryptedMedicalFacility,
  // );

  // if (checkCompany == 401) {
  //   throw new HttpException(
  //     "Your transaction can't processed",
  //     HttpStatus.FORBIDDEN,
  //   );
  // }

  // const search = s ?? '';
  // const pageSize = sz ?? 10;
  // const pageNumber = nm ?? 1;
  // const dateStart = ds ?? dayjs().format('YYYY-MM-HH');
  // const dateEnd = de ?? dayjs().format('YYYY-MM-HH');

  // let pagePosition: number;

  // let where = 'WHERE 1';
  // let where_all = 'WHERE 1';

  await connection.query(`START TRANSACTION`);

  // $kwitansiId = $this->DoAddKwitansi($visitId, $data['payment_type_id'], $data['tarif_id'], $data['kelas_id']);
  // $this->db->query("UPDATE visits SET no_register=id, kwitansi_id=? WHERE id=?", array($kwitansiId, $visitId));
  // $this->db->query("UPDATE kwitansi_detail SET kwitansi_id=? WHERE visit_id=?", array($kwitansiId, $visitId));

  // $this->DoUpdateTotal($data['kwitansi_id']);
  // $this->DoUpdateTotal($kwitansiId);
  // return $this->db->trans_complete();
  //
  const visitId = 598709;

  const [[check]] = await connection.query(
    `SELECT payment_type_id, clinic_id, tarif_id, kelas_id, kwitansi_id FROM ${process.env.DATABASE_SIMRS}.visits WHERE id = ?`,
    [visitId],
  );
  console.log(check);

  const payment_type_id = check?.payment_type_id;
  const tarif_id = check?.tarif_id;
  const kelas_id = check?.kelas_id;
  const kwitansi_id = check?.kwitansi_id;

  const insertedKwitansi = await DoAddKwitansi(
    { visit_id: visitId, payment_type_id, tarif_id, kelas_id },
    connection,
  );

  await connection.query(
    `UPDATE ${process.env.DATABASE_SIMRS}.visits SET no_register=id, kwitansi_id=? WHERE id=?`,
    [insertedKwitansi, visitId],
  );

  await connection.query(
    `UPDATE ${process.env.DATABASE_SIMRS}.kwitansi_detail SET kwitansi_id=? WHERE visit_id=?`,
    [insertedKwitansi, visitId],
  );
  // console.log(insertedKwitansi);
  // console.log(UpdateVisits);
  // console.log(UpdateKwitansiDetail);

  await DoUpdateReceipt(kwitansi_id, connection);
  await DoUpdateReceipt(insertedKwitansi, connection);

  await connection.query(`COMMIT`);

  // const [updatDoUpdateReceipteKwitansiInVisit] = await connection.query(
  //   `UPDATE visits SET kwitansi_id=? WHERE id=?`,
  //   [check?.kwitansi_id, check?.kwitansi_id],
  // );

  // function DoAddKwitansi($visitId, $paymentTypeId, $tarifId, $kelasId) {
  //   $this -> kwitansiId = $this -> db -> insert_id();
  //   $this -> db -> query("UPDATE visits SET kwitansi_id=? WHERE id=?", array($this -> kwitansiId, $visitId));
  //   return $this -> kwitansiId;
  //   //$kwitansiId = $this->db->insert_id();
  // }

  // const [texsst] = await connection.query(
  //   `UPDATE kwitansi SET total=(SELECT SUM(sub_total) FROM kwitansi_detail WHERE kwitansi_id=?) WHERE id=?`,
  //   [576978, 576978],
  // );
  // console.log(texsst);
  // return $this->db->query("UPDATE kwitansi SET total=(SELECT SUM(sub_total) FROM kwitansi_detail WHERE kwitansi_id=?) WHERE id=?", array($kwitansiId, $kwitansiId));

  // SELECT payment_type_id, clinic_id, tarif_id, kelas_id, kwitansi_id FROM visits WHERE id=?", array($visitId)
  // await connection.query(`ROLLBACK`);

  // const [getData] = await connection.query(
  //   `
  //   SELECT
  //     SQL_CALC_FOUND_ROWS
  //    	v.id,
  //    	v.no_register,
  //    	v.date,
  //    	p.id AS no_rm,
  //    	p.id AS patient_id,
  //    	p.name,
  //    	p.sex,
  //    	p.birth_date,
  //    	rc.id AS clinic_id,
  //    	rc.name AS clinic_name,
  //    	rcon.name AS 'continue',
  //    	rpar.name AS doctor,
  //    	rpay.id AS payment_type_id,
  //     rpay.name as payment_type_name,
  //    	v.queue_number_prefix,
  //    	v.queue_number,
  //    	v.apotek_queue_number,
  //    	v.kasir_queue_called,
  //    	v.status_obat_selesai,
  //    	v.jenis_resep,
  //    	v2.id AS has_rujuk_internal,
  //    	kw.status,
  //    	kw.total,
  //    	kw.bayar,
  //    	kw.bayar_non_tunai,
  //    	p.covid19_status,
  //    	p.blocked
  //   FROM
  //    	${process.env.DATABASE_SIMRS}.visits v
  //    	JOIN ${process.env.DATABASE_SIMRS}.patients p ON (p.id = v.patient_id)
  //    	JOIN ${process.env.DATABASE_SIMRS}.ref_clinics rc ON (rc.id = v.clinic_id)
  //    	JOIN ${process.env.DATABASE_SIMRS}.kwitansi kw ON (kw.id = v.kwitansi_id)
  //    	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_continue rcon ON (rcon.id = v.continue_id)
  //    	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_paramedics rpar ON (rpar.id = v.paramedic_id)
  //    	LEFT JOIN ${process.env.DATABASE_SIMRS}.ref_payment_types rpay ON (rpay.id = v.payment_type_id)
  //    	LEFT JOIN ${process.env.DATABASE_SIMRS}.visits v2 ON (v2.parent_id = v.id)
  //     ${where}
  //     `,
  // );
  // const [rowCount] = await connection.query(`SELECT FOUND_ROWS() `);
  // const dataRow = rowCount?.[0]?.['FOUND_ROWS()'] ?? 0;

  // await connection.query(
  //   `
  //     INSERT INTO system_logger(
  //       parameter,
  //       url,
  //       action,
  //       response)
  //     VALUES(
  //       ?,
  //       ?,
  //       ?,
  //       ?
  //     )
  //   `,
  //   [
  //     decryptor(headers.payload, process.env.SALT_TRIPLE),
  //     'apps-internal/cashier/outpatient',
  //     'GET',
  //     'Data served',
  //   ],
  // );

  // if (getData.length < 1) {
  //   return {
  //     message: 'Horayyy, you can access app now',
  //     data: [],
  //     summary: {
  //       all_data_count: 0,
  //       data_count: 0,
  //       page_total: Math.ceil(pagePosition),
  //       page_size: pageSize,
  //       page_number: pageNumber,
  //       can_next: false,
  //       can_previous: false,
  //     },
  //   };
  // }

  // pagePosition = parseInt(dataRow) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    // data: getData ?? [],
    // summary: {
    //   all_data_count: parseInt(dataRow) ?? 0,
    //   data_count: getData.length,
    //   page_total: Math.ceil(pagePosition),
    //   page_size: pageSize,
    //   page_number: pageNumber,
    //   can_next: pageNumber < Math.ceil(pagePosition),
    //   can_previous: pageNumber !== 1,
    // },
  };
};
