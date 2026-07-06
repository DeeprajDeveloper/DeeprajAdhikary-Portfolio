/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATURE_HERO_LENSES_TYPEWRITER?: string;
  readonly VITE_FEATURE_PAGE_TRANSITIONS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
