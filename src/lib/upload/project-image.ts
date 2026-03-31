import path from 'path';
import { mkdir, rm, writeFile } from 'fs/promises';
import sharp from 'sharp';

const PROJECT_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'projects');
const PROJECT_UPLOAD_PREFIX = '/uploads/projects/';
const MAX_UPLOAD_SIZE = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

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
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileName = `project-${Date.now()}-${Math.random().toString(36).slice(2, 10)}.webp`;
  const filePath = path.join(PROJECT_UPLOAD_DIR, fileName);

  await mkdir(PROJECT_UPLOAD_DIR, { recursive: true });
  const optimizedBuffer = await sharp(fileBuffer)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  await writeFile(filePath, optimizedBuffer);

  return {
    fileName,
    filePath,
    url: `${PROJECT_UPLOAD_PREFIX}${fileName}`,
  };
}

export async function removePreviousProjectImage(previousImageUrl?: string | null) {
  if (!previousImageUrl || !previousImageUrl.startsWith(PROJECT_UPLOAD_PREFIX)) {
    return;
  }

  const safeRelativePath = previousImageUrl.replace(PROJECT_UPLOAD_PREFIX, '');
  if (!safeRelativePath || safeRelativePath.includes('..')) {
    return;
  }

  const targetPath = path.join(PROJECT_UPLOAD_DIR, safeRelativePath);
  await rm(targetPath, { force: true });
}
