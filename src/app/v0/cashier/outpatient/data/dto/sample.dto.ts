// <?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

// Class Rawatjalan_Model extends CI_Model {

//     function __construct() {
//         parent::__construct();
//     }

// //GET//
//     /*
// 	function GetTotal($kwitansiId) {
// 		$sql = $this->db->query("SELECT total FROM kwitansi WHERE id=?", array($kwitansiId));
// 		$data = $sql->row_array();
// 		return $data['total'];
// 	}*/

// 	function SetLunas($kwitansiId) {
// 		$sql = $this->db->query("UPDATE kwitansi SET status='LUNAS', transaction_status='closed' WHERE id=?", array($kwitansiId));
// 		return $sql;
// 	}

// 	function Block($patientId) {
// 		$sql = $this->db->query("UPDATE patients SET blocked='1' WHERE id=?", array($patientId));
// 		return $sql;
// 	}

// 	function Unblock($patientId) {
// 		$sql = $this->db->query("UPDATE patients SET blocked='0' WHERE id=?", array($patientId));
// 		return $sql;
// 	}

// 	function GetSetoranKwitansiId($kwitansiId) {
// 		$sql = $this->db->query("SELECT setoran_kwitansi_id FROM kwitansi WHERE id=?", array($kwitansiId));
// 		$data = $sql->row_array();
// 		return $data['setoran_kwitansi_id'];
// 	}

// 	function GetServerQueueNumberKasir() {
// 		$sql = $this->db->query("SELECT * FROM apps_printer WHERE printer_name='SERVER_QUEUE_NUMBER_KASIR' AND `ip`=?", array($_SERVER['REMOTE_ADDR']));
// 		$data = $sql->row_array();
// 		return $data['value'];
// 	}

// 	function DoUpdateQueueNumberCalled($visitId) {
// 		$tgl = date('Y-m-d H:i:s');
// 		return $this->db->query("UPDATE visits SET kasir_queue_called='1', kasir_queue_called_date=? WHERE id=?", array($tgl, $visitId));
// 	}

// 	function GetAllPrinter() {
// 		$sql = $this->db->query("SELECT * FROM ref_printers");
// 		return $sql->result_array();
// 	}

// 	function GetPrinter() {
// 		$sql = $this->db->query("SELECT * FROM apps_printer WHERE `ip`=?", array($_SERVER['REMOTE_ADDR']));
// 		return $sql->result_array();
// 	}

// 	function GetClinicName($clinicId) {
// 		$sql = $this->db->query("
// 		SELECT name FROM ref_clinics WHERE id=?
// 		", array($clinicId));
// 		return $sql->row_array();
// 	}

//     function GetGrid($param, $start, $offset) {
// 		//$arr_search = explode("_", $str_search);
// 		//$arr_search[1] = empty($arr_search[1])?date('j M Y'):$arr_search[1];
// 		//$arr_search[2] = empty($arr_search[2])?date('j M Y'):$arr_search[2];
// 		$where = "  ";
// 		$ordering = "";
// 		//$where .= ($param['dokter_tidak_diisi'] == '1')?" AND v.paramedic_id IS NULL ":"";
// 		$where .= ($param['clinic_id'] != '')?" AND rc.id=".$param['clinic_id']." ":"";
// 		$where .= ($param['payment_type_id'] != '')?" AND v.payment_type_id=".$param['payment_type_id']." ":"";
// 		$where .= ($param['batal'] == '1')?"":" AND (v.continue_id IS NULL OR v.continue_id !='10') ";
// 		$where .= ($param['parent_id'] == '')?" AND (v.no_register = v.id) ":"";
// 		if($param['filter_sort'] == 'UMUM, BELUM BAYAR, OBAT SIAP') {
// 			$where .= " AND v.payment_type_id=1 AND kw.`status`='BELUM BAYAR' AND v.status_obat_selesai='S' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'SELAIN BPJS, BELUM BAYAR, OBAT SIAP') {
// 			$where .= " AND v.payment_type_id<>64 AND kw.`status`='BELUM BAYAR' AND v.status_obat_selesai='S' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'ALL, BELUM BAYAR, OBAT SIAP') {
// 			$where .= " AND kw.`status`='BELUM BAYAR' AND v.status_obat_selesai='S' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'UMUM, BELUM BAYAR, OBAT BELUM') {
// 			$where .= " AND v.payment_type_id=1 AND kw.`status`='BELUM BAYAR' AND v.status_obat_selesai='B' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'BPJS, BELUM BAYAR, OBAT BELUM') {
// 			$where .= " AND v.payment_type_id=64 AND kw.`status`='BELUM BAYAR' AND v.status_obat_selesai='B' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'BPJS, BELUM BAYAR, OBAT SIAP') {
// 			$where .= " AND v.payment_type_id=64 AND kw.`status` IN ('BELUM BAYAR', 'PROSES BAYAR', NULL) AND v.status_obat_selesai='S' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} elseif($param['filter_sort'] == 'BELUM BAYAR') {
// 			$where .= " AND kw.`status`='BELUM BAYAR' AND (v.continue_id<>2 OR v.continue_id IS NULL) ";
// 			$ordering = " v.apotek_queue_number, v.apotek_queue_print_date, v.`date` ";
// 		} else {
// 			$ordering = " rc.name, v.id,p.name ";
// 		}
//         $sql = $this->db->query("
//             SELECT
// 				SQL_CALC_FOUND_ROWS
// 				v.`id` as `id`,
// 				v.no_register,
// 				DATE_FORMAT(v.`date`, '%d-%m-%Y %H:%i') as `date`,
// 				CONCAT_WS('-', SUBSTRING(p.id, 1,2), SUBSTRING(p.id, 3,2), SUBSTRING(p.id, 5,2)) as no_rm,
// 				p.`id` as `patient_id`,
// 				p.`name` as `name`,
// 				p.`sex` as `sex`,
// 				p.`birth_date` as `birth_date`,
// 				rc.`id` as `clinic_id`,
// 				rc.`name` as `clinic_name`,
// 				rcon.name as `continue`,
// 				rpar.name as doctor,
// 				rpay.id as payment_type_id,
// 				SUBSTRING(rpay.name,1,7) as payment_type_name,
// 				v.queue_number_prefix,
// 				v.queue_number,
// 				v.apotek_queue_number,
// 				v.kasir_queue_called,
// 				v.status_obat_selesai,
// 				v.jenis_resep,
// 				v2.id as has_rujuk_internal,
// 				kw.status,
// 				kw.total,
// 				kw.bayar,
// 				kw.bayar_non_tunai,
// 				p.covid19_status,
// 				p.blocked
// 			FROM
// 				`visits` v
// 				JOIN `patients` p ON (p.`id` = v.`patient_id` )
// 				JOIN `ref_clinics` rc ON (rc.`id` = v.`clinic_id`)
// 				JOIN kwitansi kw ON (kw.id=v.kwitansi_id)
// 				LEFT JOIN `ref_continue` rcon ON (rcon.`id` = v.`continue_id`)
// 				LEFT JOIN `ref_paramedics` rpar ON (rpar.`id` = v.`paramedic_id`)
// 				LEFT JOIN `ref_payment_types` rpay ON (rpay.`id` = v.`payment_type_id`)
// 				LEFT JOIN visits v2 ON (v2.parent_id=v.id)
// 			WHERE
// 				1
// 				AND (p.`id` LIKE ? OR p.`name` LIKE ?)
// 				AND DATE(v.date) BETWEEN STR_TO_DATE(?, '%e %b %Y') AND  STR_TO_DATE(?, '%e %b %Y')
// 				$where
// 			GROUP BY v.id
// 			ORDER BY $ordering
// 			LIMIT $start, $offset
//                 ", array(
//                     "%" . $param['q'] . "%",
//                     "%" . $param['q'] . "%",
//                     $param['date_start'],
//                     $param['date_end']
//                 ));

// 				/*AND (vic.`exit_date` IS NULL
// 					OR DATE(vic.`exit_date`) >= STR_TO_DATE(?, '%e %b %Y')
// 					)
// 				*/

// 		//$data_pendaftaran = $sql->row_array();
// 		//print_r($data_pendaftaran);
// 		//print_r($param);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
//         return $sql->result_array();
//     }

//     function GetGridCount() {
//         $query = $this->db->query("SELECT FOUND_ROWS() as total");
//         if($query->num_rows() > 0) {
//             $data = $query->row_array();
//             return $data['total'];
//         } else {
//             return false;
//         }
//     }

// 	/*
// 	function GetUserKasir() {
// 		//cek login is kasir :
// 		$sql = $this->db->query("SELECT id, name FROM users WHERE ttd_rincianbiaya_by_rm='1' AND id=?", array($this->session->userdata('id')));
// 		$data = $sql->row_array();
// 		if(empty($data)) {
// 			$sql = $this->db->query("SELECT id, name FROM users WHERE ttd_rincianbiaya_by_rm='1' ORDER BY RAND() LIMIT 0,1");
// 			$data = $sql->row_array();
// 			return $data;
// 		}
// 	}*/

