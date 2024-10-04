// import { NextResponse } from 'next/server';
// import CheckSession from 'app/_source/rest-api/_utility/check-session';
// import { headers } from 'next/headers';
// import ConnectDatabase from 'app/_source/front-end/_utility/config/access/database';
// import { cipher, decipher } from '@hook/encryption';

// export async function GET() {
//     const response: any = NextResponse;
//     const headersList: any = headers();
//     const pageSize: number = parseInt(headersList.get('page-size')) || null!;
//     const pageNumber: number =
//         parseInt(headersList.get('page-number')) || null!;
//     const startDate: string = headersList.get('start-date') || null!;
//     const endDate: string = headersList.get('end-date') || null!;
//     const pageTotal: number = (pageNumber - 1) * pageSize;
//     let pagePosition: number;

//     try {

//         const [[getCountData]]: any = await ConnectDatabase.query(
//             `
//               SELECT
//                 COUNT(hmr.hr_monthly_report_id) as totalDataCount
//               FROM
//                 ${process.env.DATABASE_CORE}.hr_monthly_report hmr
//               WHERE
//                 DATE(hmr.date_performance) BETWEEN ?
//                 AND ?
//             `,
//             [startDate, endDate]
//         );

//         pagePosition = parseInt(getCountData.totalDataCount) / pageSize;

//         const [[getSummary]]: any = await ConnectDatabase.query(
//             `
//               SELECT
//                 COUNT(hmr.hr_monthly_report_id) as totalDataCount
//               FROM
//                 ${process.env.DATABASE_CORE}.hr_monthly_report hmr
//               WHERE
//                 DATE(hmr.date_performance) BETWEEN ?
//                 AND ?
//             `,
//             [startDate, endDate]
//         );

//         const [getData]: any = await ConnectDatabase.query(
//             `
//               SELECT
//                 hmr.*
//               FROM
//                 ${process.env.DATABASE_CORE}.hr_monthly_report hmr
//               WHERE
//                 DATE(hmr.date_performance) BETWEEN ?
//                 AND ?
//               ORDER BY
//                 hmr.date_performance DESC,
//                 hmr.hr_monthly_report_id DESC
//               LIMIT ?
//               OFFSET ?
//             `,
//             [startDate, endDate, pageSize, pageTotal]
//         );

//         const encrypt = cipher(process.env.SALT);
//         const updatedData = await getData?.map(
//             (value: { hr_monthly_report_id: string }) => {
//                 const { hr_monthly_report_id, ...rest } = value;

//                 return {
//                     hr_monthly_report_id: encrypt(
//                         String(hr_monthly_report_id ?? '0')
//                     ),
//                     ...rest,
//                 };
//             }
//         );

//         return response.json(
//             {
//                 code: 200,
//                 message: 'Data yang kamu cari nih',
//                 data: updatedData ?? [],
//                 summary: {
//                     total: parseInt(getSummary?.totalDataCount) ?? 0,
//                 },
//                 meta: {
//                     dataCount: updatedData?.length ?? 0,
//                     allDataCount: parseInt(getCountData.totalDataCount),
//                     pageSize: pageSize,
//                     pageNumber: pageNumber,
//                     pageTotal: Math.ceil(pagePosition),
//                     canNext: pageNumber < Math.ceil(pagePosition),
//                     canPrevious: pageNumber !== 1,
//                 },
//             },
//             { status: 200 }
//         );
//     } catch (error) {
//         return response.json(
//             {
//                 code: 500,
//                 message: process.env.RESPONSE_ERROR_SERVER,
//                 error: error,
//             },
//             { status: 500 }
//         );
//     }
// }
