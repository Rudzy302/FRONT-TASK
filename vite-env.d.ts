/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_AUTH_URL: string;
  readonly VITE_API_TASKS_URL: string;
  readonly VITE_API_AUTH_URL_DEPLOY: string;
  readonly VITE_API_TASKS_URL_DEPLOY: string;
  readonly VITE_TOKEN_KEY: string;
  readonly VITE_REFRESH_TOKEN_KEY: string;
  readonly VITE_USER_EMAIL_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
