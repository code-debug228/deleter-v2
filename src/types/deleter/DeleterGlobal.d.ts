declare namespace NodeJS {
  interface Global {
    client: any
    Discord: any,
    ApiWorker: any
  }

  interface ProcessEnv {
    TOKEN: string,
    TOTAL_SHARDS: string,
    CLIENT_SECRET: string | undefined,

    DB_USRN: string,
    DB_PSWD: string,
    DB_KEYSPACE: string,

    CACHE_ENABLED: string | undefined,
    REDIS_PORT: number,
    REDIS_HOST: string,

    API_PRIVSTATS_PSWD: string | undefined,
    API_ENABLED: string | undefined,
    API_PREFIX: string | undefined,
    API_PORT: number,
    API_HOST: string,
  }
}