//     function GetGridRujukInternal($parentId) {
// 		$where = " ";
// 		$ordering = " v.id ";
//         $sql = $this->db->query("
//             SELECT
// 				v.`id` as `id`,
// 				v.no_register,
// 				DATE_FORMAT(v.`date`, '%d-%m-%Y %H:%i') as `date`,
// 				CONCAT_WS('-', SUBSTRING(p.id, 1,2), SUBSTRING(p.id, 3,2), SUBSTRING(p.id, 5,2)) as no_rm,
// 				p.`id` as `patient_id`,
// 				p.`name` as `name`,
// 				p.`sex` as `sex`,
// 				p.`birth_date` as `birth_date`,
// 				rc.`id` as `clinic_id`,
// 				rc.`name` as `clinic_name`,
// 				rcon.name as `continue`,
// 				rpar.name as doctor,
// 				rpay.id as payment_type_id,
// 				SUBSTRING(rpay.name,1,7) as payment_type_name,
// 				v.queue_number_prefix,
// 				v.queue_number,
// 				v.apotek_queue_number,
// 				v.kasir_queue_called,
// 				v.status_obat_selesai,
// 				v.jenis_resep,
// 				kw.status
// 			FROM
// 				`visits` v
// 				JOIN `patients` p ON (p.`id` = v.`patient_id` )
// 				JOIN `ref_clinics` rc ON (rc.`id` = v.`clinic_id`)
// 				JOIN kwitansi kw ON (kw.id=v.kwitansi_id)
// 				LEFT JOIN `ref_continue` rcon ON (rcon.`id` = v.`continue_id`)
// 				LEFT JOIN `ref_paramedics` rpar ON (rpar.`id` = v.`paramedic_id`)
// 				LEFT JOIN `ref_payment_types` rpay ON (rpay.`id` = v.`payment_type_id`)
// 			WHERE
// 				v.parent_id=?
// 				$where
// 			GROUP BY v.id
// 			ORDER BY $ordering
//                 ", array(
// 					$parentId
//                 ));

//         return $sql->result_array();
//     }

//     function GetComboKelas() {
//         $sql = $this->db->query("SELECT * FROM ref_kelas ");
//         return $sql->result_array();
//     }

//     function GetComboTarif() {
//         $sql = $this->db->query("SELECT * FROM ref_tarif WHERE active='1' ");
//         return $sql->result_array();
//     }

//     function GetComboBankPenampung() {
//         $sql = $this->db->query("SELECT * FROM ref_bank_penampung ORDER BY name ");
//         return $sql->result_array();
//     }

//     function GetComboJob() {
//         $sql = $this->db->query("
//             SELECT id as id, name as name FROM ref_jobs"
//         );
//         return $sql->result_array();
//     }

//     function GetComboEducation() {
//         $sql = $this->db->query("
//             SELECT id as id, name as name FROM ref_educations"
//         );
//         return $sql->result_array();
//     }

//     function GetComboLanguage() {
//         $sql = $this->db->query("
//             SELECT id as id, name as name FROM ref_languages"
//         );
//         return $sql->result_array();
//     }

//     function GetComboClinics() {
//         $sql = $this->db->query("
//             SELECT
//                 *
//             FROM ref_clinics
//             WHERE `active`='yes' AND `visible`='yes' AND `type` NOT IN ('rawat inap')
//             ORDER BY name ASC
//             "
//         );
//         return $sql->result_array();
//     }

//     function GetComboPaymentType() {
//         $sql = $this->db->query("
//             SELECT id, name FROM ref_payment_types order by name ASC"
//         );
//         return $sql->result_array();
//     }

//     function GetComboAdmissionType() {
//         $sql = $this->db->query(
//         "
//           SELECT id as id, name as name
//          FROM ref_admission_types WHERE active='yes' AND id NOT IN (4)"
//         );
//         return $sql->result_array();
//     }

//     function GetComboInpatientClinic() {
//         $sql = $this->db->query("
//             SELECT
//                 ric.`id` as `id`,
//                 CONCAT (ric.name, ' kelas ', rk.name) as name
//             FROM
//                 `ref_inpatient_clinics` ric
//                 JOIN ref_kelas rk ON (rk.id = ric.kelas_id)
//             WHERE
// 				1
// 				AND ric.tahun_awal<=YEAR(CURDATE())
// 				AND (ric.tahun_akhir>=YEAR(CURDATE()) OR ric.tahun_akhir IS NULL)
// 			ORDER BY `name`"
//         );
//         return $sql->result_array();
//     }

//     function GetListIcd($q) {
//         $sql = $this->db->query("
//             SELECT `code`, `name` as `label`
//             FROM `ref_icds`
//             WHERE `code` LIKE ?
//                    OR `name` LIKE ?
//                    OR `gol_sebab_sakit` LIKE ?
//                    OR `keyword` LIKE ?
//                    AND (
// 						`tree` = 'N'
//                    )
//             ORDER BY `code`
//         ",
//             array(
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%'
//             )
//         );
//         return $sql->result_array();
//     }

// 	function GetDataDiagnoseById($id) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				ad.id,
// 				ad.icd_code,
// 				ad.icd_name,
// 				ad.`case`,
// 				ad.`mati`,
// 				ad.`jenis`
// 			FROM
// 				`anamnese_diagnoses` ad
// 			WHERE
// 				ad.`id`=?
// 		",
// 			array(
//                 $id
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->row_array();
// 	}

// 	function GetDataDiagnoses($visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				ad.id,
// 				ad.visit_id,
// 				ad.icd_code,
// 				ad.icd_name,
// 				ad.`case`,
// 				ad.`mati`,
// 				ad.`jenis`,
// 				ad.ordering
// 			FROM
// 				`anamnese_diagnoses` ad
// 			WHERE
// 				ad.`visit_id`=?
// 			ORDER BY ad.ordering, ad.id
// 		",
// 			array(
//                 $visitId
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->result_array();
// 	}

// 	function DiagnosesMoveUp($visitId, $id, $ordering) {
// 		$switch = $this->db->query("
// 		SELECT
// 			id, ordering
// 		FROM
// 			anamnese_diagnoses
// 		WHERE
// 			visit_id=?
// 			AND ordering < ?
// 		ORDER BY
// 			ordering DESC LIMIT 1",
// 		array($visitId, $ordering));

//         $switch_data = $switch->row_array();
// 		//print_r($switch_data);
// 		//echo $this->db->last_query();
//         if(!empty($switch_data)) {
//             $this->db->query("UPDATE anamnese_diagnoses SET ordering=? WHERE id=?", array(
//                 $ordering,
//                 $switch_data['id']
//             ));
//             $this->db->query("UPDATE anamnese_diagnoses SET ordering=? WHERE id=?", array(
//                 $switch_data['ordering'],
//                 $id,
//             ));
//         }
//     }

// 	function DiagnosesMoveDown($visitId, $id, $ordering) {
// 		$switch = $this->db->query("
// 		SELECT
// 			id, ordering
// 		FROM
// 			anamnese_diagnoses
// 		WHERE
// 			visit_id=?
// 			AND ordering > ?
// 		ORDER BY
// 			ordering ASC LIMIT 1",
// 		array($visitId, $ordering));

//         $switch_data = $switch->row_array();
//         //print_r($switch_data);
//         if(!empty($switch_data)) {
//             $this->db->query("UPDATE anamnese_diagnoses SET ordering=? WHERE id=?", array(
//                 $ordering,
//                 $switch_data['id']
//             ));
//             $this->db->query("UPDATE anamnese_diagnoses SET ordering=? WHERE id=?", array(
//                 $switch_data['ordering'],
//                 $id,
//             ));
//         }
//     }

//     function GetListIcd9Cm($q) {
//         $sql = $this->db->query("
//             SELECT `code`, `name` as `label`
//             FROM `ref_icd9cm`
//             WHERE `code` LIKE ?
//                    OR `name` LIKE ?
//             ORDER BY `code`
//         ",
//             array(
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%'
//             )
//         );
//         return $sql->result_array();
//     }

//     function GetListBank() {
//         $sql = $this->db->query("
//             SELECT id, name as label, debit_card_charge*100 as debit_card_charge, credit_card_charge*100 as credit_card_charge FROM ref_bank WHERE name LIKE ? ORDER BY name LIMIT 0,5 "
//         , array('%' . $this->input->post('term') . '%'));
//         return $sql->result_array();
//     }

//     function GetListDoctor($clinicId = "") {
// 		$clinicId = ($clinicId == '001')?'022':$clinicId;
// 		$where = "";
// 		if($clinicId != '') {
// 			$where = " AND clinic_id='".$clinicId."' ";
// 		}
//         $sql = $this->db->query("
//             (SELECT id, name as label FROM ref_paramedics WHERE name LIKE ? $where ORDER BY name)
//             UNION
//             (SELECT id, name as label FROM ref_paramedics WHERE name LIKE ? AND clinic_id IS NULL ORDER BY name)
//             UNION
//             (SELECT id, name as label FROM ref_paramedics WHERE name LIKE ? AND clinic_id='022' ORDER BY name)
//             UNION
//             (SELECT id, name as label FROM ref_paramedics WHERE name LIKE ? ORDER BY name)
//             "
//         , array(
// 			'%' . $this->input->post('term') . '%',
// 			'%' . $this->input->post('term') . '%',
// 			'%' . $this->input->post('term') . '%',
// 			'%' . $this->input->post('term') . '%'
// 		));
// 		//echo $this->db->last_query();
//         return $sql->result_array();
//     }

