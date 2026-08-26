/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_N8N_CHAT_WEBHOOK_URL?: string;
  readonly VITE_GEMINI_API_KEY?: string;
  [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
