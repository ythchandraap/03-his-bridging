export default async function DoUpdateReceipt(
  kwitansi?: string,
  connectionQuery?: any,
) {
  const [DoUpdateTotal]: any = await connectionQuery.query(
    `
    UPDATE
      ${process.env.DATABASE_SIMRS}.kwitansi
    SET total = IFNULL(
    (
        SELECT SUM(sub_total)
        FROM ${process.env.DATABASE_SIMRS}.kwitansi_detail
        WHERE kwitansi_id = ?)
    , 0)
    WHERE id = ?;`,
    [kwitansi, kwitansi],
  );
  return DoUpdateTotal;
}
