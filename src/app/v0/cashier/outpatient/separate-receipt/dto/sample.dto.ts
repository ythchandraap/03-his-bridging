// //pisahbilling start
// function PisahBilling($visitId) {
//   //generate kwitansi
//   $this -> db -> trans_start();
//   //$this->db->query("UPDATE visits SET no_register=NULL WHERE id=?", array($visitId));
//   $sql = $this -> db -> query("SELECT payment_type_id, clinic_id, tarif_id, kelas_id, kwitansi_id FROM visits WHERE id=?", array($visitId));
//   $data = $sql -> row_array();
//   $this -> DoUpdateTotal($data['kwitansi_id']);

//   $param['clinic_id'] = $data['clinic_id'];
//   $param['kelas_id'] = $data['kelas_id'];
//   //$param['kelas_id'] = $data['kelas_id'];
//   $kwitansiId = $this -> DoAddKwitansi($visitId, $data['payment_type_id'], $data['tarif_id'], $data['kelas_id']);
//   $this -> db -> query("UPDATE visits SET no_register=id, kwitansi_id=? WHERE id=?", array($kwitansiId, $visitId));
//   $this -> db -> query("UPDATE kwitansi_detail SET kwitansi_id=? WHERE visit_id=?", array($kwitansiId, $visitId));

//   $this -> DoUpdateTotal($data['kwitansi_id']);
//   $this -> DoUpdateTotal($kwitansiId);
//   return $this -> db -> trans_complete();
// }

// function DoAddKwitansi($visitId, $paymentTypeId, $tarifId, $kelasId) {
//   $sql = $this -> db -> query("INSERT INTO kwitansi(jenis, payment_type_id, tarif_id, kelas_id, user_id, `date`, insert_date) VALUES(?,?,?,?,?,?,?)",
//     array('RJ', $paymentTypeId, $tarifId, $kelasId, $this -> session -> userdata('id'), date('Y-m-d H:i:s'), date('Y-m-d H:i:s')));
//   //print_r($this->db->error());
//   $this -> kwitansiId = $this -> db -> insert_id();
//   $this -> db -> query("UPDATE visits SET kwitansi_id=? WHERE id=?", array($this -> kwitansiId, $visitId));
//   return $this -> kwitansiId;
//   //$kwitansiId = $this->db->insert_id();
// }
// //pisahbililing end

//     function DoUpdateTotal($kwitansiId) {
// 		return $this->db->query("UPDATE kwitansi SET total=(SELECT SUM(sub_total) FROM kwitansi_detail WHERE kwitansi_id=?) WHERE id=?", array($kwitansiId, $kwitansiId));
// 	}

// 	// function DoDeleteKwitansiDetail($id) {
// 	// 	$sql = $this->db->query("SELECT kwitansi_id FROM kwitansi_detail WHERE id=?", array($id));
// 	// 	$data = $sql->row_array();

// 	// 	$sql = $this->db->query("
// 	// 		DELETE FROM
// 	// 			kwitansi_detail
// 	// 		WHERE
// 	// 			id=?", array(
// 	// 		$id
// 	// 	));
// 	// 	$u = $this->DoUpdateTotal($data['kwitansi_id']);
// 	// 	return $sql;
// 	// }
// 	//
// 	//
// 	//
// 	//
// 	//
// 	/
// 	function DoAddKwitansi($visitId, $paymentTypeId, $tarifId, $kelasId) {
// 		$sql = $this->db->query("INSERT INTO kwitansi(jenis, payment_type_id, tarif_id, kelas_id, user_id, `date`, insert_date) VALUES(?,?,?,?,?,?,?)",
// 		array('RJ',$paymentTypeId, $tarifId, $kelasId, $this->session->userdata('id'), date('Y-m-d H:i:s'), date('Y-m-d H:i:s')));
// 		//print_r($this->db->error());
// 		$this->kwitansiId = $this->db->insert_id();
// 		$this->db->query("UPDATE visits SET kwitansi_id=? WHERE id=?", array($this->kwitansiId, $visitId));
// 		return $this->kwitansiId;
// 		//$kwitansiId = $this->db->insert_id();
// 	}
// 	function DoAddKwitansi() {
// $param = $_POST;
// if($param['kwitansi_id'] == '') {
// //get no kwitansi
// $sql = $this->db->query("SELECT IFNULL(MAX(no_kwitansi)+1,1) as no_kwitansi FROM kwitansi WHERE jenis='LAIN'");
// $data = $sql->row_array();

// //insert kwitansi
// $this->db->query("INSERT INTO kwitansi(no_kwitansi,jenis,payment_type_id,jenis_pasien,keterangan,`date`) VALUES(?,'LAIN','1','Pasien Luar',?,NOW())", array($data['no_kwitansi'],$param['keterangan']));
// $param['kwitansi_id'] = $this->db->insert_id();
// }
// return $param['kwitansi_id'];
// }
