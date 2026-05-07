import { NextRequest, NextResponse } from 'next/server';
import { removePreviousProjectImage, saveCompressedProjectImage, getProjectUploadValidation } from '@/lib/upload/project-image';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const previousImageUrl = formData.get('previousImageUrl');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Image file is required.' }, { status: 400 });
    }

    const validationError = getProjectUploadValidation(file);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const uploadResult = await saveCompressedProjectImage(file);

    try {
      await removePreviousProjectImage(typeof previousImageUrl === 'string' ? previousImageUrl : null);
    } catch (cleanupError) {
      console.error('Failed to remove previous project image:', cleanupError);
    }

    return NextResponse.json({ url: uploadResult.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
