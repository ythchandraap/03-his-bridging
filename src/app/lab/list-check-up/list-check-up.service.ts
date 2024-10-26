import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';

@Injectable()
export class ListCheckUpService {
  constructor(
    @InjectClient() private readonly connection: Pool,
    @Inject('PG_CONNECTION')
    private readonly connectionPg: any,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async getListData(param: any, headers: any, request: any) {
    if (!headers.sp || !headers.np) {
      throw new HttpException(
        'Something not included',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const patient_name = request?.query?.s ?? '';
    const pageSize = request?.query?.sz ?? 10;
    const pageNumber = request?.query?.nm ?? 1;

    let pagePosition: number;

    let where = 'WHERE TRUE';
    let where_all = 'WHERE TRUE';

    if (patient_name && typeof patient_name == 'string') {
      where += ` AND nama ilike '%${patient_name}%'`;
      where_all += ` AND nama ilike '%${patient_name}%'`;
    }

    if (pageSize && typeof pageSize == 'number' && pageSize == 0) {
      where += ' order by no_lab DESC';
    } else {
      where += ` order by no_lab DESC limit ${pageSize}`;
    }

    // if (patient_mr && typeof patient_mr == 'number') {
    //   patient_mr ? where + ` AND nama ilike '%${patient_name}%'` : '';
    // }
    // if (sender_clinic && typeof sender_clinic == 'string') {
    //   sender_clinic ? where + ` AND nama ilike '%${sender_clinic}%'` : '';
    // }
    // if (date && typeof date == 'string') {
    //   date ? where + ` AND nama ilike '%${date}%'` : '';
    // }

    const getAllData = await this.connectionPg.query(
      `
      SELECT
        count(id) as totalData
      FROM tab_lab_master
      ${where_all}
      `,
    );

    const getData = await this.connectionPg.query(
      `
      SELECT
        *
      FROM tab_lab_master
      ${where}
      `,
    );

    // eslint-disable-next-line prefer-const
    pagePosition = parseInt(getAllData?.rows?.[0]?.totaldata ?? 0) / pageSize;

    return {
      message: 'Horayyy, you can access app now',
      data: getData?.rows ?? [],
      summary: {
        all_data_count: parseInt(getAllData?.rows?.[0]?.totaldata) ?? 0,
        data_count: getData?.rows?.length,
        page_total: Math.ceil(pagePosition),
        page_size: pageSize,
        page_number: pageNumber,
        can_next: pageNumber < Math.ceil(pagePosition),
        can_previous: pageNumber !== 1,
      },
    };
  }
}