// 	function GetDataIndividu($visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				p.id as patient_id,
// 				v.no_register,
// 				v.id as visit_id,
// 				v.clinic_id,
// 				CONCAT_WS('-', SUBSTRING(p.id, 1,2), SUBSTRING(p.id, 3,2), SUBSTRING(p.id, 5,2)) as no_rm,
// 				p.id as patient_id,
// 				p.`name`,
// 				p.`sex` as `sex`,
// 				p.`birth_date`,
// 				p.phone,
// 				v.penanggungjawab_name,
// 				v.penanggungjawab_address,
// 				v.penanggungjawab_telp,
// 				v.`date` as `date`,
// 				v.continue_id,
// 				v.ugd_kasus,
// 				v.ugd_kecelakaan,
// 				v.ugd_mati,
// 				v.dirujuk_ke,
// 				v.anamnese,
// 				v.diagnose,
// 				DATE_FORMAT(v.`date`, '%e %b %Y %H:%i') as entry_date_formatted,
// 				v.paramedic_id as doctor_id,
// 				CONCAT_WS(', ', v.`address`, rv.name, rsd.name, rd.`name`) as `address`,
// 				v.address as address_only,
// 				rv.name as village,
// 				rsd.name as sub_district,
// 				rd.name as district,
// 				rprov.name as province,
// 				rpt.id as payment_type_id,
// 				rpt.name as payment_type_name,
// 				rat.name as admission_type_name,
// 				rc.id as clinic_id,
// 				rc.name as clinic_name,
// 				rp.name as doctor_name,
// 				rper.name as pengirim,
// 				v.kwitansi_id,
// 				MAX(pr.id) as prescription_id,
// 				v.appointment_id,
// 				kw.tarif_id,
// 				kw.kelas_id,
// 				rj.name as job,
// 				re.name as education,
// 				p.patient_note,
// 				v.bpjs_no_sep
// 			FROM
// 				`patients` p
// 				JOIN `visits` v ON (v.`patient_id` = p.`id`)
// 				LEFT JOIN ref_villages rv ON (rv.id = v.village_id)
// 				LEFT JOIN ref_sub_districts rsd ON (rsd.id = v.sub_district_id)
// 				LEFT JOIN ref_districts rd ON (rd.id = v.district_id)
// 				LEFT JOIN ref_provinces rprov ON (rprov.id = v.province_id)
// 				JOIN `ref_payment_types` rpt ON (rpt.`id` = v.`payment_type_id`)
// 				JOIN `ref_admission_types` rat ON (rat.`id` = v.`admission_type_id`)
// 				JOIN `ref_clinics` rc ON (rc.`id` = v.`clinic_id`)
// 				LEFT JOIN `prescriptions` pr ON (pr.`visit_id` = v.`id`)
// 				LEFT JOIN `ref_paramedics` rp ON (rp.`id` = v.`paramedic_id`)
// 				LEFT JOIN `ref_pengirim` rper ON (rper.`id` = v.`pengirim_id`)
// 				JOIN ref_jobs rj ON (rj.id = p.job_id)
// 				JOIN ref_educations re ON (re.id = p.education_id)
// 				JOIN kwitansi kw ON (kw.id = v.kwitansi_id)
// 			WHERE
// 				v.`id`=?
// 		",
// 			array(
//                 $visitId
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->row_array();
// 	}

// 	function GetTotal($kwitansiId) {
// 		$sql = $this->db->query("SELECT SUM(sub_total) as total FROM kwitansi_detail WHERE kwitansi_id=?", array(
// 			$kwitansiId
// 		));
// 		$data = $sql->row_array();
// 		return $data['total'];
// 	}

// 	function GetDataDiagnoseMasuk($visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				icd_code,
// 				icd_name
// 			FROM
// 				`anamnese_diagnoses`
// 			WHERE
// 				`visit_id`=?
// 		",
// 			array(
//                 $visitId
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->result_array();
// 	}

// 	function GetDataDiagnose($visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				ad.id,
// 				ad.icd_code,
// 				ad.icd_name,
// 				ad.`case`,
// 				ad.mati
// 			FROM
// 				`anamnese_diagnoses` ad
// 			WHERE
// 				ad.`visit_id`=?
// 		",
// 			array(
//                 $visitId
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->result_array();
// 	}

// 	function GetDataIcd9Cm($visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				id,
// 				icd9cm_code,
// 				icd9cm_name
// 			FROM
// 				`visits_icd9cm`
// 			WHERE
// 				`visit_id`=?
// 		",
// 			array(
//                 $visitId
//             )
// 		);
// 		//echo "<pre>" . $this->db->last_query() . "</pre>";
// 		return $sql->result_array();
// 	}

// 	function GetComboKeadaanKeluar() {
//         $sql = $this->db->query("
//             SELECT * FROM ref_inpatient_exit_conditions
//         "
//         );
//         return $sql->result_array();
// 	}

// 	function GetComboCaraKeluar() {
//         $sql = $this->db->query("
//             SELECT * FROM ref_inpatient_continue
//         "
//         );
//         return $sql->result_array();
// 	}

//     function GetComboParamedic($jenis='Doctor') {
//         $sql = $this->db->query("
// 			SELECT
//                 id,
//                 name
//             FROM
//                 ref_paramedics
//             WHERE
// 				jenis=?
//                 AND active='yes'
//             ORDER BY name
//         ", array($jenis));
//         return $sql->result_array();
//     }

//     function GetComboAgama() {
//         $sql = $this->db->query(
//         "
//           SELECT id as id, name as name ".
//         " FROM ref_agama"
//         );
//         return $sql->result_array();
//     }

//     function GetComboFamilyRelationship() {
//         $sql = $this->db->query(
//         "
//           SELECT id as id, name as name ".
//         " FROM ref_family_relationship ORDER BY id"
//         );
//         return $sql->result_array();
//     }

//     function CekBelumDipulangkan() {
// 		/*get data clinicnya*/
//         $sql = $this->db->query("
//             SELECT
// 				p.id as no_rm,
// 				p.name as name,
//                 CONCAT (ric.name, ' kelas ', rk.name) as ruang,
// 				DATE_FORMAT(vi.entry_date, '%d-%m-%Y') as entry_date
//             FROM
// 				`visits_inpatient` vi
// 				JOIN patients p ON (p.id = vi.patient_id)
// 				JOIN visits_inpatient_clinic vic ON (vic.visit_inpatient_id = vi.id)
//                 JOIN `ref_inpatient_clinics` ric ON (ric.id = vic.inpatient_clinic_id)
//                 JOIN ref_kelas rk ON (rk.id = ric.kelas_id)
//             WHERE
// 				p.id=?
// 				AND vi.`visit_id` <> ?
// 				AND vi.exit_date IS NULL
//         ",
//             array(
// 				$this->input->post('patient_id'),
// 				$this->input->post('visit_id')
// 			)
//         );
//         $data = $sql->row_array();
//         return $data;
//     }

//     function GetComboContinue() {
//         $sql = $this->db->query("
//             SELECT * FROM ref_continue ORDER BY id
//         "
//         );
//         return $sql->result_array();
//     }

//     function GetListDistrict() {
//         $sql = $this->db->query("
// 		SELECT a.id, a.label, a.jumlah FROM (SELECT
// 			rd.id, rd.name as label,
// 			COUNT(p.district_id) as jumlah
// 		FROM ref_districts rd
// 			JOIN patients p ON (p.district_id = rd.id)
// 		GROUP BY rd.id ORDER BY jumlah DESC) a
// 		UNION
//             SELECT b.id, b.label, b.jumlah FROM (
// 			SELECT id, name as label, 0 AS jumlah  FROM ref_districts WHERE id NOT IN (
// 				SELECT rd.id
// 				FROM ref_districts rd
// 				JOIN patients p ON (p.district_id = rd.id)
// 		) ORDER BY label) b "
//         );
//         return $sql->result_array();
//     }

//     function GetDataPrescriptionByNoRegister($noRegister) {
// 		$sql = $this->db->query("
// 			SELECT
// 				pr.id,
// 				pd.drug_name as name,
// 				pr.`date`,
// 				SUM(pd.jumlah) as jumlah,
// 				pd.aturan_1,
// 				pd.aturan_2,
// 				pd.aturan_3,
// 				SUM(pd.sub_total) AS sub_total
// 			FROM
// 				prescriptions pr
// 				JOIN prescriptions_detail pd ON (pd.prescription_id = pr.id)
// 				JOIN visits v ON (v.id = pr.visit_id)
// 			WHERE
// 				v.no_register=?
// 				AND pr.jenis IN ('Resep', 'Retur')
// 			GROUP BY pd.drug_code
// 			ORDER BY pd.drug_name
// 		", array($noRegister));
// 		return $sql->result_array();
// 	}

// 	function GetDataKwitansiDetail($kwitansiId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT * FROM kwitansi_detail WHERE kwitansi_id=? ",
// 			array($kwitansiId));
// 		return $sql->result_array();
// 	}

// 	function GetDataKwitansi($kwitansiId) {
// 		$sql = $this->db->query("SELECT id, jenis_pembayaran, bank, bank_penampung_id, total, debit_card_charge, credit_card_charge, biaya_kartu, plafon, downpayment, pembulatan, bayar, bayar_non_tunai, bayar_tgl as bayar_tgl_unformatted, DATE_FORMAT(bayar_tgl, '%e %b %Y') as bayar_tgl, DATE_FORMAT(bayar_tgl, '%H:%i') as bayar_jam, DATE_FORMAT(downpayment_tgl, '%e %b %Y') as downpayment_tgl, DATE_FORMAT(downpayment_tgl, '%H:%i') as downpayment_jam, no_kwitansi,jenis,jenis_pasien,keterangan,status FROM kwitansi WHERE id=?", array($kwitansiId));
// 		//echo $this->db->last_query();
// 		return $sql->row_array();
// 	}

// 	function GetTagihanLain($kwitansiId, $visitId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				SUM(sub_total) as sub_total
// 			FROM
// 				kwitansi_detail
// 			WHERE kwitansi_id=? AND (visit_inpatient_id IS NOT NULL OR visit_id<>?)
// 			",
// 			array($kwitansiId, $visitId));
// 		$data = $sql->row_array();
// 		return $data['sub_total'];
// 	}

// 	function GetDataKwitansiDetailForPrint($kwitansiId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.komponen_biaya_group_id,
// 				kd.prescription_id,
// 				kd.`group`,
// 				kd.name,
// 				kd.date,
// 				kd.harga,
// 				kd.jumlah,
// 				kd.sub_total
// 			FROM
// 				kwitansi_detail kd
// 			WHERE kd.kwitansi_id=?
// 			GROUP BY kd.`id`
// 			ORDER BY kd.ordering, kd.date
// 			",
// 			array($kwitansiId));
// 			//echo $this->db->last_query();
// 		return $sql->result_array();
// 	}

// 	function GetDataKwitansiKelompokForPrint($kwitansiId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.komponen_biaya_group_id,
// 				kd.`group`,
// 				SUM(kd.jumlah) as jumlah,
// 				SUM(kd.sub_total) as sub_total
// 			FROM kwitansi_detail kd
// 			WHERE kd.kwitansi_id=?
// 			GROUP BY kd.`group`
// 			ORDER BY kd.`ordering`

