import path from 'path';
import { mkdir, rm, writeFile } from 'fs/promises';
import { del, put } from '@vercel/blob';
import sharp from 'sharp';

const PROJECT_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'projects');
const PROJECT_UPLOAD_PREFIX = '/uploads/projects/';
const MAX_UPLOAD_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const BLOB_PROJECT_UPLOAD_PREFIX = 'projects/';
const BLOB_HOST_SUFFIX = '.public.blob.vercel-storage.com';

function shouldUseBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function assertStorageConfiguration() {
  if (process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for project image uploads on Vercel.');
  }
}

function isBlobProjectImageUrl(url?: string | null) {
  if (!url) {
    return false;
  }

  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'https:' && parsedUrl.hostname.endsWith(BLOB_HOST_SUFFIX);
  } catch {
    return false;
  }
}

export function getProjectUploadValidation(file: File) {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return 'Only JPEG, PNG, and WebP images are supported.';
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return 'Image size must be 8MB or smaller.';
  }

  return null;
}

export async function saveCompressedProjectImage(file: File) {
  assertStorageConfiguration();

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = `project-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
  const optimizedBuffer = await sharp(fileBuffer)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  if (shouldUseBlobStorage()) {
    const blob = await put(`${BLOB_PROJECT_UPLOAD_PREFIX}${fileName}`, optimizedBuffer, {
      access: 'public',
      contentType: 'image/webp',
      addRandomSuffix: false,
    });

    return {
      fileName,
      filePath: blob.pathname,
      url: blob.url,
    };
  }

  const filePath = path.join(PROJECT_UPLOAD_DIR, fileName);

  await mkdir(PROJECT_UPLOAD_DIR, { recursive: true });
  await writeFile(filePath, optimizedBuffer);

  return {
    fileName,
    filePath,
    url: `${PROJECT_UPLOAD_PREFIX}${fileName}`,
  };
}

export async function removePreviousProjectImage(previousImageUrl?: string | null) {
  if (!previousImageUrl) {
    return;
  }

  if (isBlobProjectImageUrl(previousImageUrl)) {
    await del(previousImageUrl);
    return;
  }

  if (!previousImageUrl.startsWith(PROJECT_UPLOAD_PREFIX)) {
    return;
  }

  const safeRelativePath = previousImageUrl.replace(PROJECT_UPLOAD_PREFIX, '');
  if (!safeRelativePath || safeRelativePath.includes('..')) {
    return;
  }

  const targetPath = path.join(PROJECT_UPLOAD_DIR, safeRelativePath);
  await rm(targetPath, { force: true });
}
