export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_HOST: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
      DATABASE_PORT: string;

      DATABASE_CORE: string;
      PG_CONNECTION: string;

      SALT: string;
      SALT_DOUBLE: string;
      SALT_TRIPLE: string;
      SALT_DOUBLE: string;
    }
  }
}
