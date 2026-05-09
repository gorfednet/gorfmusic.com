/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Web3Forms access key (public). Set inbox to mike@gorfed.net in the Web3Forms dashboard only. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
