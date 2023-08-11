/** This module contains type-declarations for the .env files. */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
    }
  }
}

export {};