// 			",
// 			array($kwitansiId));
// 		//echo $this->db->last_query();
// 		$data = $sql->result_array();
// 		return $data;
// 	}

//     function GetListDrug() {
//         $sql = $this->db->query("
//             SELECT
// 				rd.code as code,
// 				rd.name as label,
// 				rd.satuan as satuan,
// 				SUM(dtd.jumlah) as stock_transaksi,
// 				dtd.batch_number,
// 				DATE_FORMAT(dtd.expired_date, '%e %b %Y') as expired_date,
// 				rd.harga
// 			FROM
// 				ref_drugs rd
// 				JOIN drugs_transaction_detail dtd ON (dtd.drug_code = rd.code)
// 				JOIN drugs_transaction dt ON (dt.id = dtd.drug_transaction_id)
// 			WHERE
// 				dt.bagian_id='02'
// 			AND (rd.name LIKE ? OR rd.code LIKE ?)
// 			GROUP BY rd.code,dtd.batch_number
// 			ORDER BY rd.code,dtd.expired_date,dtd.batch_number
//         ",
//             array(
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%'
//             )
//         );
//         //eliminasi stock 0
//         $data = $sql->result_array();
//         $ret = array();
//         $j=0;
//         for($i=0;$i<sizeof($data);$i++) {
// 			if($data[$i]['stock_transaksi']>0) {
// 				$ret[$j] = $data[$i];
// 				$j++;
// 			}
// 		}
// 		return $ret;
//     }

//     /*
//     function GetListDrug() {
//         $sql = $this->db->query("
//             SELECT `code`, `name` as `label`, `stock`, `satuan`, `harga`
//             FROM `ref_drugs`
//             WHERE `code` LIKE ?
//                    OR `name` LIKE ?
//             ORDER BY `code`
//         ",
//             array(
//                 '%' . $this->input->post('term') . '%',
//                 '%' . $this->input->post('term') . '%'
//             )
//         );
//         return $sql->result_array();
//     }
//     * */
//     function GetListDrugAturan($jenis) {
//         $sql = $this->db->query("
//             SELECT `id`, `name` as `label`, `name` as `value`
//             FROM `ref_drugs_aturan`
//             WHERE `name` LIKE ?
//                    AND `jenis`=?
//             ORDER BY `name`
//         ",
//             array(
//                 '%' . $_GET['term'] . '%',
//                 $jenis
//             )
//         );
// 		//echo $this->db->last_query();
//         return $sql->result_array();
//     }

//     function GetListParameteruji() {
//         $sql = $this->db->query("
//             SELECT id as id, name as label, harga as harga
//             FROM `ref_parameter_uji`
//             WHERE `name` LIKE ?
//             ORDER BY name
//         ",
//             array(
//                 '%' . $this->input->post('term') . '%'
//             )
//         );
//         return $sql->result_array();
//     }

// 	function GetTotalPrescription($prescriptionId) {
// 		$sql = $this->db->query("SELECT SUM(sub_total) as total FROM prescriptions_detail WHERE prescription_id=?", array(
// 			$prescriptionId
// 		));
// 		$data = $sql->row_array();
// 		return $data['total'];
// 	}

// 	function GetTotalLaboratorium($laboratoriumId) {
// 		$sql = $this->db->query("SELECT SUM(sub_total) as total FROM laboratorium_detail WHERE laboratorium_id=?", array(
// 			$laboratoriumId
// 		));
// 		$data = $sql->row_array();
// 		return $data['total'];
// 	}

//     function GetDataPrescription($prescriptionId) {
// 		$sql = $this->db->query("
// 			SELECT
// 				pr.id as prescription_id,
// 				pr.patient_id,
// 				pr.jenis_pasien,
// 				p.name as patient_name,
// 				pr.jumlah_hari,
// 				pr.`date`,
// 				pd.id as prescription_detail_id,
// 				pd.harga,
// 				pd.markup,
// 				pd.jumlah,
// 				pd.sub_total,
// 				pd.aturan_1,
// 				pd.aturan_2,
// 				pd.aturan_3,
// 				rd.code as drug_code,
// 				rd.name as drug_name,
// 				dtd.batch_number,
// 				DATE_FORMAT(dtd.expired_date, '%e %b %Y') as expired_date,
// 				dtd.stock_transaksi
// 			FROM
// 				prescriptions pr
// 				JOIN prescriptions_detail pd ON (pd.prescription_id = pr.id)
// 				JOIN ref_drugs rd ON (rd.code = pd.drug_code)
// 				JOIN visits v ON (v.id = pr.visit_id)
// 				JOIN patients p ON (p.id = v.patient_id)
// 				JOIN drugs_transaction_detail dtd ON (dtd.prescription_detail_id = pd.id)
// 			WHERE
// 				pr.id=?
// 		", array($prescriptionId));
// 		return $sql->result_array();
// 	}

//     function GetDataLaboratorium($laboratoriumId) {
// 		$sql = $this->db->query("
// 			SELECT
// 				rkb.id
// 				l.id as laboratorium_id,
// 				l.patient_id,
// 				l.jenis_pasien,
// 				l.name as patient_name,
// 				l.`date`,
// 				ld.id as laboratorium_detail_id,
// 				ld.harga,
// 				ld.jumlah,
// 				ld.sub_total,
// 				rpu.id as parameter_uji_id,
// 				rpu.name as parameter_uji_name
// 			FROM
// 				ref_komponen_biaya rkb
// 				JOIN ref_komponen_biaya_item rkbi ON (rkbi.id = rkb.komponen_biaya_id)
// 				JOIN ref_komponen_biaya_group rkbg ON (rkbg.id = rkbi.komponen_biaya_group_id)
// 			WHERE
// 				rkbg.layanan='LABORATORIUM'
// 				AND rkb.kelas_id='3'
// 		", array($laboratoriumId));
// 		return $sql->result_array();
// 	}

//     function GetDataDiagnosa($visitId) {
//         $sql = $this->db->query("
//             SELECT
// 				ad.`id`, ad.icd_code, ad.icd_name, ad.`case` as `case`, ad.mati as mati
//             FROM
// 				`anamnese_diagnoses` ad
//             WHERE
// 				ad.`visit_id`=?
// 				AND ad.`log`='no'
// 			ORDER BY ad.`id`
//         ",
//             array($visitId)
//         );
//         return $sql->result_array();
//     }

//     function DoAddDiagnose() {
// 		$param = $_POST;
// 		if($param['anamnese_diagnose_id'] != '' && $param['icd_code'] != '') {
// 			//update
// 			$sql = $this->db->query("
// 				UPDATE
// 					anamnese_diagnoses
// 				SET
// 					icd_code=?,
// 					icd_name=?,
// 					`case`=?,
// 					`mati`=?,
// 					`jenis`=?
// 				WHERE
// 					id=?
// 			", array(
// 				$param['icd_code'],
// 				$param['icd_name'],
// 				$param['case'],
// 				$param['mati'],
// 				$param['jenis'],
// 				$param['anamnese_diagnose_id']
// 			));
// 		} elseif($param['icd_code'] != '') {
// 			//insert
// 			//get last ordering
// 			$sql = $this->db->query("SELECT IFNULL(MAX(ordering)+1, 1) as ordering FROM anamnese_diagnoses WHERE visit_id=?", array($param['visit_id']));
// 			$data = $sql->row_array();

// 			//cek diagnosa utama exists start
// 			$sql = $this->db->query("SELECT id, `case` FROM anamnese_diagnoses WHERE visit_id=? AND visit_inpatient_id IS NULL AND jenis='Diagnosa Primer'", array($param['visit_id']));
// 			$du = $sql->row_array();
// 			if(isset($du['id']) && $du['id'] != '') {
// 				$param['case'] = $du['case'];
// 				$param['jenis'] = 'Diagnosa Sekunder';
// 				$param['mati'] = 'T';
// 			}
// 			//cek diagnosa utama exists end

// 			$sql = $this->db->query("
// 				INSERT INTO anamnese_diagnoses (visit_id, icd_code, icd_name, `case`, mati, `jenis`,`date`,ordering)
// 				VALUES(
// 					?,?,?,?,?,?,?,?
// 				)
// 			", array(
// 				$param['visit_id'],
// 				$param['icd_code'],
// 				$param['icd_name'],
// 				$param['case'],
// 				$param['mati'],
// 				$param['jenis'],
// 				date('Y-m-d H:i:s'),
// 				$data['ordering']
// 			));
// 		}
// 		return $sql;
// 	}

//     function GetActiveTarif($paymentTypeId) {
// 		$sql = $this->db->query("SELECT tarif_id FROM ref_payment_types WHERE id=?", array($paymentTypeId));
// 		$data = $sql->row_array();
// 		return $data['tarif_id'];
// 	}

// 	function CheckRawatInap() {
// 		$sql = $this->db->query("
// 		SELECT
// 			continue_id
// 		FROM
// 			visits
// 		WHERE id=?", array($this->input->post('visit_id')));
// 		$data = $sql->row_array();
// 		return $data['continue_id'];
// 	}

// 	function CheckRawatInapByKwitansiId($kwitansiId) {
// 		$sql = $this->db->query("
// 		SELECT
// 			continue_id
// 		FROM
// 			visits
// 		WHERE kwitansi_id=?
// 		AND continue_id=2", array($kwitansiId));
// 		$data = $sql->row_array();
// 		return $data['continue_id'];
// 	}

// 	function CheckStatusBayar($kwitansiId) {
// 		$sql = $this->db->query("
// 		SELECT
// 			status
// 		FROM
// 			kwitansi
// 		WHERE id=?", array($kwitansiId));
// 		$data = $sql->row_array();
// 		return $data['status'];
// 	}

// 	function CheckPrescriptionRawatJalan() {
// 		$sql = $this->db->query("
// 		SELECT
// 			pt.id
// 		FROM
// 			prescriptions_temp pt
// 			JOIN prescriptions_temp_detail ptd ON (ptd.prescription_id = pt.id)
// 		WHERE pt.served='0'
// 			AND pt.visit_id=?
// 			AND pt.visit_inpatient_id IS NULL", array($this->input->post('visit_id')));
// 		$data = $sql->row_array();
// 		//echo $this->db->last_query();
// 		if(empty($data)) return false;
// 		return true;
// 	}

