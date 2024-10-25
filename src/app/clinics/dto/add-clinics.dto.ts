import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const AddClinic = async (headers: any, connection: any) => {
  const encrypt = cipher(process.env.SALT);
  const decrypt = decipher(process.env.SALT);

  if (!headers?.payload) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const originalText = JSON.stringify({
    c_code: '03',
    name: 'Bedah Mulut',
    type: 'Rawat Jalan',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { name, c_code, type, bpjs_code } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );
  if (!name || !c_code || !type) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;

  const [checkExistingData] = await connection.query(
    `
      SELECT
        *
      FROM
        ${process.env.DATABASE_CORE}.company_units cu
        LEFT JOIN ${process.env.DATABASE_CORE}.company_profile cp ON cp.company_profile_id = cu.company_profile_id
      WHERE
        cp.company_profile_id = ?
        AND cu.company_unit_name = ?
        AND cu.company_unit_type = ?
    `,
    [decryptedMedicalFacility, name, type],
  );

  if (checkExistingData.length > 0) {
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
        decryptor(headers.payload, process.env.SALT_TRIPLE),
        'api/apps-internal/clinics',
        'POST',
        'Data exist',
      ],
    );
    throw new HttpException('Data exist in database', HttpStatus.CONFLICT);
  }
  try {
    await connection.query(`START TRANSACTION`);
    const [insertData] = await connection.query(
      `
        INSERT INTO ${process.env.DATABASE_CORE}.company_units(
          company_unit_name,
          company_unit_type,
          company_profile_id,
          bpjs_code
        )
        VALUES(
          ?,
          ?,
          ?,
          ?
        )
      `,
      [name, type, decryptedMedicalFacility, bpjs_code ?? null],
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
        decryptor(headers.payload, process.env.SALT_TRIPLE),
        'api/apps-internal/clinics',
        'POST',
        'Data inserted',
      ],
    );

    await connection.query(`COMMIT`);
    return {
      message: 'Data inserted',
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
