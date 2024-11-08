namespace NodeJS {
  interface ProcessEnv {
    // Application 
    PORT: number ;
    // Database 
    DB_NAME: string
    DB_HOST: string
    DB_PORT: number
    DB_USERNAME: string
    DB_PASSWORD : string 
    // S3 
    S3_ACCESS_KEY: string
    S3_SECRET_KEY: string
    S3_ENDPOINT: string
    S3_BUCKET_NAME: string
    // Secrets
    COOKIE_SECRET: string;
    ACCESS_TOKEN_SECRET: string
    REFRESH_TOKEN_SECRET: string
    OTP_TOKEN_SECRET: string
    EMAIL_TOKEN_SECRET: string;
    PHONE_TOKEN_SECRET: string;
  }
}