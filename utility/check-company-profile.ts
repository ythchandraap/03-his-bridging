async function CheckCompanyProfile(connection: any, code: any) {
  const [check] = await connection.query(
    `
      SELECT
        *
      FROM ${process.env.DATABASE_CORE}.company_profile cp
        WHERE cp.company_profile_id = ?
    `,
    [code],
  );
  if (!check || check?.length < 1) {
    return 401;
  }
  return 200;
}

export default CheckCompanyProfile;
