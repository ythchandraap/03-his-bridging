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
      DATABASE_SIMJAPEL: string;
      DATABASE_SIMRS: string;
      DATABASE_ASSET: string;
      PG_CONNECTION: string;
      URL_API: string;
      VERSION_API: string;

      SALT: string;
      SALT_SIMJAPEL: string;
      SALT_DOUBLE: string;
      SALT_TRIPLE: string;
      SALT_DOUBLE: string;

      SECRET: string;
    }
  }
}