//     function DoAddVisit() {
// 		$param = $_POST;
// 		$s=false;
// 		//$this->DoAddDiagnose($param);
// 		//$this->DoAddIcd9Cm($param);
// 		$s = $this->DoUpdateKunjunganRawatjalan($param);
// 		$this->DoUpdateKwitansi($param);
// 		$this->DoAddBayar($param);
// 		return $s;
// 	}

//     function DoUpdateKwitansi($param) {
// 		$sql = $this->db->query("UPDATE kwitansi SET tarif_id=?, kelas_id=?, total=(SELECT SUM(sub_total) FROM kwitansi_detail WHERE kwitansi_id=?) WHERE id=?", array($param['tarif_id'], $param['kelas_id'], $param['kwitansi_id'], $param['kwitansi_id']));
// 		return $sql;
// 	}

// 	function DoAddBayar($param) {
// 		//CEK NO KWITANSI SUDAH ADA BELUM :
// 		$sql = $this->db->query("SELECT no_kwitansi, jenis FROM kwitansi WHERE id=?", array($param['kwitansi_id']));
// 		$data = $sql->row_array();
// 		$harusdibayar = $param['harusdibayar'];
// 		$bayar_tgl = '';
// 		if($param['bayar_tgl'] != '') {
// 			$bayar_tgl = date('Y-m-d H:i:s', strtotime($param['bayar_tgl'].' '.$param['bayar_jam']));
// 		}

// 		$sql = $this->db->query("UPDATE kwitansi SET status=?, bayar_tgl=NULLIF(?,''), debit_card_charge=?, credit_card_charge=?, biaya_kartu=REPLACE(?,',',''), bayar=0, bayar_non_tunai=0, bank=?, bank_penampung_id=NULLIF(?,''), jenis_pembayaran=?, shift=?, downpayment=REPLACE(?,',',''), plafon=REPLACE(?,',',''),keterangan=? WHERE id=?", array($param['status'], $bayar_tgl, ($param['debit_card_charge']/100), ($param['credit_card_charge']/100), $param['biaya_kartu'], $param['bank'], $param['bank_penampung_id'], $param['jenis_pembayaran'], $this->session->userdata('shift'), $param['downpayment'], $param['plafon'], $param['keterangan'], $param['kwitansi_id']));

// 		if($param['status'] == 'LUNAS' || $param['status'] == 'PROSES BAYAR') {
// 			//get no kwitansi
// 			if($data['no_kwitansi']<0 || $data['no_kwitansi'] == '') {
// 				$sql = $this->db->query("SELECT IFNULL(MAX(no_kwitansi)+1,1) as no_kwitansi FROM kwitansi WHERE jenis=?", array($data['jenis']));
// 				$data = $sql->row_array();
// 			}
// 			$sql = $this->db->query("UPDATE kwitansi SET bayar=REPLACE(?,',',''), pembulatan=REPLACE(?,',',''), bayar_non_tunai=REPLACE(?,',',''), status=?, no_kwitansi=?, transaction_status='closed' WHERE id=?", array($param['tunai'], $param['pembulatan'], $param['non_tunai'], $param['status'], $data['no_kwitansi'], $param['kwitansi_id']));

// 			//echo $this->db->last_query();

// 			//update persen_jasa
// 			$sql = $this->db->query("UPDATE kwitansi_detail_jasa kdj, kwitansi_detail kd, kwitansi k SET kdj.persen_jasa=(kdj.harga_jasa/k.total) WHERE kdj.kwitansi_detail_id=kd.id AND kd.kwitansi_id=k.id AND k.id=?", array($param['kwitansi_id']));
// 		} elseif($param['status'] == 'PROSES BAYAR') {
// 			$this->db->query("UPDATE kwitansi SET transaction_status='closed' WHERE id=?", array($param['kwitansi_id']));
// 		} else {
// 			$this->db->query("UPDATE kwitansi SET transaction_status='open' WHERE id=?", array($param['kwitansi_id']));
// 		}

// 		//echo $this->db->last_query();
// 		return $sql;
// 	}

//     function DoUpdateKunjunganRawatjalan($param) {
//         $sql = $this->db->query("
//             UPDATE visits
//             SET
//                 `paramedic_id`=NULLIF(?,''),
//                 `continue_id`=NULLIF(?,''),
//                 `dirujuk_ke`=NULLIF(?,'')
//             WHERE id=?
//         ",
//         array(
// 			$param['doctor_id'],
// 			$param['continue_id'],
// 			$param['dirujuk_ke'],
// 			$param['visit_id']
//             )
//         );
//         return $sql;
//     }

//     function DoAddPrescription() {
// 		$post = $_POST;
// 		$param = array();
// 		foreach($post as $key => $val) {
// 			$param[$key] = $val;
// 		}

// 		$this->db->trans_start();
// 		//tambah prescription dulu
// 		if($param['prescription_id'] == '') {
// 			$sql = $this->db->query("INSERT INTO prescriptions(jenis_pasien, visit_id, kwitansi_id,patient_id, name, `date`, jumlah_hari,user_id) VALUES(?, NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NOW(),?,?)", array('RAWAT JALAN', $param['visit_id'],$param['kwitansi_id'],$param['patient_id'],$param['name'],$param['jumlah_hari'], $this->session->userdata('id')));
// 			$prescriptionId = $this->db->insert_id();

// 			//drug_transaction
// 			//obat keluar gudang
// 			$sql = $this->db->query("
// 				INSERT INTO drugs_transaction (prescription_id, jenis, `date`, user_id, bagian_id)
// 				VALUES(?,?,?,?,?)",
// 				array(
// 					$prescriptionId, 'Resep', date('Y-m-d H:i:s'), $this->session->userdata('id'), '02'
// 				)
// 			);
// 			$drug_transaction_id = $this->db->insert_id();
// 		} else {
// 			$prescriptionId = $param['prescription_id'];

// 			//get drug_transaction_id
// 			$sql = $this->db->query("SELECT id FROM drugs_transaction WHERE prescription_id=?", array($prescriptionId));
// 			$resDrugTransactionId = $sql->row_array();
// 			$drug_transaction_id = $resDrugTransactionId['id'];
// 		}
// 		if($prescriptionId) {
// 			for($i=0;$i<sizeof($param['drug_code']);$i++) {
// 				if($param['prescription_detail_id'][$i] != '' && $param['drug_code'][$i] != '') {
// 					//TIDAK DIPERKENANKAN mengupdate sebagian resep yg telah disimpan, KARENA KANGELAN STOCKNYA
// 					//ALTERNATIF : DELETE OBATNYA, INPUT ULANG

// 					//update
// 					$sql = $this->db->query("
// 						UPDATE
// 							prescriptions_detail
// 						SET
// 							harga=?,
// 							markup=?,
// 							sub_total=?,
// 							aturan_1=?,
// 							aturan_2=?
// 						WHERE
// 							id=?
// 					", array(
// 						$param['harga_asli'][$i],
// 						$param['markup'][$i],
// 						$param['sub_total'][$i],
// 						$param['aturan_1'][$i],
// 						$param['aturan_2'][$i],
// 						$param['prescription_detail_id'][$i]
// 					));
// 					/*
// 					));*/
// 				} elseif($param['drug_code'][$i] != '') {
// 					//insert
// 					$sql = false;
// 					$sql = $this->db->query("
// 						INSERT INTO
// 							prescriptions_detail (prescription_id,drug_code,harga,markup,jumlah,sub_total,aturan_1,aturan_2)
// 						VALUES(
// 							?,?,?,?,?,?,NULLIF(?,''),NULLIF(?,'')
// 						)
// 					", array(
// 						$prescriptionId,
// 						$param['drug_code'][$i],
// 						$param['harga_asli'][$i],
// 						$param['markup'],
// 						$param['jumlah'][$i],
// 						$param['sub_total'][$i],
// 						$param['aturan_1'][$i],
// 						$param['aturan_2'][$i]
// 					));
// 					/*
// 					//kurangi stock
// 					if($sql) {
// 						$jumlah = $param['jumlah'][$i];
// 						$this->db->query("UPDATE ref_drugs SET stock=stock-$jumlah WHERE code=?", array($param['drug_code'][$i]));
// 					}
// 					* */
// 					//kurangi stock di drug_transaction
// 					//obat keluar gudang
// 					$sql = $this->db->query("
// 						INSERT INTO
// 							drugs_transaction_detail (`drug_transaction_id`,`prescription_detail_id`,`drug_code`,`jumlah`,`batch_number`,`expired_date`,stock_transaksi)
// 						VALUES(
// 							?,?,?,?,NULLIF(?,''),NULLIF(STR_TO_DATE(?, '%e %b %Y'),''),?
// 						)
// 					", array(
// 						$drug_transaction_id,
// 						$prescriptionDetailId,
// 						$param['drug_code'][$i],
// 						'-'.$param['jumlah'][$i],
// 						$param['batch_number'][$i],
// 						$param['expired_date'][$i],
// 						$param['stock_transaksi'][$i]
// 					));
// 				}
// 				//echo $this->db->last_query();
// 			}
// 		}

// 		$this->db->trans_complete();
// 		return $prescriptionId;
// 	}

//     function DoAddLaboratorium() {
// 		$post = $_POST;
// 		$param = array();
// 		foreach($post as $key => $val) {
// 			$param[$key] = $val;
// 		}

