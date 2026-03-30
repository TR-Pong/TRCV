import type { ConnectOptions } from 'mongoose';

function parseDatabaseName(uri: string) {
  const match = uri.match(/^[^?]+\/([^/?]+)(?:\?|$)/);
  return match?.[1] || undefined;
}

function buildMongoUriFromParts() {
  const username = process.env.MONGODB_USERNAME?.trim();
  const password = process.env.MONGODB_PASSWORD?.trim();
  const cluster = process.env.MONGODB_CLUSTER?.trim();
  const dbName = process.env.MONGODB_DB_NAME?.trim() || 'CV';
  const authSource = process.env.MONGODB_AUTH_SOURCE?.trim();
  const authMechanism = process.env.MONGODB_AUTH_MECHANISM?.trim();
  const appName = process.env.MONGODB_APP_NAME?.trim();

  if (!username || !password || !cluster) {
    return null;
  }

  const params = new URLSearchParams();
  if (authSource) params.set('authSource', authSource);
  if (authMechanism) params.set('authMechanism', authMechanism);
  if (appName) params.set('appName', appName);
  params.set('retryWrites', 'true');
  params.set('w', 'majority');

  return {
    uri: `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${cluster}/${dbName}?${params.toString()}`,
    dbName,
  };
}

export function getMongoConfig(): { uri: string; options: ConnectOptions } {
  const partsConfig = buildMongoUriFromParts();
  const rawUri = process.env.MONGODB_URI;
  const uri = partsConfig?.uri || rawUri?.trim();

  if (!uri) {
    throw new Error(
      'Please define MONGODB_URI or the split MongoDB env vars inside .env.local'
    );
  }

  const dbName = partsConfig?.dbName || parseDatabaseName(uri) || 'CV';

  return {
    uri,
    options: {
      bufferCommands: false,
      dbName,
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true,
      },
    },
  };
}
