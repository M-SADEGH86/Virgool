namespace NodeJS {
  interface ProcessEnv {
    PORT:number
    DB_NAME: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD:string
    DB_HOST: string
    COOKIE_SECRET: string
    OTP_TOKEN_SECRET : string
  }
}