// 		//tambah laboratorium dulu
// 		if($param['laboratorium_id'] == '') {
// 			$sql = $this->db->query("INSERT INTO laboratorium(jenis_pasien, visit_id, kwitansi_id,patient_id, name, `date`, user_id) VALUES(?, NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NOW(),?,?)", array('RAWAT JALAN', $param['visit_id'],$param['kwitansi_id'],$param['patient_id'],$param['name'], $this->session->userdata('id')));
// 			$laboratoriumId = $this->db->insert_id();
// 		} else {
// 			$laboratoriumId = $param['laboratorium_id'];
// 		}
// 		if($laboratoriumId) {
// 			for($i=0;$i<sizeof($param['parameter_uji_id']);$i++) {
// 				if($param['laboratorium_detail_id'][$i] != '' && $param['parameter_uji_id'][$i] != '') {
// 					//TIDAK DIPERKENANKAN mengupdate sebagian resep yg telah disimpan, KARENA KANGELAN STOCKNYA
// 					//ALTERNATIF : DELETE OBATNYA, INPUT ULANG

// 					//update
// 					$sql = $this->db->query("
// 						UPDATE laboratorium_detail
// 						SET harga=?,jumlah=?,sub_total=?
// 						WHERE id=?
// 					", array(
// 						$param['harga'][$i],
// 						$param['jumlah'][$i],
// 						$param['sub_total'][$i],
// 						$param['laboratorium_detail_id'][$i]
// 					));
// 					/*
// 					));*/
// 				} elseif($param['parameter_uji_id'][$i] != '') {
// 					//insert
// 					$sql = false;
// 					$sql = $this->db->query("
// 						INSERT INTO
// 							laboratorium_detail (laboratorium_id,parameter_uji_id,harga,jumlah,sub_total)
// 						VALUES(
// 							?,?,?,?,?
// 						)
// 					", array(
// 						$laboratoriumId,
// 						$param['parameter_uji_id'][$i],
// 						$param['harga'][$i],
// 						$param['jumlah'][$i],
// 						$param['sub_total'][$i]
// 					));
// 				}
// 				//echo $this->db->last_query();
// 			}
// 		}
// 		return $laboratoriumId;
// 	}

// 	function DoAddRujukinternal() {
// 		$param = $_POST;
//         $sql = $this->db->query("
//             INSERT INTO visits (
// 				`parent_id`,
// 				`no_register`,
// 				`clinic_id`,
//                 `paramedic_id`,
//                 `date`,
//                 `patient_id`,
//                 `user_id`,
// 				`payment_type_id`,
// 				`insurance_no`,
// 				`address`,
// 				`district_id`,
// 				`job_id`,
// 				`education_id`,
// 				`admission_type_id`,
//                 `pengirim_id`,
//                 `jenis_kunjungan`,
//                 `penanggungjawab_name`,
//                 `penanggungjawab_address`,
//                 `penanggungjawab_telp`,
//                 `family_relationship_id`,
// 				`kelengkapan_diagnosa`,
// 				`kelengkapan_anamnesa`,
// 				`kelengkapan_nama_dokter`,
// 				`kelengkapan_ttd_dokter`,
// 				`tarif_id`,
// 				`kwitansi_id`
//             ) SELECT
// 				?,
// 				`no_register`,
// 				?,
// 				?,
// 				STR_TO_DATE(?, '%e %b %Y %H:%i:%s'),
//                 `patient_id`,
//                 `user_id`,
// 				`payment_type_id`,
// 				`insurance_no`,
// 				`address`,
// 				`district_id`,
// 				`job_id`,
// 				`education_id`,
// 				`admission_type_id`,
//                 `pengirim_id`,
//                 `jenis_kunjungan`,
//                 `penanggungjawab_name`,
//                 `penanggungjawab_address`,
//                 `penanggungjawab_telp`,
//                 `family_relationship_id`,
// 				`kelengkapan_diagnosa`,
// 				`kelengkapan_anamnesa`,
// 				`kelengkapan_nama_dokter`,
// 				`kelengkapan_ttd_dokter`,
// 				`tarif_id`,
// 				`kwitansi_id`
//             FROM visits
//             WHERE id=?

//         ",
//         array(
// 			$param['visit_id'],
// 			$param['clinic_id'],
// 			$param['doctor_id'],
// 			$param['date'] . ' ' . $param['time'],
// 			$param['visit_id']
//             )
//         );
//         //echo $this->db->last_query();
//         $ret = $this->db->insert_id();
//         /*update jml_kunjungan di ref_clinic*/
//         $this->db->query("UPDATE ref_clinics SET jml_kunjungan=jml_kunjungan+1 WHERE id=?", array($param['clinic_id']));
//         return $sql;
// 	}

// 	function DoDeletePrescriptionDetail() {
// 		//delete & retur dulu
// 		$prescriptionDetailId = $this->input->post('delete_id');
// 		return $this->db->query("DELETE FROM prescriptions_detail WHERE id=?", array($prescriptionDetailId));
// 	}

// 	function DoDeleteLaboratoriumDetail() {
// 		$laboratoriumDetailId = $this->input->post('delete_id');
// 		return $this->db->query("DELETE FROM laboratorium_detail WHERE id=?", array($laboratoriumDetailId));
// 	}

// 	function DoDeleteDataDiagnose() {
// 		return $this->db->query("
// 			DELETE FROM
// 				anamnese_diagnoses
// 			WHERE
// 				id=?", array(
// 			$this->input->post('delete_id')
// 		));
// 	}

// 	function DoDeleteDataIcd9Cm() {
// 		return $this->db->query("
// 			DELETE FROM
// 				visits_icd9cm
// 			WHERE
// 				id=?", array(
// 			$this->input->post('delete_id')
// 		));
// 	}

// 	function DoDeleteDataKunjungan() {
//         $delete_id = implode(",", $this->input->post('delete_id'));
// 		return $this->db->query("
// 			DELETE FROM
// 				visits
// 			WHERE
// 				id IN ($delete_id)"
// 		);
// 		//print_r($delete_id);
// 	}

// /*KwitansiDetail start*/
// 	function GetListKwitansiDetail($kwitansiId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.`id`,
// 				kd.`komponen_biaya_group_id`,
// 				kd.`komponen_biaya_id`,
// 				kd.`group`,
// 				kd.`name`,
// 				kd.`harga`,
// 				SUM(kd.`jumlah`) as jumlah,
// 				SUM(kd.`sub_total`) as sub_total
// 			FROM
// 				kwitansi_detail kd
// 			WHERE
// 				kd.kwitansi_id=?
// 			GROUP BY kd.komponen_biaya_id
// 			ORDER BY kd.ordering, kd.name
// 			",
// 			array($kwitansiId));
// 		//echo $this->db->last_query();
// 		return $sql->result_array();
// 	}

// 	function GetEditKwitansiDetail($kwitansiDetailId) {
// 		//get the current selected data
// 		$sql = $this->db->query("
// 			SELECT
// 				`id`,`komponen_biaya_id`,`group`,`name`, `harga`, `jumlah`, `sub_total`, `doctor_id`
// 			FROM
// 				kwitansi_detail kd
// 			WHERE id=?",
// 			array($kwitansiDetailId));
// 		return $sql->row_array();
// 	}

// 	function DoDeleteKwitansiDetail($id) {
// 		return $this->db->query("
// 			DELETE FROM
// 				kwitansi_detail
// 			WHERE
// 				id=?", array(
// 			$id
// 		));
// 	}

// 	function DoCopyKwitansiDetail($kwitansiDetailId) {
// 		$sql = $this->db->query("
// 			INSERT INTO	kwitansi_detail
// 				(kwitansi_id, visit_id, visit_inpatient_id, visit_inpatient_clinic_id, inpatient_clinic_id, clinic_id, kelas_id, komponen_biaya_group_id, komponen_biaya_item_id, komponen_biaya_id, prescription_id, layanan, `group`, tab, name, harga, jumlah, sub_total, `date`, insert_date, insert_user_id)
// 			SELECT
// 				kwitansi_id, visit_id, visit_inpatient_id, visit_inpatient_clinic_id, inpatient_clinic_id, clinic_id, kelas_id, komponen_biaya_group_id, komponen_biaya_item_id, komponen_biaya_id, prescription_id, layanan, `group`, tab, name, harga, jumlah, sub_total, `date`, insert_date, insert_user_id
// 			FROM kwitansi_detail
// 			WHERE
// 				id=?", array(
// 			$kwitansiDetailId
// 		));
// 		$lastId = $this->db->insert_id();
// 		if($sql) {
// 			$sql = $this->db->query("
// 				INSERT INTO kwitansi_detail_jasa
// 					(kwitansi_detail_id, komponen_biaya_subject_id, komponen_biaya_jasa_id, doctor_id, clinic_id, inpatient_clinic_id, code, komponen_biaya_subject_name, label, harga_jasa)
// 				SELECT
// 					?, komponen_biaya_subject_id, komponen_biaya_jasa_id, doctor_id, clinic_id, inpatient_clinic_id, code, komponen_biaya_subject_name, label, harga_jasa
// 				FROM kwitansi_detail_jasa
// 				WHERE kwitansi_detail_id=?
// 			", array($lastId, $kwitansiDetailId));
// 		}
// 		return $sql;
// 	}

// /*KwitansiDetail end*/
// /*KwitansiDetailTab start*/
// /*Tindakandokter start*/
//     function GetTindakandokterGrid($param, $start, $offset) {
// 		$where = '';
// 		$where .= ($this->input->post('komponen_biaya_group_id') != '')?" AND rkbg.`id`='".$this->input->post('komponen_biaya_group_id')."'":"";
// 		$where .= ($this->input->post('tab') != '')?" AND rkbg.`tab` = '".$this->input->post('tab')."'":"";
// 		$where .= ($this->input->post('kelas_id') != '')?" AND rkb.`kelas_id` = '".$this->input->post('kelas_id')."'":"";
// 		$where .= ($this->input->post('clinic_id') != '')?" AND rkbg.`clinic_id` = '".$this->input->post('clinic_id')."'":"";
// 		$where .= ($this->input->post('tarif_id') != '')?" AND (rkb.`tarif_id` = '".$this->input->post('tarif_id')."' OR rkb.tarif_id IS NULL)":"";
//         $sql = $this->db->query("
//             SELECT SQL_CALC_FOUND_ROWS
// 				rkb.id,
// 				rkbg.name as `group`,
// 				rkbi.name,
// 				rk.name as kelas,
// 				rkb.harga,
// 				rt.name as tarif
// 			FROM ref_komponen_biaya rkb
// 				JOIN ref_komponen_biaya_item rkbi ON (rkbi.id = rkb.komponen_biaya_item_id)
// 				JOIN ref_komponen_biaya_group rkbg ON (rkbg.id = rkbi.komponen_biaya_group_id)
// 				LEFT JOIN ref_kelas rk ON (rk.id=rkb.kelas_id)
// 				LEFT JOIN ref_tarif rt ON (rt.id=rkb.tarif_id)
// 			WHERE
// 				rt.active='1'
// 				$where
// 				AND rkbi.name LIKE ? LIMIT $start, $offset"
//         , array(
// 			'%'.$this->input->post('q').'%'
// 			));
//         return $sql->result_array();
//     }

