import { HttpException, HttpStatus } from '@nestjs/common';

export const getVisit = async (headers: any, connection: any) => {
  const company: number = 1;
  const { uuid } = headers;

  const [getData] = await connection.query(
    `
      SELECT
     	  t_wallet_uuid,
        t_wallet_name,
        t_wallet_nominal,
        is_active
      FROM
        t_wallets
      WHERE
        company_profile_id = ?
        AND t_wallet_uuid = ?
      `,
    [company, uuid],
  );

  // function GetListKwitansiDetail($kwitansiId) {
  // 	//get the current selected data
  // 	$sql = $this->db->query("
  // 		SELECT
  // 			kd.`id`,
  // 			kd.`komponen_biaya_group_id`,
  // 			kd.`komponen_biaya_id`,
  // 			kd.`group`,
  // 			kd.`name`,
  // 			kd.`harga`,
  // 			SUM(kd.`jumlah`) as jumlah,
  // 			SUM(kd.`sub_total`) as sub_total
  // 		FROM
  // 			kwitansi_detail kd
  // 		WHERE
  // 			kd.kwitansi_id=?
  // 		GROUP BY kd.komponen_biaya_id
  // 		ORDER BY kd.ordering, kd.name
  // 		",
  // 		array($kwitansiId));
  // 	//echo $this->db->last_query();
  // 	return $sql->result_array();
  // }

  if (getData.length < 1)
    throw new HttpException('Your data not found', HttpStatus.NOT_FOUND);

  return {
    statusCode: HttpStatus.OK,
    message: 'Data from ' + uuid,
    data: getData,
  };
};
