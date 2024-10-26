import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import CheckCompanyProfile from 'utility/check-company-profile';
import { cipher, decipher } from 'utility/encryption';

export const GetClinic = async (headers: any, id: any, connection: any) => {
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

  const [getData] = await connection.query(
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
      'POST',
      'Data served',
    ],
  );

  if (getData.length < 1) {
    throw new HttpException('Data not exist', HttpStatus.NOT_FOUND);
  }

  const encryptedId = getData?.map(
    (item: { company_unit_id: string; company_profile_id: string }) => {
      const { company_unit_id, company_profile_id, ...rest } = item;

      return {
        company_unit_id: encrypt(String(company_unit_id)),
        company_profile_id: encrypt(String(company_profile_id)),
        ...rest,
      };
    },
  );

  return {
    message: 'here we go, what data you need',
    data: encryptedId ?? [],
  };
};