//     function GetTindakandokterGridCount() {
//         $query = $this->db->query("SELECT FOUND_ROWS() as total");
//         if($query->num_rows() > 0) {
//             $data = $query->row_array();
//             return $data['total'];
//         } else {
//             return false;
//         }
//     }

// 	function GetListTindakandokter($visitId) {
// 		//get the current selected data
// 		$tab = 'TindakanDokterRawatjalan';
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.`id`,
// 				kd.`komponen_biaya_id`,
// 				kd.`group`,
// 				kd.`name`,
// 				kd.`harga`,
// 				kd.`jumlah`,
// 				kd.`sub_total`,
// 				rk.name as kelas_name,
// 				DATE_FORMAT(kd.`date`, '%e %b %Y %H:%i') as `date_formatted`,
// 				DATE_FORMAT(kd.`insert_date`, '%e %b %Y %H:%i') as `insert_date_formatted`,
// 				DATE_FORMAT(kd.`update_date`, '%e %b %Y %H:%i') as `update_date_formatted`,
// 				u.name as insert_user,
// 				u2.name as update_user
// 			FROM
// 				kwitansi_detail kd
// 				JOIN users u ON (u.id = kd.insert_user_id)
// 				LEFT JOIN users u2 ON (u2.id = kd.update_user_id)
// 				LEFT JOIN ref_kelas rk ON(rk.id = kd.kelas_id)
// 			WHERE kd.visit_id=? AND kd.tab=?
// 			ORDER BY kd.`date` DESC, kd.id DESC",
// 			array($visitId, $tab));
// 		//echo $this->db->last_query();
// 		return $sql->result_array();
// 	}
// /*Tindakandokter end*/

// /*Tindakanperawat start*/

//     function GetTindakanperawatGrid($param, $start, $offset) {
// 		$where = '';
// 		$where .= ($this->input->post('komponen_biaya_group_id') != '')?" AND rkbg.`id`='".$this->input->post('komponen_biaya_group_id')."'":"";
// 		$where .= ($this->input->post('tab') != '')?" AND rkbg.`tab` = '".$this->input->post('tab')."'":"";
// 		$where .= ($this->input->post('kelas_id') != '')?" AND rkb.`kelas_id` LIKE '%".$this->input->post('kelas_id')."%'":"";
// 		$where .= ($this->input->post('tarif_id') != '')?" AND (rkb.`tarif_id` LIKE '%".$this->input->post('tarif_id')."%' OR rkb.tarif_id IS NULL)":"";
//         $sql = $this->db->query("
//             SELECT SQL_CALC_FOUND_ROWS
// 				rkb.id,
// 				rkbg.name as `group`,
// 				rkbi.name,
// 				rk.name as kelas,
// 				rkb.harga,
// 				rt.name as tarif
// 			FROM ref_komponen_biaya rkb
// 				JOIN ref_komponen_biaya_item rkbi ON (rkbi.id = rkb.komponen_biaya_item_id)
// 				JOIN ref_komponen_biaya_group rkbg ON (rkbg.id = rkbi.komponen_biaya_group_id)
// 				LEFT JOIN ref_kelas rk ON (rk.id=rkb.kelas_id)
// 				LEFT JOIN ref_tarif rt ON (rt.id=rkb.tarif_id)
// 			WHERE
// 				rt.active='1'
// 				AND (rkbg.`layanan`='RAWAT JALAN' OR rkbg.`layanan` IS NULL)
// 				$where
// 				AND rkbi.name LIKE ? LIMIT $start, $offset"
//         , array(
// 			'%'.$this->input->post('q').'%'
// 			));
//         return $sql->result_array();
//     }

//     function GetTindakanperawatGridCount() {
//         $query = $this->db->query("SELECT FOUND_ROWS() as total");
//         if($query->num_rows() > 0) {
//             $data = $query->row_array();
//             return $data['total'];
//         } else {
//             return false;
//         }
//     }

// 	function GetListTindakanperawat($visitInpatientId) {
// 		//get the current selected data
// 		$tab = 'Tindakanperawat';
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.`id`,
// 				kd.`komponen_biaya_id`,
// 				kd.`group`,
// 				kd.`name`,
// 				kd.`harga`,
// 				kd.`jumlah`,
// 				kd.`sub_total`,
// 				rk.name as kelas_name,
// 				DATE_FORMAT(kd.`date`, '%e %b %Y %H:%i') as `date_formatted`,
// 				DATE_FORMAT(kd.`insert_date`, '%e %b %Y %H:%i') as `insert_date_formatted`,
// 				DATE_FORMAT(kd.`update_date`, '%e %b %Y %H:%i') as `update_date_formatted`,
// 				CONCAT(ric.name, ' ', rk.name) as inpatient_clinic,
// 				u.name as insert_user,
// 				u2.name as update_user
// 			FROM
// 				kwitansi_detail kd
// 				LEFT JOIN ref_inpatient_clinics ric ON (ric.id = kd.inpatient_clinic_id)
// 				LEFT JOIN ref_kelas rk ON(rk.id = ric.kelas_id)
// 				JOIN users u ON (u.id = kd.insert_user_id)
// 				LEFT JOIN users u2 ON (u2.id = kd.update_user_id)
// 			WHERE kd.visit_inpatient_id=? AND kd.tab=?
// 			ORDER BY kd.`date` DESC, kd.id DESC",
// 			array($visitInpatientId, $tab));
// 		//echo $this->db->last_query();
// 		return $sql->result_array();
// 	}
// /*Tindakanperawat end*/

// /*Lainlain start*/

//     function GetLainlainGrid($param, $start, $offset) {
// 		$where = '';
// 		$where .= ($this->input->post('komponen_biaya_group_id') != '')?" AND rkbg.`id`='".$this->input->post('komponen_biaya_group_id')."'":"";
// 		$where .= ($this->input->post('tab') != '')?" AND rkbg.`tab` = '".$this->input->post('tab')."'":"";
// 		$where .= ($this->input->post('kelas_id') != '')?" AND rkb.`kelas_id` LIKE '%".$this->input->post('kelas_id')."%'":"";
// 		$where .= ($this->input->post('tarif_id') != '')?" AND (rkb.`tarif_id` LIKE '%".$this->input->post('tarif_id')."%' OR rkb.tarif_id IS NULL)":"";
//         $sql = $this->db->query("
//             SELECT SQL_CALC_FOUND_ROWS
// 				rkb.id,
// 				rkbg.name as `group`,
// 				rkbi.name,
// 				rk.name as kelas,
// 				rkb.harga,
// 				rt.name as tarif
// 			FROM ref_komponen_biaya rkb
// 				JOIN ref_komponen_biaya_item rkbi ON (rkbi.id = rkb.komponen_biaya_item_id)
// 				JOIN ref_komponen_biaya_group rkbg ON (rkbg.id = rkbi.komponen_biaya_group_id)
// 				LEFT JOIN ref_kelas rk ON (rk.id=rkb.kelas_id)
// 				LEFT JOIN ref_tarif rt ON (rt.id=rkb.tarif_id)
// 			WHERE
// 				rt.active='1'
// 				$where
// 				AND rkbi.name LIKE ? LIMIT $start, $offset"
//         , array(
// 			'%'.$this->input->post('q').'%'
// 			));
//         return $sql->result_array();
//     }

//     function GetLainlainGridCount() {
//         $query = $this->db->query("SELECT FOUND_ROWS() as total");
//         if($query->num_rows() > 0) {
//             $data = $query->row_array();
//             return $data['total'];
//         } else {
//             return false;
//         }
//     }

// 	function GetListLainlain($visitId) {
// 		//get the current selected data
// 		$tab = 'Lainlain';
// 		$sql = $this->db->query("
// 			SELECT
// 				kd.`id`,
// 				kd.`komponen_biaya_id`,
// 				kd.`group`,
// 				kd.`name`,
// 				kd.`harga`,
// 				kd.`jumlah`,
// 				kd.`sub_total`,
// 				rk.name as kelas_name,
// 				DATE_FORMAT(kd.`date`, '%e %b %Y %H:%i') as `date_formatted`,
// 				DATE_FORMAT(kd.`insert_date`, '%e %b %Y %H:%i') as `insert_date_formatted`,
// 				DATE_FORMAT(kd.`update_date`, '%e %b %Y %H:%i') as `update_date_formatted`,
// 				u.name as insert_user,
// 				u2.name as update_user
// 			FROM
// 				kwitansi_detail kd
// 				JOIN users u ON (u.id = kd.insert_user_id)
// 				LEFT JOIN users u2 ON (u2.id = kd.update_user_id)
// 				LEFT JOIN ref_kelas rk ON(rk.id = kd.kelas_id)
// 			WHERE kd.visit_id=? AND kd.tab=?
// 			ORDER BY kd.`date` DESC, kd.id DESC",
// 			array($visitId, $tab));
// 		//echo $this->db->last_query();
// 		return $sql->result_array();
// 	}
// /*Lainlain end*/

