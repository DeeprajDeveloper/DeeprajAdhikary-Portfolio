/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATURE_HERO_LENSES_TYPEWRITER?: string;
  readonly VITE_FEATURE_PAGE_TRANSITIONS?: string;
  readonly VITE_FEATURE_SHORTCUT_LABELS?: string;
  readonly VITE_FEATURE_SHORTCUT_KEYS?: string;
  readonly VITE_FEATURE_HERO_ORBIT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
