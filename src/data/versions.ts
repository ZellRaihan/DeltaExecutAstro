// Version history is fetched at build time from the admin Worker, which
// reads delta-data.json out of R2. This is the same Worker the
// deltaxexecutor.com.co site uses, since it's shared infrastructure, not
// part of either site's own codebase.

export interface VersionEntry {
  version: string;
  fileSize: string;
  released: string;
  changelog: string[];
  downloadUrl: string;
}

export interface DeltaData {
  android: VersionEntry[];
  ios: VersionEntry[];
  windows: VersionEntry[];
}

const DATA_URL = 'https://delta-admin-panel.rhnsardar4.workers.dev/delta-data.json';

// Hardcoded fallback used only if the live fetch fails during a build, so
// the site doesn't ship with zero version data.
const FALLBACK_DATA: DeltaData = {
  android: [
    {
      version: '2.710',
      fileSize: '170 MB',
      released: '2026-02-28',
      changelog: ['Updated for latest Roblox version'],
      downloadUrl: '',
    },
  ],
  ios: [
    {
      version: '2.710',
      fileSize: '112 MB',
      released: '2026-02-28',
      changelog: ['Full iOS support'],
      downloadUrl: '',
    },
  ],
  windows: [],
};

const FALLBACK_WINDOWS_ENTRY: VersionEntry[] = FALLBACK_DATA.android;

let cachedData: DeltaData | null = null;

// Guarantees every platform array has at least one entry, so a platform
// with zero real releases yet can't crash a page that reads versions[0]
// directly.
function ensureNonEmpty(data: DeltaData): DeltaData {
  return {
    android: data.android.length > 0 ? data.android : FALLBACK_DATA.android,
    ios: data.ios.length > 0 ? data.ios : FALLBACK_DATA.ios,
    windows: data.windows.length > 0 ? data.windows : FALLBACK_WINDOWS_ENTRY,
  };
}

export async function getDeltaData(): Promise<DeltaData> {
  if (cachedData) return cachedData;

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Live data fetch failed with status ${response.status} (${DATA_URL})`);
    }
    const data = (await response.json()) as DeltaData;

    if (!data.android || !data.ios || !data.windows) {
      throw new Error('Fetched JSON is missing an expected platform key');
    }

    cachedData = ensureNonEmpty(data);
    return cachedData;
  } catch (err) {
    console.warn(
      `[versions] Falling back to hardcoded data, live fetch failed: ${
        err instanceof Error ? err.message : err
      }`
    );
    cachedData = FALLBACK_DATA;
    return FALLBACK_DATA;
  }
}