//     function GetComboGroupKomponenbiaya($tab) {
//         $sql = $this->db->query("SELECT id, name FROM ref_komponen_biaya_group WHERE tab=? ORDER BY ordering", array($tab));
//         //echo $this->db->last_query();
//         return $sql->result_array();
//     }

//     function GetComboGroupKomponenbiayaByClinicId($clinicId) {
//         $sql = $this->db->query("SELECT id, name FROM ref_komponen_biaya_group WHERE clinic_id=? ORDER BY ordering", array($clinicId));
//         //echo $this->db->last_query();
//         return $sql->result_array();
//     }

// 	function GetKomponenBiayaById($id) {
// 		$sql = $this->db->query("
// 		SELECT
// 			rkb.id as komponen_biaya_id,
// 			rkbi.id as komponen_biaya_item_id,
// 			rkbg.id as komponen_biaya_group_id,
// 			rkbj.id as komponen_biaya_jasa_id,
// 			rkbs.id as komponen_biaya_subject_id,
// 			rkb.tarif_id,
// 			rkb.kelas_id,
// 			rkbg.layanan,
// 			rkbg.name as `group`,
// 			rkbg.tab,
// 			rkbi.name,
// 			rkb.harga,
// 			rkbs.name as komponen_biaya_subject_name,
// 			rkbj.label as label,
// 			rkbj.harga_jasa as harga_jasa
// 		FROM
// 			ref_komponen_biaya rkb
// 			JOIN ref_komponen_biaya_item rkbi ON (rkbi.id = rkb.komponen_biaya_item_id)
// 			JOIN ref_komponen_biaya_group rkbg ON (rkbg.id = rkbi.komponen_biaya_group_id)
// 			LEFT JOIN ref_komponen_biaya_jasa rkbj ON (rkbj.komponen_biaya_id = rkb.id)
// 			LEFT JOIN ref_komponen_biaya_subject rkbs ON (rkbs.id = rkbj.komponen_biaya_subject_id)
// 		WHERE rkb.id=?", array($id));
// 		return $sql->result_array();
// 	}

// 	function GetKwitansiDetailById($id) {
// 		$sql = $this->db->query("
// 		SELECT
// 			kdj.id as kwitansi_detail_jasa_id,
// 			kd.id as kwitansi_detail_id,
// 			kd.visit_id,
// 			kd.visit_inpatient_id,
// 			kd.visit_inpatient_clinic_id,
// 			kd.kwitansi_id,
// 			kd.kelas_id,
// 			kd.komponen_biaya_id,
// 			kd.komponen_biaya_item_id,
// 			kd.komponen_biaya_group_id,
// 			kdj.komponen_biaya_jasa_id,
// 			kdj.komponen_biaya_subject_id,
// 			kd.layanan,
// 			kd.`group`,
// 			kd.tab,
// 			kd.name,
// 			kd.harga,
// 			kd.jumlah,
// 			kd.sub_total,
// 			DATE_FORMAT(kd.`date`, '%e %b %Y') as `date`,
// 			DATE_FORMAT(kd.`date`, '%H:%i') as `time`,
// 			kdj.doctor_id,
// 			kdj.clinic_id,
// 			kdj.inpatient_clinic_id,
// 			kdj.komponen_biaya_subject_name,
// 			kdj.label,
// 			kdj.harga_jasa,
// 			rc.name as clinic_name
// 		FROM
// 			kwitansi_detail kd
// 			JOIN kwitansi_detail_jasa kdj ON (kdj.kwitansi_detail_id = kd.id)
// 			LEFT JOIN ref_clinics rc ON (rc.id = kd.clinic_id)
// 		WHERE kd.id=?", array($id));
// //echo $this->db->last_query();
// 		return $sql->result_array();
// 	}

//     function DoAddKwitansiDetail() {
// 		$param = $_POST;
// 		$total = 0;
// 		$param['harga'] = str_replace(",","", $param['harga']);
// 		//echo "insert";
// 		//insert

// 		if($param['kwitansi_detail_id'] != '' && $param['komponen_biaya_id']!='') {
// 			//update
// 			$sql = $this->db->query("
// 				UPDATE
// 					kwitansi_detail
// 				SET
// 					harga=IFNULL(?,0),
// 					sub_total=IFNULL(?,0),
// 					`date`=?,
// 					update_date=?,
// 					update_user_id=?
// 				WHERE
// 					id=?
// 			", array(
// 				$param['harga'],
// 				$param['harga'],
// 				date('Y-m-d H:i', strtotime($param['date'] . ' ' . $param['time'])),
// 				date('Y-m-d H:i:s'),
// 				$this->session->userdata('id'),
// 				$param['kwitansi_detail_id']
// 			));
// 			$kwitansiDetailId = $param['kwitansi_detail_id'];
// 			$harga = 0;
// 			for($i=0;$i<sizeof($param['komponen_biaya_jasa_id']);$i++) {
// 				$param['harga_jasa'][$i] = str_replace(",","", $param['harga_jasa'][$i]);
// 				$this->db->query("
// 					UPDATE kwitansi_detail_jasa
// 					SET doctor_id=NULLIF(?,''),clinic_id=NULLIF(?,''),inpatient_clinic_id=NULLIF(?,''),harga_jasa=?
// 					WHERE id=?", array(
// 					$param['doctor_id'][$i],
// 					$param['clinic_id'],
// 					$param['inpatient_clinic_id'],
// 					$param['harga_jasa'][$i],
// 					$param['kwitansi_detail_jasa_id'][$i]
// 				));
// 				$harga += $param['harga_jasa'][$i];
// 			}
// 			//update harga dan subtotal jikalau jasa dokter dirubah/dinolkan
// 			$this->db->query("UPDATE kwitansi_detail SET harga=?, sub_total=? WHERE id=?", array($harga,$harga,$kwitansiDetailId));
// 		} else {
// 			//insert
// 			$sql = $this->db->query("
// 				INSERT INTO
// 					kwitansi_detail (
// 						kwitansi_id,
// 						visit_id,
// 						clinic_id,
// 						kelas_id,
// 						komponen_biaya_group_id,
// 						komponen_biaya_item_id,
// 						komponen_biaya_id,
// 						layanan,
// 						`group`,
// 						tab,
// 						name,
// 						harga,
// 						jumlah,
// 						sub_total,
// 						`date`,
// 						insert_date,
// 						insert_user_id
// 						)
// 				VALUES(
// 					?,?,?,?,?,?,?,NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),NULLIF(?,''),?,?,?,?,?
// 				)
// 			", array(
// 				$param['kwitansi_id'],
// 				$param['visit_id'],
// 				$param['clinic_id'],
// 				$param['kelas_id'],
// 				$param['komponen_biaya_group_id'],
// 				$param['komponen_biaya_item_id'],
// 				$param['komponen_biaya_id'],
// 				$param['layanan'],
// 				$param['group'],
// 				$param['tab'],
// 				$param['name'],
// 				$param['harga'],
// 				1,
// 				$param['harga'],
// 				date('Y-m-d H:i', strtotime($param['date'] . ' ' . $param['time'])),
// 				date('Y-m-d H:i:s'),
// 				$this->session->userdata('id')
// 			));
// 			//echo $this->db->last_query();
// 			$kwitansiDetailId = $this->db->insert_id();
// 			$harga = 0;
// 			for($i=0;$i<sizeof($param['komponen_biaya_jasa_id']);$i++) {
// 				$param['harga_jasa'][$i] = str_replace(",","", $param['harga_jasa'][$i]);
// 				$this->db->query("
// 					INSERT INTO kwitansi_detail_jasa(kwitansi_detail_id,komponen_biaya_subject_id,komponen_biaya_jasa_id,doctor_id,clinic_id,komponen_biaya_subject_name,label,harga_jasa) VALUES(?,?,?,NULLIF(?,''),NULLIF(?,''),?,?,?)", array(
// 					$kwitansiDetailId,
// 					$param['komponen_biaya_subject_id'][$i],
// 					$param['komponen_biaya_jasa_id'][$i],
// 					$param['doctor_id'][$i],
// 					$param['clinic_id'],
// 					$param['komponen_biaya_subject_name'][$i],
// 					$param['label'][$i],
// 					$param['harga_jasa'][$i]
// 				));
// 				$harga += $param['harga_jasa'][$i];
// 			}
// 			//update harga dan subtotal jikalau jasa dokter dirubah/dinolkan
// 			$this->db->query("
// 			UPDATE
// 				kwitansi_detail kd,
// 				ref_komponen_biaya_group rkbg
// 			SET
// 				kd.ordering=rkbg.ordering,
// 				kd.harga=?,
// 				kd.sub_total=?
// 			WHERE
// 				kd.komponen_biaya_group_id=rkbg.id
// 				AND kd.id=?", array($harga,$harga,$kwitansiDetailId));
// 			//$this->db->query("UPDATE kwitansi_detail SET harga=?, sub_total=? WHERE id=?", array($harga,$harga,$kwitansiDetailId));
// 		}
// 		//echo $this->db->last_query();

// 		//bill total
// 		$ret = $this->db->query("UPDATE kwitansi SET total=(SELECT SUM(sub_total) FROM kwitansi_detail WHERE kwitansi_id=?) WHERE id=?", array($param['kwitansi_id'], $param['kwitansi_id']));
// 		return $sql;
// 	}
// /*KwitansiDetailTab end*/

// 	function DoUpdatePaymentType() {
// 		$temp = array();
// 		$temp['payment_type_id'] = $this->input->post('payment_type_id');

// 		//visits
// 		$this->db->where('no_register', $this->input->post('no_register'));
// 		$this->db->update('visits', $temp);

// 		//visits_inpatient
// 		$this->db->where('no_register', $this->input->post('no_register'));
// 		$this->db->update('visits_inpatient', $temp);

// 		//kwitansi
// 		$this->db->where('id', $this->input->post('kwitansi_id'));
// 		$a = $this->db->update('kwitansi', $temp);
// 		return $a;
// 	}
// }
