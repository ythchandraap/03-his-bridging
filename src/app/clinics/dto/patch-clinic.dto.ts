import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
import { decipher } from 'utility/encryption';

export const PatchClinic = async (headers: any, id: any, connection: any) => {
  const decrypt = decipher(process.env.SALT);

  if (!headers || !headers.payload) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const originalText = JSON.stringify({
    c_code: '03',
    name: 'Anak Sore',
    type: 'Rawat Jalan',
    bpjs_code: 'ANA',
  });

  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { c_code, name, type, bpjs_code } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );

  if (!name || !c_code || !type) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const decryptedMedicalFacility: number =
    parseInt(decrypt(String(c_code))) ?? 0;
  const decryptedUnit: number = parseInt(decrypt(String(id))) ?? 0;

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

  const [getData]: any = await connection.query(
    `
      SELECT
     	  *
      FROM
        ${process.env.DATABASE_CORE}.company_units cu
        LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = cu.company_profile_id
        WHERE cp.company_profile_id = ? and cu.company_unit_id = ?
      `,
    [decryptedMedicalFacility, decryptedUnit],
  );

  if (getData.length < 1) {
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
        decryptor(headers.payload, process.env.SALT_TRIPLE) + ' ' + id,
        'api/apps-internal/clinics/' + id,
        'PATCH',
        'Data not exist',
      ],
    );
    throw new HttpException('Data not exist', HttpStatus.NOT_FOUND);
  }

  try {
    await connection.query(`START TRANSACTION`);
    const [patchData] = await connection.query(
      `
        UPDATE ${process.env.DATABASE_CORE}.company_units
        SET company_unit_name = ?,
          company_unit_type = ?,
          bpjs_code = ?
        WHERE company_unit_id = ?
          AND company_profile_id = ?
      `,
      [name, type, bpjs_code ?? null, decryptedUnit, decryptedMedicalFacility],
    );
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
        decryptor(headers.payload, process.env.SALT_TRIPLE) + ' ' + id,
        'api/apps-internal/clinics/' + id,
        'PATCH',
        'Data patched',
      ],
    );

    await connection.query(`COMMIT`);
    return {
      message: 'here we go, data has been update ',
    };
  } catch (err) {
    console.error(err);
    await connection.query(`ROLLBACK`);
    throw new HttpException(
      'Error when try insert data',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
