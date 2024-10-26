import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
import { decipher } from 'utility/encryption';

export const SwitcherEducation = async (
  headers: any,
  id: any,
  connection: any,
) => {
  const decrypt = decipher(process.env.SALT);

  if (!headers?.payload) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const originalText = JSON.stringify({
    c_code: '03',
  });

  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { c_code } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );
  if (!c_code) {
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
        'DELETE',
        'Data not exist',
      ],
    );
    throw new HttpException('Data not exist', HttpStatus.NOT_FOUND);
  }

  try {
    await connection.query(`START TRANSACTION`);
    await connection.query(
      `
        UPDATE ${process.env.DATABASE_CORE}.company_units
        SET is_active = ?
        WHERE company_unit_id = ?
          AND company_profile_id = ?
      `,
      [!getData?.[0]?.is_active, decryptedUnit, decryptedMedicalFacility],
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
        decryptor(headers.payload, process.env.SALT_TRIPLE) +
          ' ' +
          id +
          ' || status to :' +
          !getData?.[0]?.is_active,
        'api/apps-internal/clinics/' + id,
        'DELETE',
        'Data switched',
      ],
    );

    await connection.query(`COMMIT`);
    return {
      message:
        'here we go, status data has been switch to : ' +
        !getData?.[0]?.is_active,
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
