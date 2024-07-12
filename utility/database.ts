import { createPool } from 'mysql2/promise';

const ConnectDatabase: any = createPool(process.env.DATABASE_URL);

// DATABASE_HOST=192.168.150.220
// DATABASE_USER=datin
// DATABASE_PASSWORD=Youcan123[]
// DATABASE_NAME=obsmoon
// DATABASE_PORT=33066
// const ConnectDatabaseTurnOffSecure = createPool({
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USERNAME,
//   password: process.env.MYSQL_PASSWORD,
//   timezone: 'asia/jakarta',
//   infileStreamFactory: (path) => createReadStream(path),
// });

// export { ConnectDatabaseTurnOffSecure };
export default ConnectDatabase;
