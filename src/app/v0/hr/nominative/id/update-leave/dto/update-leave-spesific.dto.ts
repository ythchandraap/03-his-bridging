import { HttpException, HttpStatus } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { decipher } from 'utility/encryption';

export const UpdateLeaveSpesific = async (
  headers: any,
  id: string,
  detail: string,
  connection: any,
) => {
  try {
    const decryptorSimjapel = decipher(process.env.SALT_SIMJAPEL);

    if (headers.payload != 'post') {
      throw new HttpException(
        "Your transaction can't processed",
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const decrypted = decryptorSimjapel(id);
    const decryptedDetail = decryptorSimjapel(detail);

    const [[checkDataExist]]: any = await connection.query(
      `
        SELECT
          *
        FROM
        ${process.env.DATABASE_SIMJAPEL}.hr_monthly_report_detail hmrd
          JOIN ${process.env.DATABASE_SIMJAPEL}.hr_monthly_report hmr ON hmrd.hr_monthly_report_id = hmr.hr_monthly_report_id
        WHERE
          hmrd.hr_monthly_report_id = ?
            AND hmrd.core_profile_id = ?
      `,
      [decrypted, decryptedDetail],
    );

    if (!checkDataExist?.hr_monthly_report_id) {
      throw new HttpException(
        'Your target data not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const firstDay = dayjs(`${checkDataExist.year}-${checkDataExist.month}-01`);
    const daysInMonth = firstDay.daysInMonth();

    const [updatedLeaveData]: any = await connection.query(
      `
          UPDATE ${process.env.DATABASE_SIMJAPEL}.hr_monthly_report_detail hmrd
          JOIN (
              SELECT
                  hml.*,
                  cp.name,
                  count(hmld.hr_monthly_leave_detail_id) as total_leave
              FROM
                  ${process.env.DATABASE_SIMJAPEL}.hr_monthly_leave_detail hmld
              JOIN ${process.env.DATABASE_SIMJAPEL}.hr_monthly_leave hml ON hml.hr_monthly_leave_id = hmld.hr_monthly_leave_id
              JOIN ${process.env.DATABASE_SIMJAPEL}.core_profile cp ON hml.core_profile_id = cp.core_profile_id
              WHERE
                  DATE(hmld.leave_date) BETWEEN ?
                  AND ?
              GROUP BY hml.core_profile_id
          ) SOURCE ON SOURCE.core_profile_id = hmrd.core_profile_id
          SET hmrd.leave_count = SOURCE.total_leave
          WHERE hmrd.hr_monthly_report_id = ?
            AND SOURCE.core_profile_id = ?
        `,
      [
        firstDay.format('YYYY-MM-DD'),
        firstDay.format(`YYYY-MM-${daysInMonth}`),
        decrypted,
        decryptedDetail,
      ],
    );

    const dataUpdated = updatedLeaveData?.affectedRows ?? 0;

    if (dataUpdated == 0) {
      throw new HttpException('No data updated', HttpStatus.OK);
    }

    return {
      statusCode: 200,
      message: 'Horay your data updated, ' + dataUpdated + ' data updated.',
    };
  } catch (error) {
    console.log(error);
    throw new HttpException(
      'Error in server',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
