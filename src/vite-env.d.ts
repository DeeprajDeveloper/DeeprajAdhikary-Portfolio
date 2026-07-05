/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATURE_HERO_LENSES_TYPEWRITER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
