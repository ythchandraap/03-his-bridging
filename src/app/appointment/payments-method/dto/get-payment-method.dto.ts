import { HttpException, HttpStatus } from '@nestjs/common';
import { decryptor, encryptor } from 'utility/aes';
import { cipher, decipher } from 'utility/encryption';

export const GetPaymentsMethodDto = async (headers: any, connection: any) => {
  const encrypt = cipher(process.env.SALT);
  const decrypt = decipher(process.env.SALT);

  if (!headers?.payload) {
    throw new HttpException(
      "Your transaction can't processed",
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  const originalText = JSON.stringify({
    s: 'lang',
    sz: 10,
    nm: 1,
    c_code: '03',
  });
  const encryptedText = encryptor(originalText, process.env.SALT_TRIPLE);
  console.log(`Encrypted Text: ${encryptedText}`);

  const { s, sz, nm, c_code, act } = JSON.parse(
    decryptor(headers.payload, process.env.SALT_TRIPLE),
  );
  const decryptedMedicalFacility: number = parseInt(decrypt(c_code)) ?? 0;
  const paymentMethodName = s ?? '';
  const pageSize = sz ?? 10;
  const pageNumber = nm ?? 1;

  let pagePosition: number;

  let where =
    'WHERE rpm.company_profile_id = ' + decryptedMedicalFacility + ' ';
  let where_all =
    'WHERE rpm.company_profile_id = ' + decryptedMedicalFacility + ' ';

  if (paymentMethodName && typeof paymentMethodName == 'string') {
    where =
      where + ` AND rpm.ref_payment_method_name like '%${paymentMethodName}%'`;
    where_all =
      where_all +
      ` AND rpm.ref_payment_method_name like '%${paymentMethodName}%'`;
  }

  if (!act || act != 'all') {
    where = where + ` AND rpm.is_active = 1`;
    where_all = where_all + ` AND rpm.is_active = 1`;
  }

  if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
    where = where + ' order by rpm.ref_payment_method_name ASC';
  } else {
    where =
      where + ` order by rpm.ref_payment_method_name ASC limit ${pageSize}`;
  }
  const getAllData = await connection.query(
    `
      SELECT
        count(rpm.ref_payment_method_id) as totalData
      FROM ${process.env.DATABASE_CORE}.ref_payment_method rpm
      ${where_all}
      `,
  );

  const getData = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.ref_payment_method rpm
      ${where}
      `,
  );
  const encryptedId = getData?.[0]?.map(
    (item: { ref_payment_method_id: string }) => {
      const { ref_payment_method_id, ...rest } = item;
      return { ref_payment_method_id: encrypt(ref_payment_method_id), ...rest };
    },
  );

  // eslint-disable-next-line prefer-const
  pagePosition = parseInt(getAllData?.[0]?.[0]?.totalData) / pageSize;

  return {
    message: 'Horayyy, you can access app now',
    data: encryptedId ?? [],
    summary: {
      all_data_count: parseInt(getAllData?.[0]?.[0]?.totalData) ?? 0,
      data_count: encryptedId.length ?? 0,
      page_total: Math.ceil(pagePosition),
      page_size: pageSize,
      page_number: pageNumber,
      can_next: pageNumber < Math.ceil(pagePosition),
      can_previous: pageNumber !== 1,
    },
  };
};
