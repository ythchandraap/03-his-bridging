// import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Request } from 'express';
import { Connection } from 'mysql2';

async function checkAuth(connection: Connection, req: Request) {
  const [[checkUsers]]: any = await connection.query(
    `SELECT
      *
    FROM
      ${process.env.DATABASE_CORE}.core_sessions_user csu
    WHERE
      csu.useragent = ?
      AND csu.cookies = ?
      AND csu.encryption_code = ?
      AND csu.session_code = ?
      AND csu.session_active = 1`,
    [
      req.headers['user-agent'],
      req.cookies.sid_forward,
      req.cookies.asjb,
      req.cookies.token,
    ],
  );

  if (!checkUsers || !checkUsers?.username) {
    return { code: 401 };
  } else if (checkUsers && checkUsers?.username) {
    return { code: 200 };
  } else {
    code: 500;
  }
}
export default checkAuth;
